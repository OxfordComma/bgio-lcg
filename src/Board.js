import React, { useState } from 'react';
import { SelectDeckMenu } from './SelectDeckMenu';
import { PlayerHand } from './PlayerHand';
import { Landscape } from './Landscape';
import { Battlefield } from './Battlefield';
import './styles/Board.css';


function PlayerResources({ resources }) {
  return <div className="gamestate">
    <div>Metal:{resources.metal}</div>
    <div>Wood:{resources.wood}</div>
    <div>Mana:{resources.mana}</div>
  </div>
}

function Controls({ onPlayCard }) {
  return <div className="controls">
    <button onClick={e => {e.preventDefault(); onPlayCard() }}>play</button>
  </div>
}

function GameBoard({ ctx, G, cards, landscapes, beings, playerID, playerResources, playerHand, selectedLandscapeID, selectedHandCardID, selectedBeingID, onSelectLandscape, onSelectCard, onPlayCard }) {
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
        onSelectCard={onSelectCard}
      />
      <PlayerResources resources={playerResources} />
      <Battlefield
        playerID={playerID}
        beings={beings}
        cards={cards}
        onSelectCard={null}
        selectedBeingID={selectedBeingID}
      />
      <Controls onPlayCard={onPlayCard} />
    </div>
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
    console.log('play card')
    !!G.players[ctx.currentPlayer].selectedHandCardID && moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID)
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

  return <GameBoard
    cards={cards}
    landscapes={landscapes}
    beings={beings}
    playerResources={resources}
    playerHand={playerHand}
    playerID={playerID}
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