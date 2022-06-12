import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectDeckMenu } from "./SelectDeckMenu";
import PlayerHand from "./PlayerHand";
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
  canMoveOnLocation,
  selectLandscapeByID,
  selectPlayerBeingByPosition,
  selectSelectedItemID,
} from "../selectors";
import Controls from "./Controls";

function GameBoard({
  playerID,
  opponentID,
  chatMessages,
  onSelectLandscape,
  onSelectBeing,
  onSelectItem,
  onSelectHand,
  onSelectPartyPosition,
  onPlayCard,
  onMove,
  onAttack,
  onEndTurn,
}) {
  return (
    <GameInterface>
      <GameStateBar playerID={playerID} opponentID={opponentID} />
      <Landscape playerID={playerID} onSelect={onSelectLandscape} />
      <Battlefield
        playerID={playerID}
        opponentID={opponentID}
        onSelectPartyPosition={onSelectPartyPosition}
        onSelectBeing={onSelectBeing}
        onSelectItem={onSelectItem}
      />
      <PlayerHand playerID={playerID} onSelect={onSelectHand} />
      <Controls
        playerID={playerID}
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
  G,
  moves,
  events,
  playerID,
  sendChatMessage,
  chatMessages,
}) {
  const navigate = useNavigate();
  const isPlayerTurn = useSelector(({ ctx }) => playerID === ctx.currentPlayer);
  const opponentID = useSelector(({ G }) => selectOpponentID(G, playerID));
  const selectedHandCardID = useSelector(({ G }) =>
    selectSelectedHandCardID(G, playerID)
  );
  const selectedLandscapeID = useSelector(({ G }) =>
    selectSelectedLandscapeID(G, playerID)
  );
  const selectedPartyPosition = useSelector(({ G }) =>
    selectSelectedPartyPosition(G, playerID)
  );
  const selectedBeingID = useSelector(({ G }) =>
    selectSelectedBeingID(G, playerID)
  );
  const selectedItemID = useSelector(({ G }) =>
    selectSelectedItemID(G, playerID)
  );

  function onSelectHand(cardID) {
    moves.selectHandCard(selectedHandCardID !== cardID ? cardID : null);
  }

  function handleOnSelectPartyPosition({ positionID, itemID }) {
    if (positionID === selectedPartyPosition) {
      // && itemID === selectedItemID) {
      moves.selectPartyMember(null, null, null);
    } else {
      const being = selectPlayerBeingByPosition(G, playerID, positionID);
      moves.selectPartyMember(positionID, being?.id, itemID);
    }
  }

  function onSelectLandscape(landscapeID) {
    moves.selectLandscapeCard(
      selectedLandscapeID !== landscapeID ? landscapeID : null
    );
  }

  function onSelectBeing(beingID) {
    moves.selectBeingCard(selectedBeingID !== beingID ? beingID : null);
  }

  function onSelectItem(itemID) {
    moves.selectItemCard(selectedItemID !== itemID ? itemID : null);
  }

  function onMove() {
    const targetLandscape = selectLandscapeByID(G, selectedLandscapeID);

    if (
      isPlayerTurn &&
      targetLandscape &&
      canMoveOnLocation(G, playerID, targetLandscape)
    ) {
      moves.move();
      sendChatMessage(
        `Player ${playerID} party moved to (x: ${targetLandscape.x}, y: ${targetLandscape.y})`
      );
    }
  }

  function onPlayCard() {
    const card =
      selectedHandCardID && selectCardByID(G, playerID, selectedHandCardID);
    if (!card || !canPlayCard(G, playerID, card)) {
      console.log("Can't play this card.", selectedHandCardID);
      return;
    }
    moves.playCard(selectedHandCardID);
    sendChatMessage(`Played card ${card.name}`);
  }

  const attack = () => {
    const totalStrength = selectTotalStrength(G, playerID);
    const totalArmor = selectTotalDefense(G, opponentID);
    const damage = Math.max(totalStrength - totalArmor, 0);

    moves.attack(sendChatMessage);
    sendChatMessage(
      `Attack! Strength: ${totalStrength}, Armor: ${totalArmor}, Damage: ${damage}`
    );

    events.endTurn();
    sendChatMessage(`end turn`);

    // for development
    if (window.location.pathname === `/${playerID}`) {
      navigate(`/${opponentID}`);
    }
  };
  const endTurn = function () {
    sendChatMessage(`end turn`);
    events.endTurn();
  };

  return (
    <GameBoard
      playerID={playerID}
      opponentID={opponentID}
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
      onSelectBeing={onSelectBeing}
      onSelectItem={onSelectItem}
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
  const WrappedBoard = (
    <div className="container">
      {ctx.phase === "menu" ? (
        <SelectDeckMenu playerID={playerID} onDeckSelect={onDeckSelect} />
      ) : (
        <GameBoardWrapper
          G={G}
          moves={moves}
          events={events}
          playerID={playerID}
          sendChatMessage={sendChatMessage}
          chatMessages={chatMessages}
        />
      )}
    </div>
  );
  return WrappedBoard;
}
