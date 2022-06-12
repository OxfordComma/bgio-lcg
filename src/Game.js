import { PlayerView, TurnOrder } from "boardgame.io/core";
import globalStateReducer, {
  initialState,
} from "./reducers/globalStateReducer";
import {
  createCardsDrawn,
  createHandCardSelected,
  createLandscapeSelected,
  createBeingSelected,
  createItemSelected,
  createDeckSelected,
  createCardPlayed,
  createPartyPositionSelected,
  createAttack,
  createPartyMoved,
  createBeginTurn,
  createEndTurn,
  createStartGame,
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
  selectIncome,
  canMoveOnLocation,
  selectLandscapeByID,
  hasPlayerSelectedDeck,
} from "./selectors";
import { generateDeckFromDecklist } from "./Cards";

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
      deckCardIDs,
      cards.find(({ name }) => name === deck.startingLocation).id,
      cards.find(({ name }) => name === deck.startingBeing).id
    )
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
    createCardsDrawn(
      ctx.currentPlayer,
      selectTopCardIDsFromDeck(G, ctx.currentPlayer, 1)
    )
  );
}

function selectHandCard(G, ctx, id) {
  console.log("select hand card with id:", id);
  return globalStateReducer(G, createHandCardSelected(ctx.currentPlayer, id));
}

function selectLandscapeCard(G, ctx, id) {
  return globalStateReducer(G, createLandscapeSelected(ctx.currentPlayer, id));
}

function selectItemCard(G, ctx, id) {
  return globalStateReducer(G, createItemSelected(ctx.currentPlayer, id));
}

function selectBeingCard(G, ctx, id) {
  return globalStateReducer(G, createBeingSelected(ctx.currentPlayer, id));
}

function selectPartyMember(G, ctx, position, beingID, itemID) {
  return globalStateReducer(
    G,
    createPartyPositionSelected(ctx.currentPlayer, position, beingID, itemID)
  );
}

function playCard(G, ctx, id) {
  if (!id) return G;

  console.log("play card:", id);

  const card = selectCardByID(G, ctx.currentPlayer, id);

  if (!canPlayCard(G, ctx.currentPlayer, card)) {
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
    )
  );
}

function attack(G, ctx) {
  const opponentID = selectOpponentID(G, ctx.currentPlayer);
  return globalStateReducer(
    G,
    createAttack(
      ctx.currentPlayer,
      opponentID,
      selectTopCardIDsFromDeck(
        G,
        ctx.currentPlayer,
        Math.max(
          selectTotalStrength(G, ctx.currentPlayer) -
            selectTotalDefense(G, opponentID),
          0
        )
      )
    )
  );
}

function move(G, ctx) {
  const destinationID = selectSelectedLandscapeID(G, ctx.currentPlayer);
  const desination = selectLandscapeByID(G, destinationID);
  if (desination && canMoveOnLocation(G, ctx.currentPlayer, desination)) {
    return globalStateReducer(
      G,
      createPartyMoved(ctx.currentPlayer, desination)
    );
  }
}

export const CardGame = {
  name: "battle-dudes",
  setup: () => globalStateReducer(undefined, { type: "__INITIALIZE__" }),

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
    selectBeingCard: {
      move: selectBeingCard,
      noLimit: true,
    },
    selectItemCard: {
      move: selectItemCard,
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
      console.log("turn begins");
      let income = selectIncome(G, ctx.currentPlayer);
      let cards = selectTopCardIDsFromDeck(G, ctx.currentPlayer, 1);
      let action = createBeginTurn(ctx.currentPlayer, income, cards);

      return globalStateReducer(G, action);
    },
    onEnd: (G, ctx) => {
      console.log("turn ends");

      let action = createEndTurn(ctx.currentPlayer);

      return globalStateReducer(G, action);
    },
  },
  phases: {
    menu: {
      start: true,
      next: "play",
      endIf: (G, ctx) =>
        hasPlayerSelectedDeck(G, ctx.currentPlayer) &&
        hasPlayerSelectedDeck(G, selectOpponentID(G, ctx.currentPlayer)),
    },
    play: {
      onBegin: (G, ctx) => {
        console.log("phase begin");
        const STARTING_HAND_SIZE = 7;
        return globalStateReducer(
          G,
          createStartGame(
            selectTopCardIDsFromDeck(
              G,
              ctx.currentPlayer,
              STARTING_HAND_SIZE - 1
            ),
            selectTopCardIDsFromDeck(
              G,
              selectOpponentID(G, ctx.currentPlayer),
              STARTING_HAND_SIZE
            )
          )
        );
      },
    },
  },
};
