"use client"

import classes from './HeroSvg.module.css';
import { useEffect, useRef } from 'react';

export function HeroSvg() {

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    // if (!svg) return;
    
  })
  
  return (
    <div className={classes.wrapper}>

      <div className={classes.inner}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}