const initialState = () =>
  Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    landscapeCardID: null,
    playerID: null,
    x: i % 5,
    y: parseInt(i / 5),
  }));

export default function landscapesReducer(state, action) {
  switch (action.type) {
    case "DECK_SELECTED":
      return state.map((landscape) =>
        (action.playerID === "0" && landscape.id === 0) ||
        (action.playerID === "1" && landscape.id === 29)
          ? {
              ...landscape,
              landscapeCardID: action.startingLocationCardID,
              playerID: action.playerID,
            }
          : landscape
      );
    case "CARD_PLAYED":
      return action.card.type === "Location"
        ? state.map((landscape) =>
            action.targetLandscapeID === landscape.id
              ? {
                  ...landscape,
                  landscapeCardID: action.card.id,
                  playerID: action.playerID,
                }
              : landscape
          )
        : state;
    default:
      return state || initialState();
  }
}
