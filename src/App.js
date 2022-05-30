import { Client, Lobby } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { CardGame } from './Game';
import { Board } from './Board';

import React, { useState, useEffect } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const CardGameClient = Client({
  game: CardGame,
  board: Board,
  multiplayer: Local(),
  // playerID: 0
  // multiplayer: SocketIO({ server: '192.168.0.6:8000' }),
  // multiplayer: SocketIO({ server: `http://${window.location.hostname}:8000`}),
  
});


// const playerID = (Math.floor(Math.random() * 1000000)).toString()
const App = () => {
  // let [playerID, setPlayerID] = useState(null);
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
      {/* <Lobby
        gameServer={`http://${window.location.hostname}:8000`}
        lobbyServer={`http://${window.location.hostname}:8000`}
        gameComponents={[
          { game: CardGame, board: Board, }
        ]}
      /> */}
      <CardGameClient playerID='0'/>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Lobby
            gameServer={`http://${window.location.hostname}:8000`}
            lobbyServer={`http://${window.location.hostname}:8000`}
            gameComponents={[
              { game: CardGame, board: Board, }
            ]}
          />
        } />
        <Route path="/0" element={<CardGameClient playerID='0'/>} />
        <Route path="/1" element={<CardGameClient playerID='1'/>} />
      </Routes>
    </BrowserRouter> */}
    </div>
  )
}

export default App;