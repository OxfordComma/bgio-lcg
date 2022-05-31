import React, { useState } from 'react';
import { Card } from './Card';
import { Tooltip } from './Tooltip'
import './Battlefield.css'

export function Battlefield({ beings, playerID, cards, selectedBeingID, onSelect }) {
  return (
  <div className="battlefield" >
    <div className="theirside">
      { beings[['0', '1'].filter(p => p !== playerID)].map(being => 
        <Card
          key={['0', '1'].find(p => p !== playerID) + "_being" + being.id.toString()}
          card={cards.find(c => c.id === being.beingCardID)}
          isSelected={ false }
          onSelect={onSelect}
        />
      )}
    </div>
    <div className="myside" >
      { beings[playerID].map(being => 
        <Card
          key={playerID + "_being" + being.id.toString()}
          card={cards.find(c => c.id === being.beingCardID)}
          isSelected={ selectedBeingID === being.beingCardID }
          onSelect={onSelect}
        />
      )}
    </div>
  </div>)
}