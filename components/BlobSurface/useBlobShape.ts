'use client';

import { useEffect, useRef } from 'react';
import { blobPath } from '../blob';

/**
 * Gives an element the hero's blob outline: sets --blob-path to a clip path sized to the element,
 * updated when it resizes. Pair with the `surface` class from BlobSurface.module.css, which draws
 * the background inside that outline.
 */
export function useBlobShape<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w && h) el.style.setProperty('--blob-path', `path('${blobPath(w, h)}')`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
