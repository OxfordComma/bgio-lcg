import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Card.css';

function CardDetails({ card }) { 
  return <div className='card'>
    <div className='card-id'>
      <div>id{card.id}</div>
      <div>#{card.number}</div>
    </div>
    <div className='card-name'>{card?.name}</div>
    <div>{card.type + (card?.subtype && (' - ' + card.subtype))}</div>
    <div>{card.text}</div>
    { card?.stats && 
      <div className='stats'>
        <div style={{gridArea: 'str'}}>STR {card.stats.strength}</div>
        <div style={{gridArea: 'arm'}}>ARM {card.stats.armor}</div>
        <div style={{gridArea: 'agi'}}>AGI {card.stats.agility}</div>
        <div style={{gridArea: 'will'}}>WIL {card.stats.will}</div>
      </div>
    }
    { card?.materials && 
      <div>{Object.entries(card.materials)?.map((k, v) => `${v} ${k}`).join(', ')}</div>
    }
    { card?.production && 
      <div>{Object.entries(card.production)?.map((k, v) => `${v} ${k}`).join(', ')}</div>
    }
  </div>
}

function CardSummary({ card }) {
  return <div className='card'>
    <div className='card-name'>{card?.name}</div>
    <div>{card.type + (card?.subtype && (' - ' + card.subtype))}</div>
    { card?.stats &&
      <div className='stats'>
        <div style={{gridArea: 'str'}}>S {card.stats.strength}</div>
        <div style={{gridArea: 'arm'}}>D {card.stats.armor}</div>
        <div style={{gridArea: 'agi'}}>A {card.stats.agility}</div>
        <div style={{gridArea: 'will'}}>W {card.stats.will}</div>
      </div>
    }
    { card?.production &&
      <div>{Object.entries(card.production)?.map((k, v) => `${v} ${k}`).join(', ')}</div>
    }
  </div>
}

const Tooltip = ({children}) => {
  const mount = document.getElementById('tooltip-anchor');

  return createPortal(children, mount)
};


function CardSlot({ card, isSelected, onSelect, children }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cursor, setCursor] = useState({ x : 0, y : 0 });

  function onHover(e) {
    setShowTooltip(true);
    const x = e.clientX + 15 + window.scrollX;
    const y = e.clientY - 55 + window.scrollY;
    const maxWidth = window.innerwidth - 115;
    const maxHeight = window.innerHeight - 110;


    setCursor({
      x: (x < 0) ? 0 : ((maxWidth < x) ? maxWidth :  x),
      y: (y < 0) ? 0 : ((maxHeight < y) ? maxHeight :  y),
    });
  }

  return (
    <div 
      className={'card-slot' + (isSelected ? ' is-selected': '')} 
      onMouseMove={onHover} 
      onMouseOut={e => setShowTooltip(false)}
      onClick={e => {e.preventDefault(); onSelect(card.id)} }
    >
      { showTooltip && 
        <Tooltip>
          <div className='card-tooltip' style={{ 'left': cursor.x, 'top': cursor.y }}>
            <CardDetails card={card} />
          </div>
        </Tooltip> }
      { children }
    </div>
  );
}


export function SmallCard({ card, isSelected, onSelect }) {
  return <CardSlot card={card} isSelected={isSelected} onSelect={onSelect}>
    <CardSummary card={card} isSelected={isSelected} />
  </CardSlot>
}

export function Card({ card, isSelected, onSelect }) {
  return <CardSlot card={card} isSelected={isSelected} onSelect={onSelect}>
    <CardDetails card={card} isSelected={isSelected} />
  </CardSlot>
}