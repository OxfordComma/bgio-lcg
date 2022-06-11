const addResources = (old, change) =>
  Object.entries(old).reduce(
    (acc, [resource, amount]) => ({
      ...acc,
      [resource]: amount + (change[resource] || 0),
    }),
    {}
  );

const removeResources = (old, change) =>
  Object.entries(old).reduce(
    (acc, [resource, amount]) => ({
      ...acc,
      [resource]: amount - (change[resource] || 0),
    }),
    {}
  );

const emptyMaterialsBag = {
  metal: 0,
  wood: 0,
  soul: 0,
};

const initialState = {
  "0": emptyMaterialsBag,
  "1": emptyMaterialsBag,
};
export default function resourcesReducer(state, action) {
  switch (action.type) {
    case "CARD_PLAYED":
      return action.card?.materials
        ? {
            ...state,
            [action.playerID]: removeResources(
              state[action.playerID],
              action.card.materials
            ),
          }
        : state;
    case "BEGIN_TURN":
      return {
        ...state,
        [action.playerID]: addResources(state[action.playerID], action.income),
      };
    default:
      return state || initialState;
  }
}
