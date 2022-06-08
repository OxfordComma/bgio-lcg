// prettier-ignore
const initialState = { "0": null, "1": null };

export default function partyLocationReducer(state, action) {
  switch (action.type) {
    case "__INITIALIZE__":
      return initialState;
    case "DECK_SELECTED":
      return action.playerID === "0" ? 0 : 29;
    case "PARTY_MOVED":
      return action.desination.id;
    default:
      return state;
  }
}
