import { Client, Lobby } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { CardGame } from "../Game";
import { Board } from "./Board";
import { NavigationMenu, Tab } from "./Navigation";

import React from "react";

const CardGameClient = Client({
  game: CardGame,
  board: Board,
  multiplayer: Local(),
  // multiplayer: SocketIO({ server: `http://${window.location.hostname}:8000`}),
});

const App = () => {
  return (
    <NavigationMenu>
      <Tab path="/" name="Home">
        <div>
          <CardGameClient playerID="0" />
          <CardGameClient playerID="1" />
        </div>
      </Tab>
      {/* <Tab path="/lobby" name="Lobby">
        <Lobby
          gameServer={`http://${window.location.hostname}:8000`}
          lobbyServer={`http://${window.location.hostname}:8000`}
          gameComponents={[
            { game: CardGame, board: Board, }
          ]}
        />
      </Tab> */}
      <Tab path="/both" name="Both">
        <div>
          <CardGameClient playerID="0" />
          <CardGameClient playerID="1" />
        </div>
      </Tab>
      <Tab path="/0" name="Player 0">
        <CardGameClient playerID="0" />
      </Tab>
      <Tab path="/1" name="Player 1">
        <CardGameClient playerID="1" />
      </Tab>
    </NavigationMenu>
  );
};

export default App;
