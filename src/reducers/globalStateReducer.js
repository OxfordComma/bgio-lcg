import { combineReducers } from "redux";
import { Decks } from "../Decks";
import landscapesReducer from "./landscapesReducer";
import resourcesReducer from "./resourcesReducer";
import partyLocationReducer from "./partyLocationReducer";
import playersReducer from "./playerReducer";
import { beingsReducer, itemReducer } from "./beingsReducer";
import { cardCatalog as getCardCatalog } from "../Cards";

function cardsReducer(state = null, action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return {
        ...state,
        [action.playerID]: action.cards.map((card) => ({
          playerID: action.playerID,
          ...card,
        })),
      };
    default:
      return state || { "0": [], "1": [] };
  }
}

export const initialState = {
  players: null,
  beings: null,
  items: null,
  cards: null,
  cardCatalog: null,
  landscapes: null,
  partyLocations: null,
  resources: null,
  decks: null,
};
export default combineReducers({
  players: playersReducer,
  beings: beingsReducer,
  items: itemReducer,
  cards: cardsReducer,
  cardCatalog: (state) => state || getCardCatalog(),
  landscapes: landscapesReducer,
  partyLocations: partyLocationReducer,
  resources: resourcesReducer,
  decks: (state) => state || Decks(),
});
