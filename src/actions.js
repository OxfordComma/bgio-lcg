export const createDeckSelected = (
  deck,
  playerID,
  cards,
  deckIDs,
  startingLocationCardID,
  startingBeingCardID
) => ({
  type: "DECK_SELECTED",
  deck,
  playerID,
  cards,
  deckIDs,
  startingLocationCardID,
  startingBeingCardID,
});

export const createStartGame = (
  firstPlayerCardsDrawn,
  secondPlayerCardsDrawn
) => ({
  type: "START_GAME",
  drawnCards: {
    "0": firstPlayerCardsDrawn,
    "1": secondPlayerCardsDrawn,
  },
});

export const createCardsDrawn = (playerID, cards) => ({
  type: "CARDS_DRAWN",
  playerID,
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

export const createCardUsed = (
  card,
  playerID,
  targetPartyPosition,
  beingID,
  targetLandscapeID
) => ({
  type: "CARD_USED",
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

export const createPartyPositionSelected = (
  playerID,
  positionID,
  beingID,
  itemID
) => ({
  type: "PARTY_MEMBER_SELECTED",
  playerID,
  positionID,
  beingID,
  itemID,
});

export const createHandCardSelected = (playerID, id) => ({
  type: "HAND_CARD_SELECTED",
  playerID,
  id,
});

export const createLandscapeSelected = (playerID, id) => ({
  type: "LANDSCAPE_SELECTED",
  playerID,
  id,
});

export const createBeingSelected = (playerID, id) => ({
  type: "BEING_SELECTED",
  playerID,
  id,
});

export const createItemSelected = (playerID, id) => ({
  type: "ITEM_SELECTED",
  playerID,
  id,
});

export const createAttack = (playerID, targetID, cardIDsToDiscard) => ({
  playerID,
  targetID,
  cardIDsToDiscard,
});

export const createBeginTurn = (playerID, income, cardsDrawn) => ({
  type: "BEGIN_TURN",
  playerID,
  income,
  cardsDrawn,
});

export const createEndTurn = (playerID) => ({
  type: "END_TURN",
  playerID,
});
