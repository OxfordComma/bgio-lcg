// Provided a game state, return the object specified by the selector

// Decks
export const selectAllDecks = (G) => G.decks;

export const selectDeckByID = (G, id) =>
  selectAllDecks(G).find((deck) => deck.id === id);

// Cards
export const selectCardByID = (G, playerID, id) =>
  selectPlayerCards(G, playerID).find((c) => c.id === id);

export const selectCardsByID = (G, playerID, ids) =>
  ids.map((id) => selectCardByID(id));

// Moves Per Turn
export const selectActionsPerTurn = () => 2;

export const selectRemainingActions = (G, ctx) =>
  selectActionsPerTurn() - ctx.numMoves;

// Selections
export const selectSelectedHandCardID = (G, playerID) =>
  selectPlayer(G, playerID).selectedHandCardID;

export const selectSelectedItemID = (G, playerID) =>
  selectPlayer(G, playerID).selectedItemID;

//Player Selections
export const selectPlayer = (G, playerID) => G.players[playerID];

export const selectPlayerResources = (G, playerID) => G.resources[playerID];

export const selectPlayerLife = (G, playerID) =>
  // selectPlayer(G, playerID).deckIDs.length;
  selectPlayer(G, playerID).life;

export const selectPlayerHandCardIDs = (G, playerID) =>
  selectPlayer(G, playerID).handIDs || [];

export const selectPlayerHandCards = (G, playerID) =>
  selectPlayerHandCardIDs(G, playerID).map((id) =>
    selectCardByID(G, playerID, id)
  );

export const selectPlayerCards = (G, playerID) => G.cards[playerID] || [];

// Player Beings (Party)
export const selectPlayerBeings = (G, playerID) =>
  G.beings.filter((being) => being.playerID === playerID);

export const selectPlayerBeingByPosition = (G, playerID, positionID) =>
  selectPlayerBeings(G, playerID).find(
    ({ position }) => position === positionID
  );

export const selectBeingItems = (G, playerID, beingID) =>
  G.items.filter(
    (item) => item.playerID === playerID && item.beingID === beingID
  );

// Opponents
export const selectOpponentID = (G, playerID) =>
  Object.keys(G.players).find((id) => id != playerID);

// Current player selections
export const selectSelectedBeingID = (G, playerID) =>
  selectPlayer(G, playerID).selectedBeingID;

export const selectSelectedPartyPosition = (G, playerID) =>
  selectPlayer(G, playerID).selectedPartyPosition;

export const selectSelectedLandscapeID = (G, playerID) =>
  selectPlayer(G, playerID).selectedLandscapeID;

export const selectTopCardIDsFromDeck = (G, playerID, count) =>
  selectPlayer(G, playerID)?.deckIDs?.slice(0, count);

// Landscapes
export const selectLandscapeByID = (G, id) =>
  selectLandscapes(G).find((l) => l.id === id);

export const selectLandscapes = (G) => G.landscapes || [];

// Party (On Landscape)
export const selectPartyLocationID = (G, playerID) =>
  G.partyLocations[playerID];

export const selectPartyLandscape = (G, playerID) =>
  selectLandscapes(G).find(
    ({ id }) => id === selectPartyLocationID(G, playerID)
  );

// Combat
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

// General Conditions
// Accepts two landscapes?
export const isAdjacentLocation = (land, { x, y }) =>
  (x === land.x && y === land.y + 1) ||
  (x === land.x && y === land.y - 1) ||
  (x === land.x + 1 && y === land.y) ||
  (x === land.x - 1 && y === land.y);

export const canPlaceCardOnLocation = (G, playerID, landscapeLocation) =>
  // location.playerID !== playerID &&
  !landscapeLocation.playerID &&
  selectLandscapes(G).find(
    (landscape) =>
      landscape.playerID == playerID &&
      isAdjacentLocation(landscape, landscapeLocation)
  );

export const canMoveOnLocation = (G, playerID, destination) =>
  // destination.playerID === playerID &&
  isAdjacentLocation(selectPartyLandscape(G, playerID), destination) &&
  destination.landscapeCardID !== null;

// Need to know if we can play the item without considering what is selected
export const canPlayItem = (G, playerID, itemID, beingID) => {
  const item = selectCardByID(G, playerID, itemID);
  const beingItems = selectBeingItems(G, playerID, beingID).map((item) =>
    selectCardByID(G, playerID, item.id)
  );

  if (beingItems.map((b) => b.name).includes(item.name)) return false;

  return true;
};

// Same as item slot for now...literally the same as item too
export const canPlayAbility = (G, playerID, abilityID, beingID) => {
  const ability = selectCardByID(G, playerID, abilityID);
  const beingItems = selectBeingItems(G, playerID, beingID).map((item) =>
    selectCardByID(G, playerID, item.id)
  );

  if (beingItems.map((b) => b.name).includes(ability.name)) return false;

  return true;
};

export const canPlayCard = (G, playerID, card) => {
  // if (!hasEnoughResourcesForCard(G, card, playerID)) {
  //   return false;
  // }
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
      return (
        !!selectSelectedBeingID(G, playerID) &&
        canPlayItem(G, playerID, card.id, selectSelectedBeingID(G, playerID))
      );
    case "Ability":
      return (
        !!selectSelectedBeingID(G, playerID) &&
        canPlayAbility(G, playerID, card.id, selectSelectedBeingID(G, playerID))
      );
    default:
      return false;
  }
};

export const canUseCard = (G, playerID, card) => {
  // console.log('card:', card)
  if (card?.onUse) return true;
  else return false;
};

export const hasPlayerSelectedDeck = (G, playerID) =>
  !!selectPlayer(G, playerID).deckSelected;

// Victory Conditions
export const hasPlayerLost = (G, ctx, playerID) => {
  // console.log('player life:', selectPlayerLife(G, playerID))
  // console.log(`Has player ${playerID} lost:`, selectPlayerLife(G, playerID) <= 0)
  return ctx.phase == "play" && selectPlayerLife(G, playerID) <= 0;
};
