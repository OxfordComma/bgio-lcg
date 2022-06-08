export const createDeckSelected = (
  deck,
  playerID,
  cards,
  decklist,
  deckIDs,
  startingLocationCardID,
  startingBeingCardID
) => ({
  type: "DECK_SELECTED",
  deck,
  playerID,
  cards,
  decklist,
  deckIDs,
  startingLocationCardID,
  startingBeingCardID,
});

export const createCardsDrawn = (cards) => ({
  type: "CARDS_DRAWN",
  cards,
});

export const createCardPlayed = (
  card,
  playerID,
  targetPartyPosition,
  beingID,
  targetLandscapeID
) => ({
  type: "CARD_PLAYED",
  card,
  playerID,
  targetPartyPosition,
  beingID,
  targetLandscapeID,
});

export const createPartyMoved = (playerID, desination) => ({
  type: "PARTY_MOVED",
  playerID,
  desination,
});

export const createPartyPositionSelected = (positionID, beingID) => ({
  type: "PARTY_MEMBER_SELECTED",
  positionID,
  beingID,
});

export const createHandCardSelected = (id) => ({
  type: "HAND_CARD_SELECTED",
  id,
});

export const createLandscapeSelected = (id) => ({
  type: "LANDSCAPE_SELECTED",
  id,
});

export const createAttack = (attackerID, targetID, cardIDsToDiscard) => ({
  attackerID,
  targetID,
  cardIDsToDiscard,
});

export const createBeginTurn = (playerID, income, cardsDrawn) => ({
  type: "BEGIN_TURN",
  playerID,
  income,
  cardsDrawn,
});
