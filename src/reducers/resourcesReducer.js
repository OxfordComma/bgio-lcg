const initialState = {
  metal: 0,
  wood: 0,
  soul: 0,
};

export default function resourcesReducer(state, action) {
  switch (action.type) {
    case "__INITIALIZE__":
      return initialState;
    case "CARD_PLAYED":
      return {
        metal: state.metal - (action.card?.materials?.metal || 0),
        wood: state.wood - (action.card?.materials?.wood || 0),
        soul: state.soul - (action.card?.materials?.soul || 0),
      };
    case "BEGIN_TURN":
      return {
        metal: state.metal + (action.income.metal || 0),
        wood: state.wood + (action.income.wood || 0),
        soul: state.soul + (action.income.soul || 0),
      };
    default:
      return state;
  }
}
