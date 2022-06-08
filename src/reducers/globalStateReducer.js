import { Decks } from "../Decks";
import landscapesReducer from "./landscapesReducer";
import resourcesReducer from "./resourcesReducer";
import partyLocationReducer from "./partyLocationReducer";
import playerReducer from "./playerReducer";
import beingsReducer from "./beingsReducer";
import { CardCatalog, generateDeckFromDecklist } from "../Cards";

function cardsReducer(state = null, action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return action.cards;
    default:
      return state;
  }
}

function decklistsReducer(state = null, action) {
  switch (action.type) {
    case "__INITIALIZE__":
      return state;
    case "DECK_SELECTED":
      return action.decklist;
    default:
      return state;
  }
}

function factionReducer(state, action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return {
        ...state,
        startingLocation: action.deck.startingLocation,
        startingBeing: action.deck.startingBeing,
      };
    default:
      return state;
  }
}

const forPlayer = (reducer, player, state, action) => {
  const newObj = { ...state };
  newObj[player] = reducer(state[player], action);
  return newObj;
};

const forBothPlayers = (reducer, state, action) => {
  return Object.entries(state).map(([player, playerState]) =>
    reducer(playerState, action)
  );
};

// prettier-ignore
const initialFactionedState = { "0": null, "1": null };
export const initialState = {
  players: initialFactionedState,
  factions: initialFactionedState,
  partyLocations: initialFactionedState,
  resources: initialFactionedState,
  decklists: initialFactionedState,
  cards: initialFactionedState,
  beings: initialFactionedState,
  landscapes: null,
  decks: null,
};

export default function globalStateReducer(
  state = initialState,
  action,
  currentPlayer
) {
  switch (action.type) {
    case "__INITIALIZE__":
      return {
        ...state,
        players: forBothPlayers(playerReducer, state.players, action),
        factions: forBothPlayers(factionReducer, state.factions, action),
        partyLocations: forBothPlayers(
          partyLocationReducer,
          state.partyLocations,
          action
        ),
        resources: forBothPlayers(resourcesReducer, state.resources, action),
        decklists: forBothPlayers(decklistsReducer, state.decklists, action),
        beings: forBothPlayers(beingsReducer, state.beings, action),
        cards: forBothPlayers(cardsReducer, state.cards, action),
        landscapes: landscapesReducer(state.landscapes, action),
        decks: Decks(),
        cardCatalog: CardCatalog(),
      };
    default:
      return {
        ...state,
        players: forPlayer(playerReducer, currentPlayer, state.players, action),
        factions: forPlayer(
          factionReducer,
          currentPlayer,
          state.factions,
          action
        ),
        partyLocations: forPlayer(
          partyLocationReducer,
          currentPlayer,
          state.partyLocations,
          action
        ),
        resources: forPlayer(
          resourcesReducer,
          currentPlayer,
          state.resources,
          action
        ),
        decklists: forPlayer(
          decklistsReducer,
          currentPlayer,
          state.decklists,
          action
        ),
        beings: forPlayer(beingsReducer, currentPlayer, state.beings, action),
        cards: forPlayer(cardsReducer, currentPlayer, state.cards, action),
        landscapes: landscapesReducer(state.landscapes, action),
      };
  }
}
