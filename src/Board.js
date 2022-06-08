import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectDeckMenu } from "./SelectDeckMenu";
import { PlayerHand } from "./PlayerHand";
import { Landscape } from "./Landscape";
import { Battlefield } from "./Battlefield";
import { GameStateBar } from "./GameStateBar";
import { GameInterface } from "./GameInterface";
import "./Board.css";
import {
  canPlayCard,
  selectCardByID,
  selectOpponentID,
  selectSelectedHandCardID,
  selectTotalDefense,
  selectTotalStrength,
  selectSelectedLandscapeID,
  selectSelectedBeingID,
  selectSelectedPartyPosition,
  selectLandscapes,
  canPlaceCardOnLocation,
  selectPlayerBeings,
  selectPlayerResources,
  selectPlayerLife,
  selectPartyLocationID,
  selectPlayerHandCards,
  selectAllCards,
  canMoveOnLocation,
} from "./selectors";

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
  onMove,
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
  const isPlayerTurn = playerID === ctx.currentPlayer;
  const opponentID = selectOpponentID(G, playerID);
  const cards = selectAllCards(G);
  const selectedHandCardID = selectSelectedHandCardID(G, playerID);
  const selectedLandscapeID = selectSelectedLandscapeID(G, playerID);
  const selectedBeingID = selectSelectedBeingID(G, playerID);
  const selectedPartyPosition = selectSelectedPartyPosition(G, playerID);
  const playerBeings = selectPlayerBeings(G, playerID);
  const playerResources = selectPlayerResources(G, playerID);
  const playerLife = selectPlayerLife(G, playerID);
  const opponentBeings = selectPlayerBeings(G, opponentID);
  const opponentResources = selectPlayerResources(G, opponentID);
  const opponentLife = selectPlayerLife(G, opponentID);
  const partyLocation = selectPartyLocationID(G, playerID);
  const playerHand = selectPlayerHandCards(G, playerID);
  const landscapes = selectLandscapes(G).map((landscape) => ({
    ...landscape,
    canPlaceCard: canPlaceCardOnLocation(G, playerID, landscape),
  }));

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

  function onMove() {
    const targetId = selectSelectedLandscapeID(G, playerID);
    const targetLandscape = landscapes.find((l) => l.id === targetId);

    if (
      isPlayerTurn &&
      targetLandscape &&
      selectSelectedLandscapeID(G, playerID) &&
      canMoveOnLocation(G, playerID, targetLandscape)
    ) {
      moves.move();
      sendChatMessage(
        `Player ${playerID} party moved to (x: ${targetLandscape.x}, y: ${targetLandscape.y})`
      );
    }
  }

  function onPlayCard() {
    const cardID = selectSelectedHandCardID(G, playerID);
    const card = cardID && selectCardByID(G, playerID, cardID);
    if (!card || !canPlayCard(G, ctx, card, playerID)) {
      console.log("Can't play this card.", cardID);
      return;
    }
    moves.playCard(cardID);
    sendChatMessage(`Played card ${card.name}`);
  }

  const attack = () => {
    const totalStrength = selectTotalStrength(G, playerID);
    const totalArmor = selectTotalDefense(G, selectOpponentID(G, playerID));
    const damage = Math.max(totalStrength - totalArmor, 0);

    moves.attack(sendChatMessage);
    sendChatMessage(
      `Attack! Strength: ${totalStrength}, Armor: ${totalArmor}, Damage: ${damage}`
    );
  };
  const endTurn = function () {
    sendChatMessage(`end turn`);
    events.endTurn();
  };

  return (
    <GameBoard
      cards={cards}
      landscapes={landscapes}
      partyLocation={partyLocation}
      playerResources={playerResources}
      playerLife={playerLife}
      playerHand={playerHand}
      playerBeings={playerBeings}
      opponentBeings={opponentBeings}
      opponentResources={opponentResources}
      opponentLife={opponentLife}
      isPlayerTurn={isPlayerTurn}
      chatMessages={chatMessages}
      onMove={onMove}
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
  const navigate = useNavigate();
  const opponentID = selectOpponentID(G, playerID);

  function onDeckSelect(deckID) {
    moves.selectDeck(deckID, playerID);
    events.endTurn();

    // for development
    if (window.location.pathname === `/${playerID}`) {
      navigate(`/${opponentID}`);
    }
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
