import { combineReducers } from "redux";

const playerReducer = (state, action) => {
  switch (action.type) {
    case "DECK_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            deckSelected: action.deck.id,
            deckIDs: action.deckIDs,
          }
        : state;
    case "DRAW_CARDS":
      return state.id === action.playerID
        ? {
            ...state,
            deckIDs: state.deckIDs.filter(
              (deckCardID) => !action.cards.includes(deckCardID)
            ),
            handIDs: [...state.handIDs, ...action.cards],
          }
        : state;
    case "START_GAME":
      return {
        ...state,
        deckIDs: state.deckIDs.filter(
          (id) => !action.drawnCards[state.id].includes(id)
        ),
        handIDs: [...state.handIDs, ...action.drawnCards[state.id]],
      };
    case "CARD_PLAYED":
      return state.id === action.playerID
        ? {
            ...state,
            handIDs: state.handIDs.filter((cid) => cid !== action.card.id),
            discardIDs: [...state.discardIDs, action.card.id],
            selectedHandCardID: null,
            selectedLandscapeID: null,
            selectedBeingID: null,
            selectedPartyPosition: null,
          }
        : state;
    case "CARD_USED":
      if (action.card.effect.hasOwnProperty("damage")) {
        // This will apply to all other players, not just the targeted opponent
        return state.id !== action.playerID
          ? {
              ...state,
              deckIDs: state.deckIDs.slice(action.card.effect.damage.amount),
              discardIDs: [
                ...state.discardIDs,
                ...state.deckIDs.slice(0, action.card.effect.damage.amount),
              ],
            }
          : state;
      }
      if (action.card.effect.hasOwnProperty("healing")) {
        return state.id === action.playerID
          ? {
              ...state,
              deckIDs: [
                ...state.deckIDs,
                ...state.discardIDs.slice(action.card.effect.healing.amount),
              ],
              discardIDs: state.discardIDs.slice(
                action.card.effect.healing.amount
              ),
            }
          : state;
      }
    // }
    case "BEGIN_TURN":
      return state.id === action.playerID
        ? {
            ...state,
            handIDs: [...state.handIDs, ...action.cardsDrawn],
            deckIDs: state.deckIDs.filter(
              (id) => !action.cardsDrawn.includes(id)
            ),
          }
        : state;
    case "HAND_CARD_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            selectedHandCardID: action.id,
          }
        : state;
    case "PARTY_MEMBER_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            selectedPartyPosition: action.positionID,
            // selectedBeingID: action.beingID,
            // selectedItemID: action.itemID,
          }
        : state;
    case "LANDSCAPE_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            selectedLandscapeID: action.id,
          }
        : state;

    case "ITEM_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            selectedItemID: action.id,
          }
        : state;
    case "BEING_SELECTED":
      return state.id === action.playerID
        ? {
            ...state,
            selectedBeingID: action.id,
          }
        : state;
    case "ATTACK":
      return state.id === action.targetID
        ? {
            ...state,
            deckIDs: state.deckIDs.filter(
              ({ id }) => !action.cardIDsToDiscard.includes(id)
            ),
            discardIDs: [...state.discardIDs, ...action.cardIDsToDiscard],
          }
        : state;
    case "END_TURN":
      return state.id === action.playerID
        ? {
            ...state,
            selectedLandscapeID: null,
            selectedBeingID: null,
            selectedPartyPosition: null,
            selectedHandCardID: null,
            selectedItemID: null,
          }
        : state;
    default:
      return state || null;
  }
};

const innerPlayersReducer = combineReducers({
  "0": playerReducer,
  "1": playerReducer,
});

const initialState = {
  handIDs: [],
  deckIDs: [],
  discardIDs: [],
  selections: null,
  selectedHandCardID: null,
  selectedLandscapeID: null,
  selectedPartyPosition: null,
  selectedBeingID: null,
  selectedItemID: null,
};

export default function playersReducer(state, action) {
  if (!state) {
    state = {
      "0": { id: "0", ...initialState },
      "1": { id: "1", ...initialState },
    };
  }
  return innerPlayersReducer(state, action);
}
