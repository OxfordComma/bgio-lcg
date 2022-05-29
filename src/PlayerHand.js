import React, { useState } from 'react';
import {Tooltip} from './Tooltip'

function PlayerHandCard({ card, isSelected, onSelect }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
  
    function onHover(e) {
      setShowTooltip(true);
      setX(e.screenX < 0 ? 0 : e.screenX)
      setY(e.screenY < 0 ? 0 : e.screenY)
    }
  
    const style = {
      border: '1px solid #555',
      height: '100%',
      backgroundColor: isSelected ? 'yellow' : 'white',
      pointerEvents: 'none',
      aspectRatio: (1/1.6),
    };
    const nameStyle = {
      'fontWeight': 'bold',
      'textAlign': 'left',
    }
    const idStyle = {
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'space-between',
    }
    const materials = !!card.materials ? Object.keys(card.materials).map(k => card.materials[k]+' '+k).join(', ') : ''
    const production = !!card.production ? Object.keys(card.production).map(k => card.production[k]+' '+k).join(', ') : ''

    return (
      <div onMouseMove={onHover} onMouseOut={e => setShowTooltip(false)} onClick={e => {e.preventDefault(); onSelect(card.id)} }>
        { showTooltip && <Tooltip show={showTooltip === card.id} card={card} x={x+5} y={y-240} /> }
          <div className='card' style={style}>
            <div style={nameStyle}>{card ? card.name : ''}</div>
            <div>{card ? !!card.subtype ? card.subtype : card.type : ''}</div>
            <div>{card ? materials : ''}</div>
            <div>{card ? production : ''}</div>
            <div>{card ? card.text : ''}</div>
        </div>
      </div>
    );
  }

export function PlayerHand({ hand, selectedCardID, onSelectCard }) {
  console.log(hand)
  return (
  <div className="myhand" >
    {hand.map(card => 
      <PlayerHandCard 
        key={'card' + card.id} 
        card={card} 
        isSelected={(card.id === selectedCardID)} 
        onSelect={onSelectCard}
      />
    )
    }
  </div>)
}