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
  move,
  attack,
  endTurn,
  chatMessages,
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
            move();
          }}
          disabled={!isPlayerTurn}
        >
          move
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
  partyLocation,
  isPlayerTurn,
  playerID,
  playerResources,
  life,
  playerHand,
  selectedLandscapeID,
  selectedHandCardID,
  selectedBeingID,
  chatMessages,
  onSelectLandscape,
  onSelectHand,
  onSelectBeing,
  onPlayCard,
  onMove,
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
        partyLocation={partyLocation}
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
        move={onMove}
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
  function calculateEligibleLandscapes(
    landscapes,
    playerID,
    targetLandscapeID
  ) {
    let allEligibleLandscapes = [];
    landscapes
      .filter((l) => l.id === targetLandscapeID)
      .map((l) => {
        // Strings because javascript doesn't like comparing lists
        allEligibleLandscapes = [
          ...allEligibleLandscapes,
          `${l.x}, ${l.y + 1}`,
          `${l.x}, ${l.y - 1}`,
          `${l.x - 1}, ${l.y}`,
          `${l.x + 1}, ${l.y}`,
        ];
      });

    return allEligibleLandscapes;
  }

  function onMove() {
    const playerID = ctx.currentPlayer;
    const player = G.players[ctx.currentPlayer];
    const landscapes = G.landscapes;

    const startLandscapeID = G.partyLocations[ctx.currentPlayer];
    const startLandscape = landscapes.find((l) => l.id === startLandscapeID);

    const endLandscapeID = player.selectedLandscapeID;
    const endLandscape = landscapes.find((l) => l.id === endLandscapeID);

    if (!!playerID && startLandscapeID != null && endLandscapeID != null) {
      const allEligibleLandscapes = calculateEligibleLandscapes(
        landscapes,
        playerID,
        startLandscapeID
      );

      console.log(
        allEligibleLandscapes,
        `${endLandscape.x}, ${endLandscape.y}`
      );
      if (
        allEligibleLandscapes.includes(`${endLandscape.x}, ${endLandscape.y}`)
      ) {
        moves.move();
      }
      sendChatMessage(`Move from ${startLandscapeID} to ${endLandscapeID}`);
    }
  }

  function onPlayCard() {
    const cardID = G.players[ctx.currentPlayer].selectedHandCardID;
    if (cardID) {
      moves.playCard(cardID, sendChatMessage);
    }
  }

  const landscapes = G.landscapes;
  const beings = G.beings;
  const resources = G.resources[playerID];
  const life = player.deckIDs.length;
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
      life={life}
      partyLocation={partyLocation}
      playerResources={resources}
      playerHand={playerHand}
      playerID={playerID}
      isPlayerTurn={isPlayerTurn}
      chatMessages={chatMessages}
      onMove={onMove}
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
