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

export const selectDeckByID = (G, id) => G.decks.find((deck) => deck.id === id);

export const selectAllDecks = (G) => G.decks;

export const selectDecklist = (G, playerID) => {
  return G.decklists[playerID];
};

export const selectCardByID = (G, playerID, id) =>
  G.cards[playerID].find((c) => c.id === id);

export const selectPlayerBeings = (G, playerID) => G.beings[playerID] || [];

export const selectPlayerBeingByPosition = (G, playerID, positionID) =>
  selectPlayerBeings(G, playerID).find(
    ({ position }) => position === positionID
  );

export const selectLandscapeByID = (G, id) =>
  G.landscapes.find((l) => l.id === id);

export const selectLandscapes = (G) => G.landscapes || [];

export const selectSelectedHandCardID = (G, playerID) =>
  G.players[playerID].selectedHandCardID;

export const selectTotalStrength = (G, playerID) =>
  selectPlayerBeings(G, playerID).reduce(
    (total, being) =>
      total +
      (selectCardByID(G, playerID, being.beingCardID).stats.strength +
        being.equipment.reduce(
          (acc, eq) => acc + selectCardByID(eq.id).stats.strength,
          0
        ) || 0),
    0
  );

export const selectTotalDefense = (G, playerID) =>
  selectPlayerBeings(G, playerID).reduce(
    (total, being) =>
      total +
      (selectCardByID(G, playerID, being.beingCardID).stats.armor +
        being.equipment.reduce(
          (acc, eq) => acc + selectCardByID(eq.id).stats.armor,
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
    selectAllCards(G).find((card) => card.id === id)
  );

export const selectAllCards = (G) =>
  Object.values(G.cards)
    .filter((c) => c)
    .flat();

export const selectIncome = (G, playerID) =>
  selectLandscapes(G)
    .filter((l) => l.landscapeCardID && l.playerID == playerID)
    .map((land) => selectCardByID(G, playerID, land.landscapeCardID))
    .reduce(
      (acc, card) => ({
        ...acc,
        wood: (card.production?.wood || 0) + acc.wood,
        metal: (card.production?.metal || 0) + acc.metal,
        soul: (card.production?.soul || 0) + acc.soul,
      }),
      { wood: 0, metal: 0, soul: 0 }
    );

export const selectIsSelectedCardLocation = (G, playerID) =>
  selectCardByID(G, playerID, selectSelectedHandCardID(G, playerID))?.type ===
  "Location";

// -------------------------------------------------------

export const hasEnoughResourcesForCard = (G, card, playerID) =>
  Object.entries(G.resources[playerID]).reduce(
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
  // if (!hasEnoughResourcesForCard(G, card, playerID)) {
  //   return false;
  // }
  const player = selectPlayer(G, playerID);
  switch (card.type) {
    case "Being":
      return (
        player.selectedPartyPosition &&
        !selectPlayerBeings(G, playerID).find(
          (being) => being.position === player.selectedPartyPosition
        )
      );
    case "Location":
      return (
        player.selectedLandscapeID &&
        canPlaceCardOnLocation(
          G,
          playerID,
          selectLandscapeByID(G, player.selectedLandscapeID)
        )
      );
    case "Item":
      return player.selectedPartyPosition && 1;
    case "Ability":
      return player.selectedPartyPosition && 1;
    default:
      return false;
  }
};
