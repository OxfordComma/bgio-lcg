import React, { useState } from 'react';
import './PlayerHand.css';


function DetailedCardInfo({card, isSelected, customStyle}) {
    return (
      <div className='card' style={customStyle}>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? '#' + card.number : ''}</div>
        <div className="card-name">{card ? card.name : ''}</div>
        <div>{card ? card.type : ''}</div>
        <div>{card ? card.subtype : ''}</div>
        {
          card?.materials && 
           <div>{Object.entries(card.materials)?.map((k, v) => `${v} ${k}`).join(', ')}</div>
        }
        {
          card?.production && 
          <div>{Object.entries(card.production)?.map((k, v) => `${v} ${k}`).join(', ')}</div>
        }
        <div>{card ? card.text : ''}</div>
    </div>)
  }


function Tooltip({show, card, x, y}) {
    let style = {
      display: 'float',
      width: '160px',
      height: 'auto',
      position: 'absolute', 
      left: x,
      top: y,
      backgroundColor: 'darkgray',
      transition: 300,
    }

    return <DetailedCardInfo card={card} isSelected={false} customStyle={style}/>;
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
  
    const style = {
      width: '100px',
      pointerEvents: 'none',
      aspectRatio: (1/1.6),
    };
    return (
      <div onMouseMove={onHover} onMouseOut={e => setShowTooltip(false)} onClick={e => {e.preventDefault(); onSelect(card.id)} }>
        { showTooltip && <Tooltip show={showTooltip === card.id} card={card} x={x+5} y={y-240} /> }
        <DetailedCardInfo card={card} isSelected={isSelected} customStyle={style} />
      </div>
    );
  }

export function PlayerHand({ hand, selectedCardID, onSelectCard }) {
  return (
  <div className="myhand" >
    {hand?.map(card => 
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