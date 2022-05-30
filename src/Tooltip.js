import React from 'react';
import './Tooltip.css';


export function Tooltip({ card, x, y, children }) {
  let style = {
    left: x,
    top: y,
  }
  return (<div className='card-tooltip' style={style}>{children}</div>)
}