import { PlayerView, TurnOrder } from 'boardgame.io/core';
import { generateDeckFromDecklist } from './Cards'
import { Decks } from './Decks'
// import { CardFunctions } from './CardFunctions'



function selectDeck(G, ctx, deckName, playerID) {
	const deck = Decks().find(d => d.name === deckName);
	const decklist = deck.decklist;

	G.cards['0'] = generateDeckFromDecklist(decklist);
	G.cards['1'] = generateDeckFromDecklist(decklist);
	G.decklists['0'] = decklist;
	G.decklists['1'] = decklist;
}

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

function drawCard(G, ctx) {
	let deck = G.players[ctx.currentPlayer].deckIDs
	let hand = G.players[ctx.currentPlayer].handIDs.concat(deck.pop())
	G.players[ctx.currentPlayer].handIDs = hand
	G.players[ctx.currentPlayer].deckIDs = deck
	console.log('draw card:', hand)
}


function selectHandCard(G, ctx, id) {
	console.log('select hand card with id:', id)
	let currentPlayer = G.players[ctx.currentPlayer]

	if (id == currentPlayer.selectedHandCardID)
		G.players[ctx.currentPlayer].selectedHandCardID = null
	else
		G.players[ctx.currentPlayer].selectedHandCardID = id


}


function selectLandscapeCard(G, ctx, id) {
	console.log('select landscape card at id:', id)

	let currentPlayer = G.players[ctx.currentPlayer]

	if (id === currentPlayer.selectedLandscapeID)
		G.players[ctx.currentPlayer].selectedLandscapeID = null
	else
		G.players[ctx.currentPlayer].selectedLandscapeID = id

	// if (currentPlayer.selectedHandCardID && currentPlayer.selectedLandscapeID) {
	// 	console.log('play card')
	// 	ctx.moves.playCard(G, ctx, currentPlayer.selectedHandCardID)
	// }

}

function selectBeingCard(G, ctx, id) {
	console.log('select being card at id:', id)

	let currentPlayer = G.players[ctx.currentPlayer]

	if (id === currentPlayer.selectedBeingID)
		G.players[ctx.currentPlayer].selectedBeingID = null
	else
		G.players[ctx.currentPlayer].selectedBeingID = id
}


function playCard(G, ctx, id) {
	if (!!id) {
		console.log('play card:', id)
		const card = G.cards[ctx.currentPlayer].find(c => c.id === id);
    const player = G.players[ctx.currentPlayer];
  	const resources = player.resources

    const landscapes = G.landscapes[ctx.currentPlayer];
    let beings = G.beings[ctx.currentPlayer];

    if (card.type === "Location") {
      if (player.selectedHandCardID && player.selectedLandscapeID) {
        console.log('you can play this location card!');
        player['handIDs'] = player['handIDs'].filter(cid => cid !== player.selectedHandCardID);
        landscapes[parseInt(player.selectedLandscapeID)]['landscapeCardID'] = player.selectedHandCardID;
      }

      G.players[ctx.currentPlayer] = player;
      G.landscapes[ctx.currentPlayer] = landscapes;
    }

    if (card.type === "Being") {
      if (player.selectedHandCardID) {
        console.log('you can play this being card!');
        player['handIDs'] = player['handIDs'].filter(cid => cid !== player.selectedHandCardID);
        beings = beings.concat({
        	beingCardID: player.selectedHandCardID,
        	id: beings.length,
        	equipment: []
        })	

      }

      G.players[ctx.currentPlayer] = player;
      G.beings[ctx.currentPlayer] = beings;
    }

    if (card.type === "Item" && card.subtype === "Equipment") {

      if (player.selectedHandCardID && player.selectedBeingID) {
        console.log('you can play this equipment card!');
        
        player['handIDs'] = player['handIDs'].filter(cid => cid !== player.selectedHandCardID);
        
        let being = beings.find(b => b.beingCardID === player.selectedBeingID)
        console.log(being)
        being.equipment = being.equipment.concat(player.selectedHandCardID)

        // Replace in array and preserve order
        beings = beings.map(b => b.id == being.id ? b : being )
      }

      G.players[ctx.currentPlayer] = player;
      G.beings[ctx.currentPlayer] = beings;
    }
    return G;
	}
	
}

function attack(G, ctx, id) {
	let myBeings = G.beings[ctx.currentPlayer];
	let oppBeings = G.beings[['0', '1'].filter(b => b !== ctx.currentPlayer)];
	const cards = G.cards[ctx.currentPlayer];

	let totalStrength = myBeings.reduce((acc, being) => {
		let card = cards.find(c => c.id === being.beingCardID)
		return acc + card.stats.strength ?? 0
	}, 0)
	// console.log('total strength:', totalStrength)

	let totalArmor = myBeings.reduce((acc, being) => {
		let card = cards.find(c => c.id === being.beingCardID)
		return card.stats.armor ?? 0
	}, 0)
	// console.log('total armor:', totalArmor)

	let player = G.players[ctx.currentPlayer];
	let opponent = G.players[['0', '1'].filter(b => b !== ctx.currentPlayer)]
	opponent.deckIDs = player.deckIDs.slice(0, player.deckIDs.length - Math.max(totalStrength + totalArmor, 0) )
}

function takeDamage(G, ctx, id) {

}

function addLocationResources(G, ctx, id) {
	console.log(id)
	if (!!id) {
		let card = G.cards[ctx.currentPlayer].find(c => c.id === id);
		if (card && 'materials' in card) {
			if ('wood' in card.materials) {
				G.resources[ctx.currentPlayer].wood += 1;
			}
			if ('metal' in card.materials) {
				G.resources[ctx.currentPlayer].wood += 1;
			}
		}
		// if (card?.production?.wood) {
    //   G.resources[ctx.currentPlayer].wood += 1;
    // }
    // if (card?.production?.metal) {
    //   G.resources[ctx.currentPlayer].metal += 1;
    // }
    // if (card?.production?.metal) {
    //   G.resources[ctx.currentPlayer].soul += 1;
    // }
	}
}




export const CardGame = {
	name: 'battle-dudes',
	setup: (ctx) => {
		// Changed this id back so the indices would make sense from the perspective of both players,
		// otherwise one player has high indices
		const landscapes = Array.from({length: 30}).map((_, i) => ({
			id: (i%15).toString(), 
			landscapeCardID: null
		}));

		const landscape0 = landscapes.slice(0, 15);
		const landscape1 = landscapes.slice(15, 30);
		return { 
			players: {
				'0': {
					handIDs: [],
					deckIDs: [],
					selectedHandCardID: null,
					selectedLandscapeID: null,
					selectedBeingID: null
				},
				'1': {
					handIDs: [],
					deckIDs: [],
					selectedHandCardID: null,
					selectedLandscapeID: null,
					selectedBeingID: null,

				}
			},
			decks: [
				{
					"name": "Fire",
					"id": "fire"
				},
				{
					"name": "Water",
					"id": "water"
				},
				{
					"name": "Earth",
					"id": "earth"
				},
				{
					"name": "Air",
					"id": "air"
				},
			],
			resources: {
				'0': {
					metal: 0,
					wood: 0,
					soul: 0,
					mana: 0,
				},
				'1': {
					metal: 0,
					wood: 0,
					soul: 0,
					mana: 0,
				}
			},
			landscapes: {
				'0': landscape0,
				'1': landscape1,
			},
			beings: {
				'0': [],
				'1': [],
			},
			cards: {
				'0': null,
				'1': null
			},
			decklists: {
				'0': null,
				'1': null
			}
		}
	},

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
		playCard: playCard,
		attack: attack,
		selectDeck: {
			move: selectDeck,
			noLimit: true,
		},
	},
	turn: {
		order: TurnOrder.RESET,
		onBegin: (G, ctx) => {
			console.log('turn begin')
			drawCard(G, ctx)
			G.landscapes[ctx.currentPlayer].forEach(f => {
				if (f.landscapeCardID != null)
					addLocationResources(G, ctx, f.landscapeCardID)
			})
		},
		minMoves: 0,
		maxMoves: 2,
	},
	phases: {
		menu: {
			start: true,
			next: 'play',
			endIf: (G) => ('decklists' in G) && G.decklists['0'] != null && G.decklists['1'] != null
		},
		play: {
			onBegin: (G, ctx) => {
				let startingHandSize = 7;

				// Initialize each player
				ctx.playOrder.forEach(player => {
					let deckIDs = shuffle(G.cards[ctx.currentPlayer].map(c => c.id));
					let handIDs = [];


					for (let i = 0; i < startingHandSize; i++) {
						handIDs = handIDs.concat(deckIDs.pop());
					}

					G.players[player].handIDs = handIDs;
					G.players[player].deckIDs = deckIDs;
				});
			},
		}
	},
};
