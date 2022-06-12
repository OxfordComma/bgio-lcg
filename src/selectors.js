export const selectPlayer = (G, playerID) => G.players[playerID];

export const selectOpponentID = (G, playerID) =>
  Object.keys(G.players).find((id) => id != playerID);

export const selectSelectedBeingID = (G, playerID) =>
  selectPlayer(G, playerID).selectedBeingID;

export const selectSelectedPartyPosition = (G, playerID) =>
  selectPlayer(G, playerID).selectedPartyPosition;

export const selectSelectedLandscapeID = (G, playerID) =>
  selectPlayer(G, playerID).selectedLandscapeID;

export const selectTopCardIDsFromDeck = (G, playerID, count) =>
  selectPlayer(G, playerID)?.deckIDs?.slice(0, count);

export const selectDeckByID = (G, id) =>
  selectAllDecks(G).find((deck) => deck.id === id);

export const selectAllDecks = (G) => G.decks;

export const selectPlayerCards = (G, playerID) => G.cards[playerID] || [];

export const selectCardByID = (G, playerID, id) =>
  selectPlayerCards(G, playerID).find((c) => c.id === id);

export const selectPlayerBeings = (G, playerID) =>
  G.beings.filter((being) => being.playerID === playerID);

export const selectPlayerBeingByPosition = (G, playerID, positionID) =>
  selectPlayerBeings(G, playerID).find(
    ({ position }) => position === positionID
  );

export const selectLandscapeByID = (G, id) =>
  selectLandscapes(G).find((l) => l.id === id);

export const selectLandscapes = (G) => G.landscapes || [];

export const selectSelectedHandCardID = (G, playerID) =>
  selectPlayer(G, playerID).selectedHandCardID;

export const selectSelectedItemID = (G, playerID) =>
  selectPlayer(G, playerID).selectedItemID;

export const selectBeingItems = (G, playerID, beingID) =>
  G.items.filter(
    (item) => item.playerID === playerID && item.beingID === beingID
  );

export const selectTotalStrength = (G, playerID) =>
  selectPlayerBeings(G, playerID).reduce(
    (total, being) =>
      total +
      (selectCardByID(G, playerID, being.beingCardID).stats.strength +
        selectBeingItems(G, playerID, being.id).reduce(
          (acc, eq) => acc + selectCardByID(G, playerID, eq.id).stats.strength,
          0
        ) || 0),
    0
  );

export const selectTotalDefense = (G, playerID) =>
  selectPlayerBeings(G, playerID).reduce(
    (total, being) =>
      total +
      (selectCardByID(G, playerID, being.beingCardID).stats.armor +
        selectBeingItems(G, playerID, being.id).reduce(
          (acc, eq) => acc + selectCardByID(G, playerID, eq.id).stats.armor,
          0
        ) || 0),
    0
  );

export const selectPartyLocationID = (G, playerID) =>
  G.partyLocations[playerID];

export const selectPartyLandscape = (G, playerID) =>
  selectLandscapes(G).find(
    ({ id }) => id === selectPartyLocationID(G, playerID)
  );

export const selectPlayerResources = (G, playerID) => G.resources[playerID];

export const selectPlayerLife = (G, playerID) =>
  selectPlayer(G, playerID).deckIDs.length;

export const selectPlayerHandCardIDs = (G, playerID) =>
  selectPlayer(G, playerID).handIDs || [];

export const selectPlayerHandCards = (G, playerID) =>
  selectPlayerHandCardIDs(G, playerID).map((id) =>
    selectCardByID(G, playerID, id)
  );

export const selectIncome = (G, playerID) =>
  selectLandscapes(G)
    .filter((l) => l.landscapeCardID && l.playerID == playerID)
    .map((land) => selectCardByID(G, playerID, land.landscapeCardID))
    .reduce(
      (acc, card) => ({
        ...acc,
        flax: (card.production?.flax || 0) + acc.flax,
        food: (card.production?.food || 0) + acc.food,
        wood: (card.production?.wood || 0) + acc.wood,
        metal: (card.production?.metal || 0) + acc.metal,
        soul: (card.production?.soul || 0) + acc.soul,
      }),
      { flax: 0, food: 0, wood: 0, metal: 0, soul: 0 }
    );

export const selectIsSelectedCardLocation = (G, playerID) =>
  selectCardByID(G, playerID, selectSelectedHandCardID(G, playerID))?.type ===
  "Location";

// -------------------------------------------------------

export const hasEnoughResourcesForCard = (G, card, playerID) =>
  Object.entries(selectPlayerResources(G, playerID)).reduce(
    (canAfford, [type, amount]) =>
      canAfford && (!card?.materials || amount >= (card?.materials[type] || 0)),
    true
  );

export const isAdjacentLocation = (land, { x, y }) =>
  (x === land.x && y === land.y + 1) ||
  (x === land.x && y === land.y - 1) ||
  (x === land.x + 1 && y === land.y) ||
  (x === land.x - 1 && y === land.y);

export const canPlaceCardOnLocation = (G, playerID, location) =>
  // location.playerID !== playerID &&
  !location.playerID &&
  selectLandscapes(G).find(
    (landscape) =>
      landscape.playerID == playerID && isAdjacentLocation(landscape, location)
  );

export const canMoveOnLocation = (G, playerID, destination) =>
  destination.playerID === playerID &&
  isAdjacentLocation(selectPartyLandscape(G, playerID), destination);

export const canPlayCard = (G, playerID, card) => {
  if (!hasEnoughResourcesForCard(G, card, playerID)) {
    return false;
  }
  switch (card.type) {
    case "Being":
      const position = selectSelectedPartyPosition(G, playerID);
      return (
        position &&
        !selectPlayerBeings(G, playerID).find(
          (being) => being.position === position
        )
      );
    case "Location":
      const landscape = selectSelectedLandscapeID(G, playerID);
      return (
        landscape &&
        canPlaceCardOnLocation(G, playerID, selectLandscapeByID(G, landscape))
      );
    case "Item":
      return !!selectSelectedBeingID(G, playerID);
    case "Ability":
      return !!selectSelectedBeingID(G, playerID);
    default:
      return false;
  }
};

export const canUseCard = (G, playerID, card) => {
  return true;
};

export const hasPlayerSelectedDeck = (G, playerID) =>
  !!selectPlayer(G, playerID).deckSelected;

export const hasPlayerLost = (G, playerID) => {
  return selectPlayerLife(G, playerID) > 0;
};
