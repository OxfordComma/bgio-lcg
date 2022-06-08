import { PlayerView, TurnOrder } from "boardgame.io/core";
// import { CardFunctions } from './CardFunctions'
import globalStateReducer, { initialState } from "./globalStateReducer";
import {
  createCardsDrawn,
  createHandCardSelected,
  createLandscapeSelected,
  createDeckSelected,
  createCardPlayed,
  createPartyPositionSelected,
  createAttack,
  createPartyMoved,
  createBeginTurn,
} from "./actions";
import {
  selectTopCardIDsFromDeck,
  selectDeckByID,
  selectCardByID,
  canPlayCard,
  selectSelectedBeingID,
  selectSelectedLandscapeID,
  selectTotalStrength,
  selectTotalDefense,
  selectOpponentID,
  selectSelectedPartyPosition,
  selectDecklist,
  selectIncome,
  canMoveOnLocation,
  selectLandscapeByID,
} from "./selectors";
import { generateDeckFromDecklist } from "./Cards";
import { createContext } from "react";

function selectDeck(G, ctx, deckID, playerID) {
  const deck = selectDeckByID(G, deckID);
  if (!deck) return G;

  const decklist = {
    ...deck.decklist,
    [deck.startingLocation]: 1,
    [deck.startingBeing]: 1,
  };
  const cards = generateDeckFromDecklist(decklist);

  const deckCardIDs = ctx.random
    .Shuffle(cards)
    .filter(
      ({ name }) =>
        name !== deck.startingLocation && name !== deck.startingLocation
    )
    .map(({ id }) => id);

  return globalStateReducer(
    G,
    createDeckSelected(
      deck,
      playerID,
      cards,
      decklist,
      deckCardIDs,
      cards.find(({ name }) => name === deck.startingLocation).id,
      cards.find(({ name }) => name === deck.startingBeing).id
    ),
    ctx.currentPlayer
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function drawCard(G, ctx) {
  return globalStateReducer(
    G,
    createCardsDrawn(selectTopCardIDsFromDeck(G, ctx.currentPlayer, 1)),
    ctx.currentPlayer
  );
}

function selectHandCard(G, ctx, id) {
  console.log("select hand card with id:", id);
  return globalStateReducer(G, createHandCardSelected(id), ctx.currentPlayer);
}

function selectLandscapeCard(G, ctx, id) {
  return globalStateReducer(G, createLandscapeSelected(id), ctx.currentPlayer);
}

function selectPartyMember(G, ctx, position, beingId) {
  return globalStateReducer(
    G,
    createPartyPositionSelected(position, beingId),
    ctx.currentPlayer
  );
}

function playCard(G, ctx, id) {
  if (!id) return G;

  console.log("play card:", id);

  const card = selectCardByID(G, ctx.currentPlayer, id);

  if (!canPlayCard(G, ctx, card, ctx.currentPlayer)) {
    console.log("Can't play this card. Missing Resources.", id);
    return G;
  }

  return globalStateReducer(
    G,
    createCardPlayed(
      card,
      ctx.currentPlayer,
      selectSelectedPartyPosition(G, ctx.currentPlayer),
      selectSelectedBeingID(G, ctx.currentPlayer),
      selectSelectedLandscapeID(G, ctx.currentPlayer)
    ),
    ctx.currentPlayer
  );
}

function attack(G, ctx) {
  return globalStateReducer(
    G,
    createAttack(
      ctx.currentPlayer,
      selectOpponentID(G, ctx.currentPlayer),
      selectTopCardIDsFromDeck(
        G,
        ctx.currentPlayer,
        Math.max(
          selectTotalStrength(G, ctx.currentPlayer) -
            selectTotalDefense(G, selectOpponentID(ctx.currentPlayer)),
          0
        )
      )
    ),
    ctx.currentPlayer
  );
}

function move(G, ctx) {
  const destinationID = selectSelectedLandscapeID(G, ctx.currentPlayer);
  const desination = selectLandscapeByID(G, destinationID);
  if (desination && canMoveOnLocation(G, ctx.currentPlayer, desination))
    return globalStateReducer(
      G,
      createPartyMoved(ctx.currentPlayer, desination),
      ctx.currentPlayer
    );
}

function reset(G, ctx) {
  G.players[ctx.currentPlayer].selectedHandCardID = null;
  G.players[ctx.currentPlayer].selectedLandscapeID = null;
  G.players[ctx.currentPlayer].selectedBeingID = null;
  G.players[ctx.currentPlayer].selectedPartyPosition = null;

  return G;
}

const STARTING_HAND_SIZE = 7;

export const CardGame = {
  name: "battle-dudes",
  setup: (ctx) => {
    const G = globalStateReducer(
      initialState,
      { type: "__INITIALIZE__" },
      ctx.currentPlayer
    );
    return G;
  },

  // playerView: PlayerView.STRIP_SECRETS,
  moves: {
    drawCard: drawCard,
    selectHandCard: {
      move: selectHandCard,
      noLimit: true,
    },
    selectLandscapeCard: {
      move: selectLandscapeCard,
      noLimit: true,
    },
    selectPartyMember: {
      move: selectPartyMember,
      noLimit: true,
    },
    playCard: {
      move: playCard,
      noLimit: true,
    },
    move: move,
    attack: attack,
    selectDeck: {
      move: selectDeck,
      noLimit: true,
    },
    reset: {
      move: reset,
      noLimit: true,
    },
  },
  turn: {
    order: TurnOrder.RESET,
    minMoves: 0,
    maxMoves: 2,
    onBegin: (G, ctx) => {
      console.log("turn begin");
      const cardsToDrawCount =
        ctx.turn === 3 || ctx.turn === 4 ? STARTING_HAND_SIZE : 1;
      return globalStateReducer(
        G,
        createBeginTurn(
          ctx.currentPlayer,
          selectIncome(G, ctx.currentPlayer),
          selectTopCardIDsFromDeck(G, ctx.currentPlayer, cardsToDrawCount)
        ),
        ctx.currentPlayer
      );
    },
  },
  phases: {
    menu: {
      start: true,
      next: "play",
      endIf: (G, ctx) =>
        !!selectDecklist(G, ctx.currentPlayer) &&
        !!selectDecklist(G, selectOpponentID(G, ctx.currentPlayer)),
    },
    play: {
      onBegin: (G, ctx) => {
        console.log("phase begin");
        return G;
      },
    },
  },
};
