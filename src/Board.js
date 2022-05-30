import React, { useState } from 'react';
import { SelectDeckMenu } from './SelectDeckMenu';
import { PlayerHand } from './PlayerHand';
import { Landscape } from './Landscape';
import { Battlefield } from './Battlefield';
import './styles/Board.css';


function PlayerResources({ life, resources }) {
  return <div className="gamestate">
    <div>Metal: {resources.metal}</div>
    <div>Wood: {resources.wood}</div>
    <div>Mana: {resources.mana}</div>
    <div>Life: {life}</div>
  </div>
}

function Controls({ onPlayCard, attack, endTurn }) {
  return <div className="controls">
    <button onClick={e => {e.preventDefault(); onPlayCard() }}>play</button>
    <button onClick={e => {e.preventDefault(); attack() }}>attack</button>
    <button onClick={e => {e.preventDefault(); endTurn() }}>end</button>
  </div>
}

function GameBoard({ 
  ctx, G, 
  cards, landscapes, beings, 
  playerID, playerResources, life, playerHand, 
  attack, endTurn,
  selectedLandscapeID, selectedHandCardID, selectedBeingID, 
  onSelectLandscape, onSelectHand, onSelectBeing, onPlayCard 
}) {
  return (
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
      <PlayerResources 
        life={life}
        resources={playerResources} 
      />
      <Battlefield
        playerID={playerID}
        beings={beings}
        cards={cards}
        onSelect={onSelectBeing}
        selectedBeingID={selectedBeingID}
      />
      <Controls 
        attack={attack}
        onPlayCard={onPlayCard} 
        endTurn={endTurn}
      />
    </div>
  )
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
    console.log('play card')
    !!G.players[ctx.currentPlayer].selectedHandCardID && moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID)
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
  

  return <GameBoard
    cards={cards}
    landscapes={landscapes}
    beings={beings}
    life={life}
    playerResources={resources}
    playerHand={playerHand}
    playerID={playerID}
    attack={attack}
    endTurn={endTurn}
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