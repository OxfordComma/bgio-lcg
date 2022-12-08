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
        case "Ability":
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
    case "CARD_USED":
      switch (action.card.type) {
        case "Item":
          return [...state.filter((item) => item.id !== action.card.id)];
        case "Ability":
          return state;
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
          attackedThisTurn: false,
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
              attackedThisTurn: false,
            },
          ];
        default:
          return state;
      }
    case "ATTACK":
      // const attacker = state.find(being => being.id == action.attackerId)
      // attacker.attackedThisTurn = true
      return [
        ...state.map((being) =>
          being.id == action.attackerId
            ? { ...being, attackedThisTurn: true }
            : being
        ),
      ];
    default:
      return state || [];
  }
}
