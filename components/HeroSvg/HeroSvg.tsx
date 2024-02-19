// TODO
// When the window resizes, redraw/update svg elements in a smoother way.
// Use the useRef hook to save the D3 selections (e.g. circles) and reuse them, instead of reselecting
// Abstract D3 code into a reusable chart?
// Clean up HeroSvg.module.css

"use client"

import classes from './HeroSvg.module.css';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useElementSize } from '@mantine/hooks';

export function HeroSvg() {

  const { ref, width, height } = useElementSize();
  const svgRef = useRef(null);

  const randVal = () => Math.round(Math.random() * 255)
  const randomColor = (opacity = 1) => {
    return opacity === 1
      ? `rgb(${randVal()}, ${randVal()}, ${randVal()})`
      : `rgb(${randVal()}, ${randVal()}, ${randVal()}, ${opacity})`;
  }

  // async function* count(start: number, svg: d3.Selection<SVGGElement, unknown, null, undefined>) {
  //   let i = 0;
  //   const w = Math.min(640, rect.width);
  //   const h = 320;
  //   const r = 20;
  //   const t = 1500;
  //   // const svg = d3.select(DOM.svg(w, h));
  //   const circle = svg.append("circle").attr("r", r).attr("cx", w / 4).attr("cy", h / 4);
  //   while (true) {
  //     yield svg.node();
  //     await circle.transition().duration(t).attr("cy", h * 3 / 4).end();
  //     await circle.transition().duration(t).attr("cx", w * 3 / 4).end();
  //     await circle.transition().duration(t).attr("cy", h * 1 / 4).end();
  //     await circle.transition().duration(t).attr("cx", w * 1 / 4).end();
  //   }
  // }

  async function* asyncGenerator() {
    let num = 0
    while (true) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(num)
        }, 2000)
      });
      num++
    }
  }

  const asyncGeneratorObject = asyncGenerator();

  useEffect(() => {
    console.log('useEffect')
    if (!width) return;
    if (!svgRef.current) return;

    let cancel = false
    const data = Array.from({ length: 3 }, d => randomColor())
    const svg = d3.select(svgRef.current);
    
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr("cy", d3.randomUniform(0, height))
      .attr("cx", d3.randomUniform(0, width))
      .attr('cy', 80)
      .attr('r', 70)
      .style('fill', d => d)

    const asyncStarter = async () => {
      for await (const number of asyncGeneratorObject) {
        if(cancel) return;
        console.log(number)
        const circles = svg.selectAll('circle')
        circles.transition().duration(3000).ease(d3.easeCubicInOut)
          .attr("cy", d3.randomUniform(0, height))
          .attr("cx", d3.randomUniform(0, width))
      }
    }

    asyncStarter()

    return () => {
      svg.selectAll('*').remove()
      cancel = true;
    }
    
  }, [width])

  return (
    <div className={classes.wrapper} ref={ref}>
        <svg ref={svgRef} id='svg' width={width} height={400}/>

      {/* <div className={classes.inner}> */}
      {/* </div> */}
    </div>
  );
}