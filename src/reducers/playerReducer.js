const initialState = {
  handIDs: [],
  deckIDs: [],
  discardIDs: [],
  selectedHandCardID: null,
  selectedLandscapeID: null,
  selectedBeingID: null,
  selectedPartyPosition: null,
};

export default function playerReducer(state, action) {
  switch (action.type) {
    case "__INITIALIZE__":
      return initialState;
    case "DECK_SELECTED":
      return {
        ...state,
        deckIDs: action.deckIDs,
      };
    case "DRAW_CARDS":
      return {
        ...state,
        deckIDs: state.deckIDs.filter((deckCardID) =>
          action.cards.includes(deckCardID)
        ),
        handIDs: [...state.handIDs, ...action.cards],
      };
    case "CARD_PLAYED":
      return {
        ...state,
        handIDs: state.handIDs.filter((cid) => cid !== action.card.id),
        discardIDs: [...state.discardIDs, action.card.id],
        selectedHandCardID: null,
        selectedLandscapeID: null,
        selectedBeingID: null,
        selectedPartyPosition: null,
      };
    case "BEGIN_TURN":
      return {
        ...state,
        handIDs: [...state.handIDs, ...action.cardsDrawn],
        deckIDs: state.deckIDs.filter((id) => !action.cardsDrawn.includes(id)),
      };
    case "HAND_CARD_SELECTED":
      return {
        ...state,
        selectedHandCardID:
          state.selectedHandCardID === action.id ? null : action.id,
      };
    case "PARTY_MEMBER_SELECTED":
      return state.selectedPartyPosition === action.id
        ? { ...state, selectedPartyPosition: null, selectedBeingID: null }
        : {
            ...state,
            selectedPartyPosition: action.positionID,
            selectedBeingID: action.beingID,
          };
    case "LANDSCAPE_SELECTED":
      return {
        ...state,
        selectedLandscapeID:
          state.selectedLandscapeID === action.id ? null : action.id,
      };
    case "ATTACK":
      return player === action.targetID
        ? {
            ...state,
            deckIDs: state.deckIDs.filter(
              ({ id }) => !action.cardIDsToDiscard.includes(id)
            ),
            discardIDs: [...state.discardIDs, ...action.cardIDsToDiscard],
          }
        : state;
    default:
      return state;
  }
}
