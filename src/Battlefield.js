import React, { useState } from 'react';


function DetailedCardInfo({card, isSelected, customStyle}) {
    let style = {
      border: '1px solid #555',
      backgroundColor: isSelected ? 'yellow' : 'white',
      pointerEvents: 'none',
      ...customStyle
    }
    return (
      <div className='card' style={style}>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? '#' + card.number : ''}</div>
        <div>{card ? card.name : ''}</div>
        <div>{card ? card.type : ''}</div>
        <div>{card ? card.subtype : ''}</div>
        <div>{card ? card.materials : ''}</div>
        <div>{card ? card.text : ''}</div>
    </div>)
  }


function Tooltip({show, card, x, y}) {
    let style = {
      display: 'float',
      border: '1px solid #555',
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
      border: '1px solid #555',
      width: '100px',
      backgroundColor: isSelected ? 'yellow' : 'white',
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

export function Battlefield({ beings, playerID, cards, selectedBeingID, onSelectCard }) {
  return (
  <div className="battlefield" >
    <div className="myside">
    { beings[['0', '1'].filter(p => p !== playerID)].map(being => 
      <PlayerHandCard
        key={"being" + being.id.toString()}
        being={being}
        card={cards.find(c => c.id === being.beingCardID)}
        isSelected={ false }
        onSelect={onSelectCard}
      />
    )}
  </div>
  <div className="theirside" >
    { beings[playerID].map(being => 
      <PlayerHandCard
        key={"being" + being.id.toString()}
        being={being}
        card={cards.find(c => c.id === being.beingCardID)}
        isSelected={ selectedBeingID === being.id }
        onSelect={onSelectCard}
      />
    )}
  </div>
  </div>)
}