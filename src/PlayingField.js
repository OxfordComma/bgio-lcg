import React from 'react';

function GridLocation({ isSelected, onSelect, field, card }) {  
  let style = {
    border: '1px solid #555',
    width: '100%',
    height: '100%',
    backgroundColor: isSelected ? 'yellow' : 'white',
  };
  return (
    <div 
      onClick={(e) => {e.preventDefault(); onSelect(field.id)}} 
      className={ card ? "card" : ""} 
      style={style}
    >
      {card && <>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? card.Name : ''}</div>
      </>}
    </div>
  )
}

export function PlayingField({ fields, cards, selectedFieldID, onSelect}) {
  return <div className="battlefield">
    { fields.map(field => 
      <GridLocation
        key={"field" + field.id.toString()}
        field={field}
        card={cards.find(c => c.id === field.fieldCardID)}
        isSelected={ selectedFieldID === field.id }
        onSelect={onSelect}
      />
    )}
  </div>
}