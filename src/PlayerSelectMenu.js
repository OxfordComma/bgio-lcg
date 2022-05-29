import React, { useState } from 'react';


export function PlayerSelectMenu({ currentPlayer, onPlayerSelect }) {
  const styles = {
    padding: "5px",
  };
  return <div className="player-select-menu" style={styles}>
    <div>Currently Playing as: <span>{currentPlayer}</span></div>
    <div>
      Switch to:
      <span style={styles}>
        { currentPlayer !== '0' && <button onClick={() => onPlayerSelect('0')}>Player 0</button> }
        { currentPlayer !== '1' && <button onClick={() => onPlayerSelect('1')}>Player 1</button> }
      </span>
    </div>
  </div>
}