import React from 'react';

function GridLocation({ isSelected, onSelect, landscape, card }) {  
  let style = {
    border: '1px solid #555',
    width: '100%',
    height: '100%',
    backgroundColor: isSelected ? 'yellow' : 'white',
  };
  return (
    <div 
      onClick={(e) => {e.preventDefault(); onSelect(landscape.id)}} 
      className={ card ? "card" : ""} 
      style={style}
    >
      {card && <>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? card.name : ''}</div>
      </>}
    </div>
  )
}

export function Landscape({ landscapes, playerID, cards, selectedLandscapeID, onSelect}) {
  const myLandscapes = landscapes[playerID]
  let theirLandscapes = [ ...landscapes[['0', '1'].filter(p => p !== playerID)] ].reverse()
  
  return <div className="landscape">
    {theirLandscapes.map(landscape => 
      <GridLocation
        key={playerID+"_landscape" + landscape.id.toString()}
        landscape={landscape}
        card={cards.find(c => c.id === landscape.landscapeCardID)}
        isSelected={ false }
        onSelect={null}
      />
    )}
    {myLandscapes.map(landscape => 
      <GridLocation
        key={playerID+"_landscape" + landscape.id.toString()}
        landscape={landscape}
        card={cards.find(c => c.id === landscape.landscapeCardID)}
        isSelected={ selectedLandscapeID === landscape.id }
        onSelect={onSelect}
      />
    )}
  </div>
}