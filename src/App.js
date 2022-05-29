import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { CardGame } from './Game';
import { Board } from './Board';
import { PlayerSelectMenu } from './PlayerSelectMenu';

import React, { useState, useEffect } from 'react'

const CardGameClient = Client({
  game: CardGame,
  board: Board,
  multiplayer: Local(),
  // playerID: 0
  // multiplayer: SocketIO({ server: '192.168.0.6:8000' }),

});

const App = () => {
  let [playerID, setPlayerID] = useState(null);

  function onPlayerSelect(selectedPlayerID) {
    setPlayerID(selectedPlayerID);
  }
  
  return (
    <div>
      <PlayerSelectMenu currentPlayer={playerID} onPlayerSelect={onPlayerSelect} />
      {playerID && <CardGameClient playerID={playerID}/>}
    </div>
  )
}

export default App;