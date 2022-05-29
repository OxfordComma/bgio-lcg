import React, { useState } from 'react';
import { SelectDeckMenu } from './SelectDeckMenu';
import { PlayerHand } from './PlayerHand';
import { PlayingField } from './PlayingField';
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

function Battlefield({ ctx, G, cards, fields, playerResources, playerHand, selectedFieldID, selectedHandCardID, onSelectField, onSelectCard, onPlayCard}) {
  return (
    <div className="board">
      <PlayingField
        fields={fields}
        cards={cards}
        onSelect={onSelectField}
        selectedFieldID={selectedFieldID}
      />
      <PlayerHand 
        hand={playerHand}
        selectedCardID={selectedHandCardID}
        onSelectCard={onSelectCard}
      />
      <PlayerResources resources={playerResources} />
      <Controls onPlayCard={onPlayCard} />
    </div>
  )
}


function AboveBattlefield({ ctx, G, moves, playerID }) {
  // This state management needs refactoring later
  let player = G.players[playerID];
  let opponentID = ctx.playOrder.find(p => p !== playerID);
  let cards = [ ...G.cards["0"], ...G.cards["1"] ]; // for now

  const [selectedHandCardID, setSelectedHandCardID] = useState(null);
  const [selectedFieldID, setSelectedFieldID] = useState(null);

  function onSelectCard(cardID) {
    setSelectedHandCardID(cardID);
    moves.selectHandCard(cardID);
  }

  function onPlayCard() {
    setSelectedFieldID(null);
    setSelectedHandCardID(null);
    !!G.players[ctx.currentPlayer].selectedHandCardID && moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID)
  }

  const fields = G.field;

  const resources = G.resources[ctx.currentPlayer];

  const playerHand = player?.handIDs.map(handId => cards.find(({ id }) => id === handId));

  function onSelectField(fieldID) {
    setSelectedFieldID(fieldID);
    moves.selectFieldCard(fieldID);
  }

  return <Battlefield
    cards={cards}
    fields={fields}
    playerResources={resources}
    playerHand={playerHand}
    playerID={playerID}
    moves={moves}
    selectedHandCardID={selectedHandCardID}
    selectedFieldID={selectedFieldID}
    onSelectCard={onSelectCard}
    onPlayCard={onPlayCard}
    onSelectField={onSelectField}
  />;
}

export function GameBoard({ G, ctx, moves, events, playerID }) {
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
        <AboveBattlefield 
          G={G}
          ctx={ctx}
          moves={moves}
          playerID={playerID}
        />
      }
    </div>
  );
}