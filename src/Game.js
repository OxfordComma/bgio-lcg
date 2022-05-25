import { PlayerView, TurnOrder} from 'boardgame.io/core';
import { Cards } from './Cards'
import { Decks } from './Decks'
// import { CardFunctions } from './CardFunctions'
	 

// let cards = Cards()
// let decks = Deck()  
let deck;

function selectDeck(G, ctx, deckName, playerID) {
	deck = Decks().filter(d => d.name==deckName)[0]
	deck['cards'] = []
	Object.keys(deck['decklist']).map(cardName => {
		let card = Cards().filter(c => c.Name == cardName)[0]
		let numCardNameInDeck = deck['decklist'][cardName]
		// For each card, add the appropriate number to the deck 
		// And assign it an ID based on the order it was assigned
		for (let i = 0; i < numCardNameInDeck; i++)  {
			let obj = {...card}
			obj['id'] = deck['cards'].length
			deck['cards'] = deck['cards'].concat( obj )
		}
	})

	
	G['decklists'][0] = deck.decklist
	G['decklists'][1] = deck.decklist
}

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

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
	console.log(id)
	if (id == null)
		return 
	let card = deck['cards'].filter(c => c.id == id)[0]
	console.log('Play card: ', card)
	G = card.play(G, ctx, id)
}

function addLocationResources(G, ctx, id) {
	console.log(id)
	if (id == null)
		return 
	let card = deck['cards'].filter(c => c.id == id)[0]
	console.log('Location resources: ', card)
	G = card.onTurnStart(G, ctx, id)

}



export const CardGame = {
	name: 'battle-dudes',
	setup: (ctx) => {
		let field0 = []
		let field1 = []
		console.log(field0)

		for (let i=0; i < 15; i++) {
			let field = {
				fieldID: i.toString(), 
				fieldCardID: null
			}

			field0 = field0.concat(field)
			field1 = field1.concat(field)
		}

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
			resources: {
				'0': {
					metal: 0,
					wood: 0,
					mana: 0,
				},
				'1': {
					metal: 0,
					wood: 0,
					mana: 0,
				}
			},
			field: {
				'0': field0,
				'1': field1
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
			G.field[ctx.currentPlayer].map(f => {
				if(f.fieldCardID != null)
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
			endIf: (G) => G['decklists']['0'] != null && G['decklists']['1'] != null
		},
		play: {
			onBegin: (G, ctx) => {
				let startingHandSize = 7

				// Initialize each player
				ctx.playOrder.map(player => {
					let deckIDs = shuffle(deck['cards'].map(c => c['id']))					
					let handIDs = []


					for (let i = 0; i < startingHandSize; i++) {
						handIDs = handIDs.concat(deckIDs.pop())
					}

					G['players'][player]['handIDs'] = handIDs
					G['players'][player]['deckIDs'] = deckIDs

				})
				
			},
		}
	},
	// events: {

	// }
	// endIf: (G, ctx) => {
	
	// },

};
