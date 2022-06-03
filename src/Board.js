import React, { useState } from "react";
import { SelectDeckMenu } from "./SelectDeckMenu";
import { PlayerHand } from "./PlayerHand";
import { Landscape } from "./Landscape";
import { Battlefield } from "./Battlefield";
import { GameStateBar } from "./GameStateBar";
import { GameInterface } from "./GameInterface";
import "./Board.css";

function Controls({
  isPlayerTurn,
  onPlayCard,
  attack,
  endTurn,
  consoleMessages,
}) {
  return (
    <div className="controls">
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onPlayCard();
          }}
          disabled={!isPlayerTurn}
        >
          play
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            attack();
          }}
          disabled={!isPlayerTurn}
        >
          attack
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            endTurn();
          }}
          disabled={!isPlayerTurn}
        >
          end
        </button>
      </div>
      <div className="output">
        {consoleMessages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

function GameBoard({
  cards,
  landscapes,
  beings,
  isPlayerTurn,
  playerID,
  playerResources,
  life,
  playerHand,
  selectedLandscapeID,
  selectedHandCardID,
  selectedBeingID,
  consoleMessages,
  onSelectLandscape,
  onSelectHand,
  onSelectBeing,
  onPlayCard,
  onAttack,
  onEndTurn,
}) {
  return (
    <GameInterface>
      <GameStateBar
        isPlayerTurn={!!isPlayerTurn}
        resources={playerResources}
        life={life}
      />
      <Landscape
        playerID={playerID}
        landscapes={landscapes}
        cards={cards}
        onSelect={onSelectLandscape}
        selectedLandscapeID={selectedLandscapeID}
      />
      <Battlefield
        playerID={playerID}
        beings={beings}
        cards={cards}
        onSelectCard={onSelectBeing}
        selectedBeingID={selectedBeingID}
      />
      <PlayerHand
        hand={playerHand}
        selectedCardID={selectedHandCardID}
        onSelect={onSelectHand}
      />
      <Controls
        isPlayerTurn={isPlayerTurn}
        attack={onAttack}
        onPlayCard={onPlayCard}
        endTurn={onEndTurn}
        consoleMessages={consoleMessages}
      />
    </GameInterface>
  );
}

function GameBoardWrapper({ ctx, G, moves, events, playerID }) {
  // This state management needs refactoring later
  let player = G.players[playerID];
  let opponentID = ctx.playOrder.find((p) => p !== playerID);
  let cards = [...G.cards["0"], ...G.cards["1"]]; // for now

  // const [selectedHandCardID, setSelectedHandCardID] = useState(null);
  const selectedHandCardID = G.players[ctx.currentPlayer].selectedHandCardID;
  // const [selectedLandscapeID, setSelectedLandscapeID] = useState(null);
  const selectedLandscapeID = G.players[ctx.currentPlayer].selectedLandscapeID;
  // const [selectedBeingID, setSelectedBeingID] = useState(null);
  const selectedBeingID = G.players[ctx.currentPlayer].selectedBeingID;

  const [consoleMessages, setConsoleMessages] = useState([]);

  function onSelectHand(cardID) {
    console.log("set selected card in hand:", cardID);
    moves.selectHandCard(cardID);
    // This properly sets the hand ID to whatever was set in the move
    // setSelectedHandCardID(G.players[ctx.currentPlayer].selectedHandCardID == cardID ? null : cardID);
  }

  function onSelectBeing(beingID) {
    console.log("set selected card in hand:", beingID);
    moves.selectBeingCard(beingID);
    // setSelectedBeingID(G.players[ctx.currentPlayer].selectedBeingID == beingID ? null : beingID);
  }

  function onSelectLandscape(landscapeID) {
    console.log("set selected landscape:", landscapeID);
    moves.selectLandscapeCard(landscapeID);
    // setSelectedLandscapeID(G.players[ctx.currentPlayer].selectedLandscapeID == landscapeID ? null : landscapeID);
  }

  function onPlayCard() {
    const cardID = G.players[ctx.currentPlayer].selectedHandCardID;
    if (cardID) {
      moves.playCard(cardID);
    }
    console.log(G.players[ctx.currentPlayer].selectedHandCardID);

    // if (G.players[ctx.currentPlayer].selectedHandCardID === null)
    setConsoleMessages([
      ...consoleMessages,
      `player ${playerID} played card ${
        cards.find((c) => c.id === cardID).name
      }`,
    ]);

    // else {
    // setConsoleMessages([...consoleMessages, `player ${playerID} tried to play card ${cards.find(c => c.id === cardID).name} but failed!`])

    // setSelectedLandscapeID(null);
    // setSelectedHandCardID(null);
    // setSelectedBeingID(null);
  }

  const landscapes = G.landscapes;
  const beings = G.beings;
  const resources = G.resources[playerID];
  const life = player.deckIDs.length;
  const playerHand = player?.handIDs.map((handId) =>
    cards.find(({ id }) => id === handId)
  );

  const attack = function () {
    setConsoleMessages([...consoleMessages, `player ${playerID} attack!`]);
    moves.attack();
  };
  const endTurn = function () {
    setConsoleMessages([...consoleMessages, `player ${playerID} end turn`]);
    events.endTurn();
  };

  const isPlayerTurn = playerID === ctx.currentPlayer;

  return (
    <GameBoard
      cards={cards}
      landscapes={landscapes}
      beings={beings}
      life={life}
      playerResources={resources}
      playerHand={playerHand}
      playerID={playerID}
      isPlayerTurn={isPlayerTurn}
      consoleMessages={consoleMessages}
      onAttack={attack}
      onEndTurn={endTurn}
      selectedHandCardID={selectedHandCardID}
      selectedLandscapeID={selectedLandscapeID}
      selectedBeingID={selectedBeingID}
      onSelectHand={onSelectHand}
      onSelectBeing={onSelectBeing}
      onSelectLandscape={onSelectLandscape}
      onPlayCard={onPlayCard}
    />
  );
}

export function Board({ G, ctx, moves, events, playerID }) {
  function onDeckSelect(deckID) {
    moves.selectDeck(deckID, playerID);
  }
  return (
    <div className="container">
      {ctx.phase === "menu" ? (
        <SelectDeckMenu decks={G.decks} onDeckSelect={onDeckSelect} />
      ) : (
        <GameBoardWrapper
          G={G}
          ctx={ctx}
          moves={moves}
          events={events}
          playerID={playerID}
        />
      )}
    </div>
  );
}
