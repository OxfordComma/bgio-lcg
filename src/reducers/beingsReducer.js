export default function beingsReducer(state = [], action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return [
        {
          id: 0,
          beingCardID: action.startingBeingCardID,
          position: 1,
          equipment: [],
        },
      ];
    case "CARD_PLAYED":
      switch (action.card.type) {
        case "Being":
          return state.concat({
            beingCardID: action.card.id,
            id: state.length,
            position: action.targetPartyPosition,
            equipment: [],
          });
        case "Item":
          return state.map((being) =>
            being.id == action.targetPartyPosition
              ? being
              : {
                  ...being,
                  equipment: [
                    ...being.equipment,
                    {
                      id: action.card.id,
                    },
                  ],
                }
          );
        case "Ability":
          return state.map((being) =>
            being.id == action.targetPartyPosition
              ? being
              : {
                  ...being,
                  abilities: [
                    ...being.abilities,
                    {
                      id: action.card.id,
                    },
                  ],
                }
          );
        default:
          return state;
      }
    default:
      return state;
  }
}
