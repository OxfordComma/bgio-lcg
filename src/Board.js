import React, { useState } from 'react';
import { SelectDeckMenu } from './SelectDeckMenu';
import { PlayerHand } from './PlayerHand';
import { Landscape } from './Landscape';
import { Battlefield } from './Battlefield';
import { GameStateBar } from './GameStateBar';
import './Board.css';

function Controls({ isPlayerTurn, onPlayCard }) {
  return <div className="controls">
    <button onClick={e => {e.preventDefault(); onPlayCard() }} disabled={!isPlayerTurn}>play</button>
  </div>
}

function GameBoard({ 
  cards, 
  landscapes, 
  beings, 
  isPlayerTurn,
  playerID, 
  playerResources, 
  playerHand, 
  selectedLandscapeID, 
  selectedHandCardID, 
  selectedBeingID, 
  onSelectLandscape, 
  onSelectCard, 
  onPlayCard 
}) {
  return (
    <>
      <GameStateBar isPlayerTurn={!!isPlayerTurn} resources={playerResources} />
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
          onSelectCard={onSelectCard}
        />
        <Battlefield
          playerID={playerID}
          beings={beings}
          cards={cards}
          onSelectCard={null}
          selectedBeingID={selectedBeingID}
        />
        <Controls onPlayCard={onPlayCard} isPlayerTurn={isPlayerTurn} />
      </div>
    </>
  )
}


function PlayGameMenu({ ctx, G, moves, playerID }) {
  // This state management needs refactoring later
  let player = G.players[playerID];
  let opponentID = ctx.playOrder.find(p => p !== playerID);
  let cards = [ ...G.cards["0"], ...G.cards["1"] ]; // for now

  const [selectedHandCardID, setSelectedHandCardID] = useState(null);
  const [selectedLandscapeID, setSelectedLandscapeID] = useState(null);
  const [selectedBeingID, setSelectedBeingID] = useState(null);

  function onSelectCard(cardID) {
    setSelectedHandCardID(cardID);
    moves.selectHandCard(cardID);
  }

  function onPlayCard() {
    if (G.players[ctx.currentPlayer]?.selectedHandCardID) {
      moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID);
    }
    setSelectedLandscapeID(null);
    setSelectedHandCardID(null);

  }

  const landscapes = G.landscapes;

  const beings = G.beings;
  const resources = G.resources[ctx.currentPlayer];

  const playerHand = player?.handIDs.map(handId => cards.find(({ id }) => id === handId));

  function onSelectLandscape(landscapeID) {
    setSelectedLandscapeID(landscapeID);
    moves.selectLandscapeCard(landscapeID);
  }

  const isPlayerTurn = playerID === ctx.currentPlayer;

  return <GameBoard
    cards={cards}
    landscapes={landscapes}
    beings={beings}
    playerResources={resources}
    playerHand={playerHand}
    playerID={playerID}
    isPlayerTurn={isPlayerTurn}
    moves={moves}
    selectedHandCardID={selectedHandCardID}
    selectedBeingID={selectedBeingID}
    selectedLandscapeID={selectedLandscapeID}
    onSelectCard={onSelectCard}
    onPlayCard={onPlayCard}
    onSelectLandscape={onSelectLandscape}
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
          playerID={playerID}
        />
      }
    </div>
  );
}