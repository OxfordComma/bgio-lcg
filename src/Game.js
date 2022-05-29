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

function drawCard(G, ctx, id) {
	let deck = G.players[ctx.currentPlayer].deckIDs
	let hand = G.players[ctx.currentPlayer].handIDs.concat(deck.pop())
	G.players[ctx.currentPlayer].handIDs = hand
	G.players[ctx.currentPlayer].deckIDs = deck
	console.log('draw card:', hand)
}


function selectHandCard(G, ctx, id) {
	console.log('select hand card with id:', id)
	let currentPlayer = G.players[ctx.currentPlayer]

	if (id === currentPlayer.selectedHandCardID)
		G.players[ctx.currentPlayer].selectedHandCardID = null
	else
		G.players[ctx.currentPlayer].selectedHandCardID = id


}


function selectFieldCard(G, ctx, id) {
	console.log('select field card at id:', id)

	let currentPlayer = G.players[ctx.currentPlayer]

	if (id === currentPlayer.selectedFieldID)
		G.players[ctx.currentPlayer].selectedFieldID = null
	else
		G.players[ctx.currentPlayer].selectedFieldID = id

	// if (currentPlayer.selectedHandCardID && currentPlayer.selectedFieldID) {
	// 	console.log('play card')
	// 	ctx.moves.playCard(G, ctx, currentPlayer.selectedHandCardID)
	// }

}


function playCard(G, ctx, id) {
	if (!!id) {
		const card = G.cards[ctx.currentPlayer].find(c => c.id === id);
    const player = G.players[ctx.currentPlayer];
    if (card.Type === 'Location') {
      if (player.selectedHandCardID && player.selectedFieldID) {
        console.log('you can play this card!');
        player.handIDs = player?.handIDs?.filter(cid => cid !== player?.selectedHandCardID);
        G.field[player.selectedFieldID].fieldCardID = player?.selectedHandCardID;
      }

      G.players[ctx.currentPlayer] = player;
    }
    return G;
	}
	
}

function addLocationResources(G, ctx, id) {
	console.log(id)
	if (!!id) {
		let card = G.cards[ctx.currentPlayer].find(c => c.id === id);
		if (card?.production?.wood) {
      G.resources[ctx.currentPlayer].wood += 1;
    }
    if (card?.production?.metal) {
      G.resources[ctx.currentPlayer].metal += 1;
    }
    if (card?.production?.metal) {
      G.resources[ctx.currentPlayer].soul += 1;
    }
	}
}




export const CardGame = {
	name: 'battle-dudes',
	setup: (ctx) => {
		const field = Array.from({length: 30}).map((_, i) => ({
			id: i.toString(), 
			fieldCardID: null
		}));
		return { 
			players: {
				'0': {
					handIDs: [],
					selectedHandCardID: null,
					selectedFieldID: null,
				},
				'1': {
					handIDs: [],
					selectedHandCardID: null,
					selectedFieldID: null,					
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
			field,
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

	playerView: PlayerView.STRIP_SECRETS,
	moves: {
		drawCard: drawCard,
		selectHandCard: {
			move: selectHandCard,
			noLimit: true,
		},
		selectFieldCard: {
			move: selectFieldCard,
			noLimit: true,
		},
		playCard: playCard,
		selectDeck: {
			move: selectDeck,
			noLimit: true,
		},
	},
	turn: {
		order: TurnOrder.RESET,
		onBegin: (G, ctx) => {
			console.log('turn begin')
			G.field.forEach(f => {
				if (f.fieldCardID != null)
					addLocationResources(G, ctx, f.fieldCardID)
			})
		},
		minMoves: 0,
		maxMoves: 1,
	},
	phases: {
		menu: {
			start: true,
			next: 'play',
			endIf: (G) => G?.decklists['0'] != null && G?.decklists['1'] != null
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
