import React, { useState } from 'react';
import {Tooltip} from './Tooltip';
import './PlayerHand.css';

function Card({ card }) {
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

function PlayerHandCard({ card, isSelected, onSelect }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
  
    function onHover(e) {
      setShowTooltip(true);
      setX(e.screenX < 0 ? 0 : e.screenX)
      setY(e.screenY < 0 ? 0 : e.screenY)
    }

    return (
      <div className={'card-slot' + (isSelected ? ' is-selected': '')} 
        onMouseMove={onHover} onMouseOut={e => setShowTooltip(false)} 
        onClick={e => {e.preventDefault(); onSelect(card.id)} }>
        { showTooltip && <Tooltip x={x+5} y={y-240} ><Card card={card} /></Tooltip> }
        { <Card card={card} isSelected={isSelected} /> }
      </div>
    );
  }

export function PlayerHand({ hand, selectedCardID, onSelect }) {
  console.log(hand)
  return (
  <div className="myhand" >
    {hand?.filter(c => c).map(card => 
      <PlayerHandCard 
        key={'card' + card.id} 
        card={card} 
        isSelected={(card.id === selectedCardID)} 
        onSelect={onSelect}
      />
    )
    }
  </div>)
}