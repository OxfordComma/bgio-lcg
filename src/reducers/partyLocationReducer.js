// prettier-ignore
const initialState = { "0": null, "1": null };

export default function partyLocationReducer(state, action) {
  switch (action.type) {
    case "PARTY_MOVED":
      return { ...state, [action.playerID]: action.desination.id };
    default:
      return state || { "0": 0, "1": 29 };
  }
}
