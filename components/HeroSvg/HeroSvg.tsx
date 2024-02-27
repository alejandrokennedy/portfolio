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
  const t = 5500
  const maxW = 85
  const maxH = 150
  const minW = 3
  const minH = 3

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
        }, t)
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
    const data = Array.from({ length: 25 }, d => randomColor())
    const svg = d3.select(svgRef.current);
    const filter = svg.append('filter')
      .attr('id', 'rect-filter');

    // filter.append('feGaussianBlur')
    //   .attr('stdDeviation', 2);

    filter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "8")
      .attr("result", "blur")

    filter.append("feColorMatrix")
      .attr("in", "blur")
      .attr("mode","matrix")
      .attr("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7")
      .attr("result","gooey")

    const rects = svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr("x", d3.randomUniform(0, width - maxW))
      .attr("y", d3.randomUniform(0, height - maxH))
      .attr('width', d3.randomUniform(minW, maxW))
      .attr('height', d3.randomUniform(minH, maxH))
      .style('fill', d => d)
      .style('opacity', 0.3)
      .attr('filter', 'url(#rect-filter)');

    const asyncStarter = async () => {
      for await (const number of asyncGeneratorObject) {
        if(cancel) return;
        console.log(number)
        rects.transition().duration(t).ease(d3.easeCubicInOut)
          .attr("x", d3.randomUniform(0, width - maxW))
          .attr("y", d3.randomUniform(0, height - maxH))
          .attr('width', d3.randomUniform(minW, maxW))
          .attr('height', d3.randomUniform(minH, maxH))
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