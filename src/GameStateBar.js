import React from 'react';
import './GameStateBar.css';


export function GameStateBar({ isPlayerTurn , resources }) {
  return <div className='Ngamestate'>
      {
        isPlayerTurn ? 
          <div className='your-turn'>Your turn</div> : 
          <div className='opponent-turn'>Opponents Turn</div>
      }
      <div>
        <span>Metal:</span>
        <div className='resouceCount'>{resources.metal}</div>
      </div>
      <div>
        <span>Wood:</span>
        <div className='resouceCount'>{resources.wood}</div>
      </div>
  </div>
}