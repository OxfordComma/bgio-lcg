import React, { useState } from "react";
import { SelectDeckMenu } from "./SelectDeckMenu";
import { PlayerHand } from "./PlayerHand";
import { Landscape } from "./Landscape";
import { Battlefield } from "./Battlefield";
import { GameStateBar } from "./GameStateBar";
import { GameInterface } from "./GameInterface";
import "./Board.css";

function Controls({ isPlayerTurn, onPlayCard, attack, endTurn, chatMessages }) {
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
        {chatMessages.map((msg, i) => (
          <div key={i}>{`player ${msg.sender}: ${msg.payload}`}</div>
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
  playerLife,
  playerHand,
  opponentResources,
  opponentLife,
  selectedLandscapeID,
  selectedHandCardID,
  selectedBeingID,
  chatMessages,
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
        playerResources={playerResources}
        opponentResources={opponentResources}
        playerLife={playerLife}
        opponentLife={opponentLife}
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
        chatMessages={chatMessages}
      />
    </GameInterface>
  );
}

function GameBoardWrapper({
  ctx,
  G,
  moves,
  events,
  playerID,
  sendChatMessage,
  chatMessages,
}) {
  // This state management needs refactoring later
  let player = G.players[playerID];
  let opponentID = ctx.playOrder.find((p) => p !== playerID);
  let opponent = G.players[opponentID];
  let cards = [...G.cards["0"], ...G.cards["1"]]; // for now

  // const [selectedHandCardID, setSelectedHandCardID] = useState(null);
  const selectedHandCardID = G.players[ctx.currentPlayer].selectedHandCardID;
  // const [selectedLandscapeID, setSelectedLandscapeID] = useState(null);
  const selectedLandscapeID = G.players[ctx.currentPlayer].selectedLandscapeID;
  // const [selectedBeingID, setSelectedBeingID] = useState(null);
  const selectedBeingID = G.players[ctx.currentPlayer].selectedBeingID;

  // const [chatMessages, setChatMessages] = useState([]);

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
      moves.playCard(cardID, sendChatMessage);
    }
  }

  const landscapes = G.landscapes;
  const beings = G.beings;
  const playerResources = G.resources[playerID];
  const opponentResources = G.resources[opponentID];

  const playerLife = player.deckIDs.length;
  const opponentLife = opponent.deckIDs.length;

  const playerHand = player?.handIDs.map((handId) =>
    cards.find(({ id }) => id === handId)
  );

  const attack = function () {
    // sendChatMessage(`attack!`);
    moves.attack(sendChatMessage);
  };
  const endTurn = function () {
    sendChatMessage(`end turn`);
    events.endTurn();
  };

  const isPlayerTurn = playerID === ctx.currentPlayer;

  return (
    <GameBoard
      cards={cards}
      landscapes={landscapes}
      beings={beings}
      playerResources={playerResources}
      playerLife={playerLife}
      playerHand={playerHand}
      playerID={playerID}
      opponentResources={opponentResources}
      opponentLife={opponentLife}
      isPlayerTurn={isPlayerTurn}
      chatMessages={chatMessages}
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

export function Board({
  G,
  ctx,
  moves,
  events,
  playerID,
  sendChatMessage,
  chatMessages,
}) {
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
          sendChatMessage={sendChatMessage}
          chatMessages={chatMessages}
        />
      )}
    </div>
  );
}
