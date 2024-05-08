// TODO
// When the window resizes, redraw/update svg elements in a smoother way.
// Use the useRef hook to save the D3 selections (e.g. circles) and reuse them, instead of reselecting
// Abstract D3 code into a reusable chart?
// Clean up HeroSvg.module.css

"use client"

import { useElementSize } from '@mantine/hooks';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import classes from './HeroSvg.module.css';

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

  const textData = [
    'Data Visualization',
    'Data Journalism',
    'Data Storytelling',
    'Data Art',
    'Web Development',
  ]

  async function* asyncGenerator() {
    let num = 1
    while (true) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(num)
        }, t)
      });
      num < textData.length - 1 ? num++ : num = 0;
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

    const fontSize = d3.min([100, Math.round(width / 10)])

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
      .attr('width', 0)
      .attr('height', 0)
      .style('fill', d => d)
      .style('opacity', 0.3)
      .attr('filter', 'url(#rect-filter)')

    const text = svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('fill', 'currentColor')
      .style('font-size', fontSize + 'px')
      .style('text-anchor','middle')
      .style('opacity', 0)
      .text(textData[0])

    const recycleText = (num: number) => {
      text
      .transition().duration(t / 4).ease(d3.easeCubicInOut)
      .style('opacity', '1')
      .on('end', () => text.transition().duration(t / 4).delay(t / 2).style('opacity', 0))
      .text(textData[num])
    }

    recycleText(0)

    const transitionRects = () => {
      rects.transition().duration(t).ease(d3.easeCubicInOut)
        .attr("x", d3.randomUniform(0, width - maxW))
        .attr("y", d3.randomUniform(0, height - maxH))
        .attr('width', d3.randomUniform(minW, maxW))
        .attr('height', d3.randomUniform(minH, maxH))
      }
    
    transitionRects()

    const asyncStarter = async () => {
      for await (const number of asyncGeneratorObject) {
        if(cancel) return;
        transitionRects()
        recycleText(Number(number))
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