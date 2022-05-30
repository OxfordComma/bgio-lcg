import React, { useState } from 'react';
import { SelectDeckMenu } from './SelectDeckMenu';
import { PlayerHand } from './PlayerHand';
import { Landscape } from './Landscape';
import { Battlefield } from './Battlefield';
import { GameStateBar } from './GameStateBar';
import './Board.css';

function Controls({ isPlayerTurn, onPlayCard, attack, endTurn }) {
  return <div className="controls">
    <button onClick={e => {e.preventDefault(); onPlayCard() }} disabled={!isPlayerTurn}>play</button>
    <button onClick={e => {e.preventDefault(); attack() }} disabled={!isPlayerTurn}>attack</button>
    <button onClick={e => {e.preventDefault(); endTurn() }} disabled={!isPlayerTurn}>end</button>
  </div>
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
  onSelectLandscape, 
  onSelectHand, 
  onPlayCard,
  onAttack,
  onEndTurn,
}) {
  return (<>
      <GameStateBar isPlayerTurn={!!isPlayerTurn} resources={playerResources} life={life} />
      <div className="board">
        <Landscape
          playerID={playerID}
          landscapes={landscapes}
          cards={cards}
          onSelect={onSelectLandscape}
          selectedLandscapeID={selectedLandscapeID}
        />
        <PlayerHand 
          hand={playerHand}
          selectedCardID={selectedHandCardID}
          onSelect={onSelectHand}
        />
        <Battlefield
          playerID={playerID}
          beings={beings}
          cards={cards}
          onSelectCard={null}
          selectedBeingID={selectedBeingID}
        />
        <Controls 
          isPlayerTurn={isPlayerTurn}
          attack={onAttack}
          onPlayCard={onPlayCard} 
          endTurn={onEndTurn}
        />
      </div>
    </>)
}


function PlayGameMenu({ ctx, G, moves, events, playerID }) {
  // This state management needs refactoring later
  let player = G.players[playerID];
  let opponentID = ctx.playOrder.find(p => p !== playerID);
  let cards = [ ...G.cards["0"], ...G.cards["1"] ]; // for now

  const [selectedHandCardID, setSelectedHandCardID] = useState(null);
  const [selectedLandscapeID, setSelectedLandscapeID] = useState(null);
  const [selectedBeingID, setSelectedBeingID] = useState(null);

  function onSelectHand(cardID) {
    console.log('set selected card in hand:', cardID)
    moves.selectHandCard(cardID);
    // This properly sets the hand ID to whatever was set in the move
    setSelectedHandCardID(G.players[ctx.currentPlayer].selectedHandCardID == cardID ? null : cardID);
  }

  function onSelectBeing(beingID) {
    console.log('set selected card in hand:', beingID)
    moves.selectBeingCard(beingID);
    setSelectedBeingID(G.players[ctx.currentPlayer].selectedBeingID == beingID ? null : beingID);
  }

  function onSelectLandscape(landscapeID) {
    console.log('set selected landscape:', landscapeID)
    moves.selectLandscapeCard(landscapeID);
    setSelectedLandscapeID(G.players[ctx.currentPlayer].selectedLandscapeID == landscapeID ? null : landscapeID);
  }

  function onPlayCard() {
    if (G.players[ctx.currentPlayer]?.selectedHandCardID) {
      moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID);
    }
    setSelectedLandscapeID(null);
    setSelectedHandCardID(null);
    setSelectedBeingID(null);
  }

  const landscapes = G.landscapes;
  const beings = G.beings;
  const resources = G.resources[playerID];
  const life = player.deckIDs.length
  const playerHand = player?.handIDs.map(handId => cards.find(({ id }) => id === handId));
  const attack = moves.attack;
  const endTurn = events.endTurn;
  

  const isPlayerTurn = playerID === ctx.currentPlayer;

  return <GameBoard
    cards={cards}
    landscapes={landscapes}
    beings={beings}
    life={life}
    playerResources={resources}
    playerHand={playerHand}
    playerID={playerID}
    isPlayerTurn={isPlayerTurn}
    onAttack={attack}
    onEndTurn={endTurn}
    selectedHandCardID={selectedHandCardID}
    selectedLandscapeID={selectedLandscapeID}
    selectedBeingID={selectedBeingID}
    onSelectHand={onSelectHand}
    onSelectBeing={onSelectBeing}
    onSelectLandscape={onSelectLandscape}
    onPlayCard={onPlayCard}
  />;
}


export function Board({ G, ctx, moves, events, playerID }) {
  function onDeckSelect(deckType) {
    moves.selectDeck('Fire Deck', playerID);
    // moves.selectDeck(deckType, playerID)
  }
  return (
    <div className="container">
      {ctx.phase === 'menu' ? 
        <SelectDeckMenu
          decks={G.decks}
          onDeckSelect={onDeckSelect}
        /> : 
        <PlayGameMenu 
          G={G}
          ctx={ctx}
          moves={moves}
          events={events}
          playerID={playerID}
        />
      }
    </div>
  );
}