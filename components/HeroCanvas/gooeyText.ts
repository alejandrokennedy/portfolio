// WebGL2 renderer for "gooey" text: a Gaussian blur followed by the same alpha threshold as the
// SVG filter (alpha -> 18a - 7). Animating the blur turns crisp text into merged blobs and back.
//
// The phrase is drawn once into a texture, then each frame:
//   1. blur horizontally into framebuffer A, downsampling first when the blur is large
//   2. blur vertically from A into framebuffer B
//   3. upsample B to full device resolution and threshold, so edges stay crisp on retina displays
// Downsampling keeps the blur at <= 4 texels sigma, so the cost stays flat however large it gets.

// Supported in Chrome, Firefox, and Safari, but missing from the DOM types in TypeScript 5.2
declare global {
  interface CanvasRenderingContext2D {
    letterSpacing: string;
  }
}

const VERTEX_SHADER = `#version 300 es
out vec2 vUv;
void main() {
  // One triangle covering the viewport, no vertex buffers needed
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const MAX_TAPS = 16;

const BLUR_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uUvScale;
uniform vec2 uStep;
uniform float uSigma;
uniform float uLod;
out vec4 outColor;
void main() {
  vec2 uv = vUv * uUvScale;
  float total = textureLod(uTex, uv, uLod).a;
  float weightSum = 1.0;
  int taps = int(min(ceil(uSigma * 3.0), ${MAX_TAPS}.0));
  for (int i = 1; i <= ${MAX_TAPS}; i++) {
    if (i > taps) break;
    float w = exp(-float(i * i) / (2.0 * uSigma * uSigma));
    vec2 offset = uStep * float(i);
    total += w * (textureLod(uTex, uv + offset, uLod).a + textureLod(uTex, uv - offset, uLod).a);
    weightSum += 2.0 * w;
  }
  outColor = vec4(0.0, 0.0, 0.0, total / weightSum);
}`;

const FINAL_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uText;
uniform sampler2D uBlur;
uniform float uBlurScale;
uniform float uGooey;
uniform float uShift;
uniform vec3 uColor;
out vec4 outColor;
void main() {
  float crisp = texture(uText, vUv).a;
  float blurred = texture(uBlur, vUv * uBlurScale).a;
  // Same edge as the SVG filter (where 18a - 7 = 0.5), but antialiased over one device pixel.
  // A fixed 18x ramp smears into fuzzy patches where blobs are about to merge and the blurred
  // alpha is nearly flat; scaling by the screen-space slope keeps every edge crisp.
  float threshold = (7.5 + uShift) / 18.0;
  float gooey = clamp((blurred - threshold) / max(fwidth(blurred), 1e-4) + 0.5, 0.0, 1.0);
  float a = mix(crisp, gooey, uGooey);
  outColor = vec4(uColor * a, a);
}`;

export interface GooeyTextFrame {
  text: string;
  /** CSS font shorthand, e.g. "700 100px Rubik" */
  font: string;
  letterSpacing: string;
  /** Canvas size in CSS pixels */
  width: number;
  height: number;
  dpr: number;
  /** CSS color string */
  color: string;
  /** Blur standard deviation in CSS pixels */
  blur: number;
  /** Extra threshold offset: 0 matches the SVG filter, 11 hides everything */
  shift: number;
}

export interface GooeyText {
  render(frame: GooeyTextFrame): void;
  dispose(): void;
}

function compile(gl: WebGL2RenderingContext, fragmentSource: string) {
  const program = gl.createProgram()!;
  [
    [gl.VERTEX_SHADER, VERTEX_SHADER],
    [gl.FRAGMENT_SHADER, fragmentSource],
  ].forEach(([type, source]) => {
    const shader = gl.createShader(type as number)!;
    gl.shaderSource(shader, source as string);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  });
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed');
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const { name } = gl.getActiveUniform(program, i)!;
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

function createTexture(gl: WebGL2RenderingContext) {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

function parseColor(color: string): [number, number, number] {
  const [r = 0, g = 0, b = 0] = (color.match(/[\d.]+/g) ?? []).map(Number);
  return [r / 255, g / 255, b / 255];
}

/** Returns null when WebGL2 is unavailable so the caller can fall back. */
export function createGooeyText(canvas: HTMLCanvasElement): GooeyText | null {
  const gl = canvas.getContext('webgl2', { antialias: false, depth: false });
  if (!gl) return null;

  let blurProgram: ReturnType<typeof compile>;
  let finalProgram: ReturnType<typeof compile>;
  try {
    blurProgram = compile(gl, BLUR_SHADER);
    finalProgram = compile(gl, FINAL_SHADER);
  } catch {
    return null;
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const textTexture = createTexture(gl);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  // Half-float blur buffers keep the thresholded edge smooth; 8-bit steps show up as wobble
  const halfFloat = !!gl.getExtension('EXT_color_buffer_float');
  const blurTextures = [createTexture(gl), createTexture(gl)];
  const framebuffers = blurTextures.map((texture) => {
    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    return fb;
  });

  const textCanvas = document.createElement('canvas');
  const textCtx = textCanvas.getContext('2d')!;
  let textKey = '';
  let colorKey = '';
  let rgb: [number, number, number] = [0, 0, 0];

  const resize = (w: number, h: number) => {
    canvas.width = w;
    canvas.height = h;
    textCanvas.width = w;
    textCanvas.height = h;
    blurTextures.forEach((texture) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (halfFloat) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }
    });
    textKey = '';
  };

  const uploadText = (frame: GooeyTextFrame) => {
    const { width, height, dpr } = frame;
    textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    textCtx.clearRect(0, 0, width, height);
    textCtx.font = frame.font;
    textCtx.letterSpacing = frame.letterSpacing;
    textCtx.fillStyle = '#fff';
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'alphabetic';
    textCtx.fillText(frame.text, width / 2, height / 2);

    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.generateMipmap(gl.TEXTURE_2D);
  };

  const clearTarget = (framebuffer: WebGLFramebuffer | null, w: number, h: number) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  const render = (frame: GooeyTextFrame) => {
    const w = Math.round(frame.width * frame.dpr);
    const h = Math.round(frame.height * frame.dpr);
    if (canvas.width !== w || canvas.height !== h) resize(w, h);

    // Redraw the text texture only when something about it changes. Font status is part of the
    // key so the texture is redrawn once a web font finishes loading.
    const key = [frame.text, frame.font, frame.letterSpacing, frame.dpr, document.fonts?.status];
    if (key.join('|') !== textKey) {
      uploadText(frame);
      textKey = key.join('|');
    }

    if (frame.color !== colorKey) {
      rgb = parseColor(frame.color);
      colorKey = frame.color;
    }

    // Below ~1.5 device pixels of blur, blend to the crisp text so the hold phase is sharp
    const sigma = frame.blur * frame.dpr;
    const gooey = Math.min(Math.max(sigma - 0.5, 0), 1);
    let blurScale = 1;

    if (gooey > 0) {
      const factor = Math.max(1, sigma / 4);
      const vw = Math.ceil(w / factor);
      const vh = Math.ceil(h / factor);
      const { program, uniforms } = blurProgram;
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(uniforms.uTex, 0);
      gl.uniform1f(uniforms.uSigma, sigma / factor);

      // Horizontal pass: crisp text -> A, downsampled via the text texture's mipmaps
      clearTarget(framebuffers[0], w, h);
      gl.viewport(0, 0, vw, vh);
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.uniform2f(uniforms.uUvScale, (vw * factor) / w, (vh * factor) / h);
      gl.uniform2f(uniforms.uStep, factor / w, 0);
      gl.uniform1f(uniforms.uLod, Math.log2(factor));
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Vertical pass: A -> B, at the same reduced size
      clearTarget(framebuffers[1], w, h);
      gl.viewport(0, 0, vw, vh);
      gl.bindTexture(gl.TEXTURE_2D, blurTextures[0]);
      gl.uniform2f(uniforms.uUvScale, vw / w, vh / h);
      gl.uniform2f(uniforms.uStep, 0, 1 / h);
      gl.uniform1f(uniforms.uLod, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      blurScale = 1 / factor;
    }

    clearTarget(null, w, h);
    const { program, uniforms } = finalProgram;
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.uniform1i(uniforms.uText, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, blurTextures[1]);
    gl.uniform1i(uniforms.uBlur, 1);
    gl.uniform1f(uniforms.uBlurScale, blurScale);
    gl.uniform1f(uniforms.uGooey, gooey);
    gl.uniform1f(uniforms.uShift, frame.shift);
    gl.uniform3f(uniforms.uColor, ...rgb);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const dispose = () => {
    gl.deleteProgram(blurProgram.program);
    gl.deleteProgram(finalProgram.program);
    gl.deleteVertexArray(vao);
    gl.deleteTexture(textTexture);
    blurTextures.forEach((texture) => gl.deleteTexture(texture));
    framebuffers.forEach((fb) => gl.deleteFramebuffer(fb));
  };

  return { render, dispose };
}
