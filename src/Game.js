import { PlayerView, TurnOrder, INVALID_MOVE } from "boardgame.io/core";
import globalStateReducer, {
  initialState,
} from "./reducers/globalStateReducer";
import {
  createCardsDrawn,
  createHandCardSelected,
  createLandscapeSelected,
  createBeingSelected,
  createItemSelected,
  createDeckSelected,
  createCardPlayed,
  createCardUsed,
  createPartyPositionSelected,
  createAttack,
  createPartyMoved,
  createBeginTurn,
  createEndTurn,
  createStartGame,
} from "./actions";
import {
  selectTopCardIDsFromDeck,
  selectDeckByID,
  selectCardByID,
  canPlayCard,
  canUseCard,
  selectSelectedBeingID,
  selectSelectedLandscapeID,
  selectTotalStrength,
  selectTotalDefense,
  selectOpponentID,
  selectSelectedPartyPosition,
  selectIncome,
  canMoveOnLocation,
  selectLandscapeByID,
  hasPlayerSelectedDeck,
  hasPlayerLost,
  selectPlayerHandCards,
  selectLandscapes,
  selectPlayerHandCardIDs,
  selectPlayerBeings,
  isAdjacentLocation,
  canPlaceCardOnLocation,
  selectPartyLandscape,
  selectBeingItems,
  canPlayItem,
  canPlayAbility,
  selectPlayerBeingByPosition,
  selectActionsPerTurn,
} from "./selectors";
import { generateDeckFromDecklist } from "./Cards";

function selectDeck(G, ctx, deckID, playerID) {
  const deck = selectDeckByID(G, deckID);
  if (!deck) return G;

  const decklist = {
    ...deck.decklist,
    [deck.startingLocation]: 1,
    [deck.startingBeing]: 1,
  };
  const cards = generateDeckFromDecklist(decklist);

  const deckCardIDs = ctx.random
    .Shuffle(cards)
    .filter(
      ({ name }) =>
        name !== deck.startingLocation && name !== deck.startingLocation
    )
    .map(({ id }) => id);

  return globalStateReducer(
    G,
    createDeckSelected(
      deck,
      playerID,
      cards,
      deckCardIDs,
      cards.find(({ name }) => name === deck.startingLocation).id,
      cards.find(({ name }) => name === deck.startingBeing).id
    )
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function drawCard(G, ctx) {
  return globalStateReducer(
    G,
    createCardsDrawn(
      ctx.currentPlayer,
      selectTopCardIDsFromDeck(G, ctx.currentPlayer, 1)
    )
  );
}

function selectHandCard(G, ctx, id) {
  console.log("select hand card with id:", id);
  return globalStateReducer(G, createHandCardSelected(ctx.currentPlayer, id));
}

function selectLandscapeCard(G, ctx, id) {
  console.log("select landscape card with id:", id);
  return globalStateReducer(G, createLandscapeSelected(ctx.currentPlayer, id));
}

function selectItemCard(G, ctx, id) {
  return globalStateReducer(G, createItemSelected(ctx.currentPlayer, id));
}

function selectBeingCard(G, ctx, id) {
  return globalStateReducer(G, createBeingSelected(ctx.currentPlayer, id));
}

function selectPartyMember(G, ctx, position, beingID, itemID) {
  return globalStateReducer(
    G,
    createPartyPositionSelected(ctx.currentPlayer, position, beingID, itemID)
  );
}

function playCard(G, ctx, id) {
  if (!id) return G;

  console.log("play card:", id);

  const card = selectCardByID(G, ctx.currentPlayer, id);

  if (!canPlayCard(G, ctx.currentPlayer, card)) {
    console.log("Can't play this card. Missing Resources.", id);
    // return G;
    return INVALID_MOVE;
  }

  return globalStateReducer(
    G,
    createCardPlayed(
      card,
      ctx.currentPlayer,
      selectSelectedPartyPosition(G, ctx.currentPlayer),
      selectSelectedBeingID(G, ctx.currentPlayer),
      selectSelectedLandscapeID(G, ctx.currentPlayer)
    )
  );
}

// Added for bot functionality
function playLocationCard(G, ctx, locationId, landscapeId) {
  if (!locationId || !landscapeId) return G;
  console.log("play landscape card:", locationId);
  console.log("to location:", landscapeId);

  const location = selectCardByID(G, ctx.currentPlayer, locationId);
  const landscape = selectLandscapeByID(G, landscapeId);

  if (location["type"] != "Location") {
    console.log("Can't play this card - not a location:", location["type"]);
    return INVALID_MOVE;
  } else {
    return globalStateReducer(
      G,
      createCardPlayed(
        location,
        ctx.currentPlayer,
        null, // selectSelectedPartyPosition(G, ctx.currentPlayer),
        null, // selectSelectedBeingID(G, ctx.currentPlayer),
        landscapeId // selectSelectedLandscapeID(G, ctx.currentPlayer)
      )
    );
  }
}

function playItemCard(G, ctx, itemId, beingId) {
  if (!itemId || !beingId) return G;
  console.log("play item card:", itemId);
  console.log("to being:", beingId);

  const item = selectCardByID(G, ctx.currentPlayer, itemId);
  const being = selectPlayerBeings(G, ctx.currentPlayer).find(
    (being) => being["id"] === beingId
  );
  return globalStateReducer(
    G,
    createCardPlayed(
      item,
      ctx.currentPlayer,
      null, // selectSelectedPartyPosition(G, ctx.currentPlayer),
      beingId, // selectSelectedBeingID(G, ctx.currentPlayer),
      null // selectSelectedLandscapeID(G, ctx.currentPlayer)
    )
  );
}

function playBeingCard(G, ctx, beingId, position) {
  if (!beingId) return G;
  const being = selectCardByID(G, ctx.currentPlayer, beingId);
  // const being = selectPlayerBeings(G, ctx.currentPlayer).find(being => being['id'] === beingId);
  console.log("play being card:", beingId);
  console.log("to position:", position);

  return globalStateReducer(
    G,
    createCardPlayed(
      being,
      ctx.currentPlayer,
      position, // selectSelectedPartyPosition(G, ctx.currentPlayer),
      null, // selectSelectedBeingID(G, ctx.currentPlayer),
      null // selectSelectedLandscapeID(G, ctx.currentPlayer)
    )
  );
}

function playAbilityCard(G, ctx, abilityId, beingId) {
  if (!abilityId || !beingId) return G;
  console.log("play ability card:", abilityId);
  console.log("to being:", beingId);

  const ability = selectCardByID(G, ctx.currentPlayer, abilityId);
  const being = selectPlayerBeings(G, ctx.currentPlayer).find(
    (being) => being["id"] === beingId
  );
  return globalStateReducer(
    G,
    createCardPlayed(
      ability,
      ctx.currentPlayer,
      null, // selectSelectedPartyPosition(G, ctx.currentPlayer),
      beingId, // selectSelectedBeingID(G, ctx.currentPlayer),
      null // selectSelectedLandscapeID(G, ctx.currentPlayer)
    )
  );
}

function useCard(G, ctx, id) {
  if (!id) return G;

  console.log("use card:", id);

  const card = selectCardByID(G, ctx.currentPlayer, id);

  // Not sure if this will ever trigger - we check this before using the move
  if (!canUseCard(G, ctx.currentPlayer, card)) {
    console.log("Can't use this card. Missing Resources.", id);
    return G;
  }

  return globalStateReducer(
    G,
    createCardUsed(
      card,
      ctx.currentPlayer,
      selectSelectedPartyPosition(G, ctx.currentPlayer),
      selectSelectedBeingID(G, ctx.currentPlayer),
      selectSelectedLandscapeID(G, ctx.currentPlayer)
    )
  );
}

function goToCombat(G, ctx, events) {
  // console.log({
  //   G: G,
  //   ctx: ctx,
  //   events: events,
  // })
  const beings = selectPlayerBeings(G, ctx.currentPlayer);

  console.log("go to combat");
  ctx.events.setStage("combat");
  // {
  //   stageName: 'combat',
  //   minMoves: beings.length
  // })
}

function attack(G, ctx, attackerId, defenderId) {
  console.log({
    atkid: attackerId,
    defid: defenderId,
  });
  const opponentID = selectOpponentID(G, ctx.currentPlayer);

  const attacker = selectPlayerBeings(G, ctx.currentPlayer)
    .map((being) => selectCardByID(G, ctx.currentPlayer, being.beingCardID))
    .find((being) => being.id == attackerId);

  const attackerItems = selectBeingItems(G, ctx.currentPlayer, attackerId);

  console.log({
    atk: attacker,
    items: attackerItems,
  });

  const defender = selectPlayerBeings(G, opponentID)
    // .filter(being => being.position == 1)
    .map((being) => selectCardByID(G, opponentID, being.beingCardID))
    .find((being) => being.id == defenderId);

  const defenderItems = selectBeingItems(G, opponentID, defenderId);

  console.log({
    def: defender,
    items: defenderItems,
  });

  const damage = Math.max(
    // selectTotalStrength(G, ctx.currentPlayer) - selectTotalDefense(G, opponentID),
    attacker.stats.strength - defender.stats.armor,
    0
  );

  console.log(`Player ${ctx.currentPlayer} attacks! Damage: ${damage}`);

  return globalStateReducer(
    G,
    createAttack(
      ctx.currentPlayer,
      opponentID,
      attackerId,
      defenderId,
      damage
      // selectTopCardIDsFromDeck(
      //   G,
      //   opponentID,
      //   damage
      // )
    )
  );
}

function move(G, ctx, destinationId) {
  if (destinationId === null)
    destinationId = selectSelectedLandscapeID(G, ctx.currentPlayer);

  // console.log('moving to destination id:', destinationId)

  const destination = selectLandscapeByID(G, destinationId);

  console.log(`${ctx.currentPlayer} moves to ${destinationId}`);

  if (destination && canMoveOnLocation(G, ctx.currentPlayer, destination)) {
    return globalStateReducer(
      G,
      createPartyMoved(ctx.currentPlayer, destination)
    );
  } else {
    return INVALID_MOVE;
  }
}

export const CardGame = {
  name: "battle-dudes",
  setup: () => globalStateReducer(undefined, { type: "__INITIALIZE__" }),

  // playerView: PlayerView.STRIP_SECRETS,
  moves: {
    drawCard: drawCard,
    selectHandCard: {
      move: selectHandCard,
      noLimit: true,
    },
    selectLandscapeCard: {
      move: selectLandscapeCard,
      noLimit: true,
    },
    selectBeingCard: {
      move: selectBeingCard,
      noLimit: true,
    },
    selectItemCard: {
      move: selectItemCard,
      noLimit: true,
    },
    selectPartyMember: {
      move: selectPartyMember,
      noLimit: true,
    },
    playCard: {
      move: playCard,
      // noLimit: true,
    },
    playLocationCard: {
      move: playLocationCard,
    },
    playBeingCard: {
      move: playBeingCard,
    },
    playItemCard: {
      move: playItemCard,
    },
    playAbilityCard: {
      move: playAbilityCard,
    },
    // useCard: {
    //   move: useCard,
    //   // noLimit: true,
    // },
    move: move,
    goToCombat: {
      move: goToCombat,
      noLimit: true,
    },
    // attack: attack,
    selectDeck: {
      move: selectDeck,
      noLimit: true,
    },
    // reset: {
    //   move: reset,
    //   noLimit: true,
    // },
  },
  turn: {
    order: TurnOrder.RESET,
    minMoves: 0,
    maxMoves: selectActionsPerTurn(),
    onBegin: (G, ctx, events) => {
      console.log(`Player ${ctx.currentPlayer} turn begins!`);
      let income = selectIncome(G, ctx.currentPlayer);
      let cards = selectTopCardIDsFromDeck(G, ctx.currentPlayer, 1);
      let action = createBeginTurn(ctx.currentPlayer, income, cards);

      // events.setStage('adventure')

      return globalStateReducer(G, action);
    },
    stages: {
      // adventure: {
      //   drawCard: drawCard,
      //   selectHandCard: {
      //     move: selectHandCard,
      //     noLimit: true,
      //   },
      //   selectLandscapeCard: {
      //     move: selectLandscapeCard,
      //     noLimit: true,
      //   },
      //   selectBeingCard: {
      //     move: selectBeingCard,
      //     noLimit: true,
      //   },
      //   selectItemCard: {
      //     move: selectItemCard,
      //     noLimit: true,
      //   },
      //   selectPartyMember: {
      //     move: selectPartyMember,
      //     noLimit: true,
      //   },
      //   playCard: {
      //     move: playCard,
      //     // noLimit: true,
      //   },
      //   playLocationCard: {
      //     move: playLocationCard,
      //   },
      //   playBeingCard: {
      //     move: playBeingCard,
      //   },
      //   playItemCard: {
      //     move: playItemCard,
      //   },
      //   playAbilityCard: {
      //     move: playAbilityCard,
      //   },
      //   move: move,
      //   goToCombat: goToCombat,
      // },
      combat: {
        // onBegin: () => console.log('combat'),
        moves: {
          selectBeingCard: {
            move: selectBeingCard,
            noLimit: true,
          },
          attack: {
            move: attack,
            noLimit: true,
          },
          useCard: {
            move: useCard,
            noLimit: true,
          },
        },
        // minMoves: 2,
        // next: 'adventure',
      },
    },
    onEnd: (G, ctx) => {
      // console.log(`Player ${ctx.currentPlayer} turn ends!`);

      let action = createEndTurn(ctx.currentPlayer);

      return globalStateReducer(G, action);
    },
  },
  phases: {
    menu: {
      start: true,
      next: "play",
      onBegin: (G, ctx) => {
        console.log("Menu phase begins!");
      },
      endIf: (G, ctx) =>
        hasPlayerSelectedDeck(G, ctx.currentPlayer) &&
        hasPlayerSelectedDeck(G, selectOpponentID(G, ctx.currentPlayer)),
    },
    play: {
      onBegin: (G, ctx) => {
        console.log("Play phase begins!");
        const STARTING_HAND_SIZE = 7;
        return globalStateReducer(
          G,
          createStartGame(
            selectTopCardIDsFromDeck(
              G,
              ctx.currentPlayer,
              STARTING_HAND_SIZE - 1
            ),
            selectTopCardIDsFromDeck(
              G,
              selectOpponentID(G, ctx.currentPlayer),
              STARTING_HAND_SIZE
            )
          )
        );
      },
    },
  },
  endIf: (G, ctx) => {
    // console.log('has player ' + selectOpponentID(G, ctx) + ' lost yet? ' + hasPlayerLost(G, ctx, selectOpponentID(G, ctx)))
    if (hasPlayerLost(G, ctx, selectOpponentID(G, ctx)))
      return { winner: ctx.currentPlayer };
    if (hasPlayerLost(G, ctx, ctx.currentPlayer))
      return { winner: selectOpponentID(G, ctx) };
  },
  onEnd: (G, ctx) => {
    console.log("player ", ctx.gameover.winner, " wins");
  },
  ai: {
    iterations: 1,
    playoutDepth: 1,
    enumerate: (G, ctx) => {
      let moves = [];

      const landscapes = selectLandscapes(G);
      // console.log('landscapes:', landscapes)

      const beings = selectPlayerBeings(G, ctx.currentPlayer);
      // console.log('beings:', beings)

      // const beingItems = beings.map(b => selectBeingItems()

      const cardsInHand = selectPlayerHandCards(G, ctx.currentPlayer);
      // console.log('card in hand:', cardsInHand)

      // Play a location
      let locationCardsInHand = cardsInHand.filter(
        (c) => c["type"] == "Location"
      );

      locationCardsInHand.map((location) => {
        landscapes.map((landscape) => {
          if (
            landscape["landscapeCardID"] == null &&
            canPlaceCardOnLocation(G, ctx.currentPlayer, landscape)
          ) {
            let obj = {
              move: "playLocationCard",
              args: [location["id"], landscape["id"]],
            };
            // console.log(obj)
            moves.push(obj);
          }
        });
      });

      // Play a being
      let beingCardsInHand = cardsInHand.filter((c) => c["type"] == "Being");

      beingCardsInHand.map((beingCard) => {
        const openPos = [1, 2, 3, 4].filter(
          (position) =>
            !beings.map((being) => being.position).includes(position)
        );

        const minOpenPos = Math.min(...openPos);

        // .map(position => {
        let obj = {
          move: "playBeingCard",
          args: [beingCard["id"], minOpenPos],
        };
        moves.push(obj);
        // })

        // if (landscape['landscapeCardID'] == null && canPlaceCardOnLocation(G, ctx.currentPlayer, landscape)) {
        //   let obj = {move: 'playLocationCard', args: [location['id'], landscape['id']] }
        //   // console.log(obj)
        //   moves.push(obj)
        // }
      });

      // Play an item
      let itemCardsInHand = cardsInHand.filter((c) => c["type"] == "Item");

      beings.map((being) => {
        itemCardsInHand.map((item) => {
          if (canPlayItem(G, ctx.currentPlayer, item["id"], being["id"])) {
            let obj = { move: "playItemCard", args: [item["id"], being["id"]] };
            // console.log(obj)
            moves.push(obj);
          }
        });
      });

      // Use an item (or ability - these are in same slot)
      beings.map((being) => {
        let items = selectBeingItems(G, ctx.currentPlayer, being.id)
          .map((item) => selectCardByID(G, ctx.currentPlayer, item.id))
          .filter((item) => item.type == "Item");
        // console.log('items:', items)

        items.map((item) => {
          // console.log('Item:', item)
          if (item.hasOwnProperty("onUse")) {
            moves.push({ move: "useCard", args: [item["id"]] });
          }
        });
      });

      // Play an ability
      let abilityCardsInHand = cardsInHand.filter(
        (c) => c["type"] == "Ability"
      );

      beings.map((being) => {
        abilityCardsInHand.map((ability) => {
          if (
            canPlayAbility(G, ctx.currentPlayer, ability["id"], being["id"])
          ) {
            let obj = {
              move: "playAbilityCard",
              args: [ability["id"], being["id"]],
            };
            // console.log(obj)
            moves.push(obj);
          }
        });
      });

      // // Use an ability
      // beings.map(being => {
      //   let items = selectBeingItems(G, ctx.currentPlayer, being.id)
      //     .map(item => selectCardByID(G, ctx.currentPlayer, item.id))
      //     .filter(item => item.type == "Ability")
      //   // console.log('items:', items)

      //   items.map(item => {
      //     // console.log('Item:', item)
      //     if (item.hasOwnProperty("onUse")) {
      //       moves.push({ move: 'useCard', args: [ item['id'] ]})
      //     }
      //   })
      // })

      // Move to an available location
      landscapes.map((landscape) => {
        // console.log('landscape:', landscape)
        // console.log('Can move?:', canMoveOnLocation(G, ctx.currentPlayer, landscape))
        if (canMoveOnLocation(G, ctx.currentPlayer, landscape)) {
          moves.push({ move: "move", args: [landscape["id"]] });
        }
      });

      // Attack enemy if close
      let playerPartyLocation = selectPartyLandscape(G, ctx.currentPlayer);
      let enemyPartyLocation = selectPartyLandscape(
        G,
        selectOpponentID(G, ctx.currentPlayer)
      );
      // console.log({
      //   p: playerPartyLocation,
      //   e: enemyPartyLocation
      // })

      // if (isAdjacentLocation(playerPartyLocation, enemyPartyLocation))
      //   moves.push({move: 'attack', args: [] })

      console.log("moves:", moves);
      return moves;
    },
  },
};
