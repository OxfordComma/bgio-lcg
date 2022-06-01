import React, { useState } from 'react';
import {Tooltip} from './Tooltip'

function PlayerBattlefieldCard({ card, isSelected, onSelect }) {
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

    const statsStyle = {
      width: '100%',
      height: '50%',
      display: 'grid',
      gridTemplateAreas: `
        'str arm'
        'agi will'`,
    }
    return (
      <div onMouseMove={onHover} onMouseOut={e => setShowTooltip(false)} onClick={e => {e.preventDefault(); onSelect(card.id)} }>
        { showTooltip && <Tooltip show={showTooltip === card.id} card={card} x={x+5} y={y-240} /> }
         <div className='card' style={style}>
            <div>{card ? `${card.name} [${card.id}]` : ''}</div>
            <div>{card ? card.type : ''}</div>
            <div>{card ? card.subtype : ''}</div>
            <div>{card ? card.materials : ''}</div>
            <div>{card ? card.text : ''}</div>
            <div style={statsStyle}>
              <div style={{gridArea: 'str'}}>STR {card.stats.strength}</div>
              <div style={{gridArea: 'arm'}}>ARM {card.stats.armor}</div>
              <div style={{gridArea: 'agi'}}>AGI {card.stats.agility}</div>
              <div style={{gridArea: 'will'}}>WIL {card.stats.will}</div>
            </div>
        </div>
      </div>
    );
  }

export function Battlefield({ beings, playerID, cards, selectedBeingID, onSelect }) {
  console.log(beings)
  return (
  <div className="battlefield" >
    <div className="theirside">
    { beings[['0', '1'].filter(p => p !== playerID)].map(being => 
      <PlayerBattlefieldCard
        key={['0', '1'].find(p => p !== playerID) + "_being" + being.id.toString()}
        being={being}
        card={cards.find(c => c.id === being.beingCardID)}
        isSelected={ false }
        onSelect={onSelect}
      />
    )}
  </div>
  <div className="myside" >
    { beings[playerID].map(being => 
      <PlayerBattlefieldCard
        key={playerID + "_being" + being.id.toString()}
        being={being}
        card={cards.find(c => c.id === being.beingCardID)}
        isSelected={ selectedBeingID === being.beingCardID }
        onSelect={onSelect}
      />
    )}
  </div>
  </div>)
}