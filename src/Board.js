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
  partyLocation,
  playerBeings,
  opponentBeings,
  isPlayerTurn,
  playerID,
  opponentID,
  playerResources,
  playerLife,
  playerHand,
  opponentResources,
  opponentLife,
  selectedLandscapeID,
  selectedHandCardID,
  selectedBeingID,
  selectedPartyPosition,
  chatMessages,
  onSelectLandscape,
  onSelectHand,
  onSelectPartyPosition,
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
        partyLocation={partyLocation}
      />
      <Battlefield
        playerID={playerID}
        opponentID={opponentID}
        playerBeings={playerBeings}
        opponentBeings={opponentBeings}
        cards={cards}
        onSelectPartyPosition={onSelectPartyPosition}
        selectedBeingID={selectedBeingID}
        selectedPartyPosition={selectedPartyPosition}
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

  const selectedHandCardID = G.players[ctx.currentPlayer].selectedHandCardID;
  const selectedLandscapeID = G.players[ctx.currentPlayer].selectedLandscapeID;
  const selectedBeingID = G.players[ctx.currentPlayer].selectedBeingID;
  const selectedPartyPosition =
    G.players[ctx.currentPlayer].selectedPartyPosition;

  // const [chatMessages, setChatMessages] = useState([]);

  function onSelectHand(cardID) {
    console.log("set selected card in hand:", cardID);
    moves.selectHandCard(cardID);
    // This properly sets the hand ID to whatever was set in the move
  }

  function handleOnSelectPartyPosition({ positionID, beingCardID }) {
    console.log(
      `Selected party position (id:${positionID}) with being (id: ${beingCardID})`,
      { positionID, beingCardID }
    );
    moves.selectPartyMember(positionID, beingCardID);
  }

  function onSelectLandscape(landscapeID) {
    console.log("set selected landscape:", landscapeID);
    moves.selectLandscapeCard(landscapeID);
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
  const partyLocation = G.partyLocations[playerID];
  console.log("partyLocation", partyLocation);

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
      partyLocation={partyLocation}
      playerResources={playerResources}
      playerLife={playerLife}
      playerHand={playerHand}
      playerBeings={beings[playerID]}
      opponentBeings={beings[opponentID]}
      opponentResources={opponentResources}
      opponentLife={opponentLife}
      isPlayerTurn={isPlayerTurn}
      chatMessages={chatMessages}
      onAttack={attack}
      onEndTurn={endTurn}
      selectedHandCardID={selectedHandCardID}
      selectedLandscapeID={selectedLandscapeID}
      selectedBeingID={selectedBeingID}
      selectedPartyPosition={selectedPartyPosition}
      onSelectHand={onSelectHand}
      onSelectPartyPosition={handleOnSelectPartyPosition}
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
