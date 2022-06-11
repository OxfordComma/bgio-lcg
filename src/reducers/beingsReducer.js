// const positions = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export function itemReducer(state = [], action) {
  switch (action.type) {
    case "CARD_PLAYED":
      switch (action.card.type) {
        case "Item":
          return [
            ...state,
            {
              id: action.card.id,
              playerID: action.playerID,
              beingID: action.beingID,
            },
          ];
        default:
          return state;
      }
    default:
      return state || [];
  }
}

export function beingsReducer(state = [], action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return [
        ...state,
        {
          id: action.startingBeingCardID,
          playerID: action.playerID,
          beingCardID: action.startingBeingCardID,
          position: 1,
        },
      ];
    case "CARD_PLAYED":
      switch (action.card.type) {
        case "Being":
          return [
            ...state,
            {
              id: action.card.id,
              playerID: action.playerID,
              beingCardID: action.card.id,
              position: action.targetPartyPosition,
            },
          ];
        default:
          return state;
      }
    default:
      return state || [];
  }
}
