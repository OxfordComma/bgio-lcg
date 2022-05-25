import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { CardGame } from './Game';
import { GameBoard } from './Board';

import React, { useState, useEffect } from 'react'

const CardGameClient = Client({
  game: CardGame,
  board: GameBoard,
  multiplayer: Local(),
  // playerID: 0
  // multiplayer: SocketIO({ server: '192.168.0.6:8000' }),

});


// const playerID = (Math.floor(Math.random() * 1000000)).toString()
const App = () => {
  let [playerID, setPlayerID] = useState(null);
  // return (
  //   playerID == null ? 
  //   <div>
  //     <form onSubmit={e => {e.preventDefault(); setPlayerID(e.target[0].value);}}>
  //       <label for='playerID'>playerID: </label>
  //       <select id='playerID' type='dropdown' >
  //         <option value='0'>0</option>
  //         <option value='1'>1</option>
  //       </select>
  //       <button type='submit'>submit</button>
  //     </form>
  //   </div> :
  //   <div>
  //     <CardGameClient playerID={playerID}/>
  //   </div>
  // )
  return (
    <div>
      <CardGameClient playerID='0'/>
      <CardGameClient playerID='1'/>
    </div>
  )
}

export default App;