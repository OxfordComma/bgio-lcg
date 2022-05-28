// function Card(value, suit, rank) {
			// number: '',
//   // this.value = value;
//   // this.suit = suit;
//   // this.rank = rank;
// }

function PlayLocation (G, ctx, id) {
    console.log('play location:', id)
    let player = G.players[ctx.currentPlayer]
    let landscape = G.landscape[ctx.currentPlayer]
    if (player.selectedHandCardID && player.selectedLandscapeID) {
      console.log('you can play this card!')
      player['handIDs'] = player['handIDs'].filter(cid => cid != player.selectedHandCardID)
      landscape[parseInt(player.selectedLandscapeID)]['landscapeCardID'] = player.selectedHandCardID
    }
    G.players[ctx.currentPlayer] = player
    G.landscape[ctx.currentPlayer] = landscape
    return G
}

function PlayBeing (G, ctx, id) {
    console.log('play being:', id)
    let player = G.players[ctx.currentPlayer]
    let landscape = G.landscape[ctx.currentPlayer]
    if (player.selectedHandCardID) {
      console.log('you can play this card!')
      player['handIDs'] = player['handIDs'].filter(cid => cid != player.selectedHandCardID)
      player['beingIDs'] = player['beingIDs'].concat(player.selectedHandCardID)
    }
    G.players[ctx.currentPlayer] = player
    G.landscape[ctx.currentPlayer] = landscape
    return G
}


export function Cards() {

   // let card = function(props){
   //    return {   
   //       name: props.name,
   //       number: props.number,
   //       type: props.type,
   //       subtype: sprops.ubtype,
   //       text: props.text,
   //    }
   // }

   // let location = function(props) {
   //    let c = card(props)
   //    return {
   //       ...c,

   //    }
   // }


   return [
      {
			number: 1,
         name: 'Commerce',
         type: 'ability',
         text: 'Destroy a friendly Item. Reveal the top 5 cards of your deck. Add an item of the same type to your Inventory.',
         play: (G, ctx) => {
            console.log('play')
            return G
         }

    },
    {
			number: 2,
         name: 'Diplomatic Solution',
         type: 'ability',
         text: 'React: Prevent all damage to this character.',
         play: (G, ctx) => {
           console.log('play')
           return G
         },
    },
    {
			number: 3,
         name: 'Hone',
         type: 'ability',
         text: 'This character\'s next Sharp or Piercing attack this turn does +2 damage On Hit.',
         play: (G, ctx) => {
           console.log('play')
           return G
         },
       },
   {
      number: 4,
      name: 'Teleport',
      type: 'ability',
      subtype: '',
      element: 'None',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': 'min3',
      'Traits': '',
      text: 'Move this character up to 4. Action +1.',
      'Materials': '',
      play: (G, ctx) => {
        console.log('play')
        return G
      },
   },
   {
		number: 5,
      name: 'Greatship',
      type: 'location',
      subtype: '',
      element: 'Water',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '',
      'Materials': 'Metal, Rope, Hide, Wood',
      play: PlayLocation
    },
    {
			number: 6,
      name: 'Health Potion',
      type: 'Item',
      subtype: 'Potion',
      element: '',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Use: Heal 5. Draw a card.',
      'Materials': 'Soul',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 7,
      name: 'Leather Armor',
      type: 'Item',
      subtype: 'Armor',
      element: 'None',
      'Strength': 0,
      'Armor': 2,
      'Agility': 0,
      'Will': 0,
      'Traits': 'Armor, Light, Chest',
      text: '',
      'Materials': 'Hide',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 8,
      name: 'Lighthammer',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 1,
      'Armor': 0,
      'Agility': 0,
      'Will': 0,
      'Traits': 'Hammer, 1-Handed, Blunt',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 9,
      name: 'Long Axe',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 3,
      'Armor': 1,
      'Agility': -1,
      'Will': 0,
      'Traits': 'Axe, 2-Handed, Sharp',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 10,
      name: 'Longbow',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 4,
      'Armor': -3,
      'Agility': 0,
      'Will': 0,
      'Traits': ['bow', 'two-handed'],
      text: '',
      'Materials': ['wood', 'rope'],
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 11,
      name: 'Longsword',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 3,
      'Armor': 1,
      'Agility': -1,
      'Will': 0,
      'Traits': 'Sword, 2-Handed, Sharp',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 12,
      name: 'Plate Armor',
      type: 'Item',
      subtype: 'Armor',
      element: 'None',
      'Strength': 0,
      'Armor': 4,
      'Agility': -2,
      'Will': 0,
      'Traits': 'Armor, Heavy, Chest',
      text: '',
      'Materials': 'Metal, Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 13,
      name: 'Short Axe',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 1,
      'Armor': 0,
      'Agility': 0,
      'Will': 0,
      'Traits': 'Axe, 1-Handed, Sharp',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 14,
      name: 'Shortbow',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 2,
      'Armor': -2,
      'Agility': 0,
      'Will': 0,
      'Traits': 'Bow, 2-Handed, Piercing',
      text: '',
      'Materials': 'Wood, Rope',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 15,
      name: 'Shortsword',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 1,
      'Armor': 0,
      'Agility': 0,
      'Will': 0,
      'Traits': 'Sword, 1-Handed, Sharp',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 16,
      name: 'Sledgehammer',
      type: 'Item',
      subtype: 'weapon',
      element: 'None',
      'Strength': 3,
      'Armor': 1,
      'Agility': -1,
      'Will': 0,
      'Traits': 'Hammer, 2-Handed, Blunt',
      text: '',
      'Materials': 'Metal',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 17,
      name: 'Farmhouse',
      type: 'location',
      subtype: '',
      element: 'Earth',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '',
      'Materials': 'Hide, Metal, Rope',
      'text': '+1 wood',
      play: PlayLocation,
      onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 18,
      name: 'Tree-on-Cliff',
      type: 'location',
      subtype: '',
      element: 'Earth',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '+1 wood',
      'Materials': 'Metal, Wood',
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 19,
      name: 'Dwarven Fortress',
      type: 'location',
      subtype: 'Castle',
      element: 'Earth',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '+1 wood, +1 metal',
      'Materials': '',
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 20,
      name: 'Woodland',
      type: 'location',
      subtype: 'Wild',
      element: 'Earth',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '',
      'Materials': 'Wood',
     play: PlayLocation,
      'text': '+1 wood, +1 metal',
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 21,
      name: 'Item Shop',
      type: 'location',
      subtype: 'Vendor',
      element: '',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Sells goods',
      'Materials': '',
     play: PlayLocation,
     text: 'Vendor',
    },
    {
			number: 22,
      name: 'First City',
      type: 'location',
      subtype: 'Settlement',
      element: '',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',

      'Materials': '',
     play: PlayLocation,
      'Text': '+1 metal',
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 23,
      name: 'Little Village',
      type: 'location',
      subtype: 'Settlement',
      element: '',
      'Strength': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Place some sheeps around. +1 wood',
      'Materials': '',
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 24,
      name: 'Fireball',
      type: 'ability',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': 'min2',
      'Traits': 'Destruction',
      text: '+3 Ranged attack.',
      'Materials': '',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 25,
      name: 'Desecrate',
      type: 'ability',
      subtype: 'Tactic',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': 'Destruction',
      text: 'Characters cannot move through target space.',
      'Materials': '',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 26,
      name: 'Fury',
      type: 'ability',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '+3 Might this turn. -3 Armor this turn.',
      'Materials': '',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 27,
      name: 'Channel',
      type: 'ability',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: '-X Soul: Perform a +X ranged attack.',
      'Materials': '',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 28,
      name: 'Fire Dagger',
      type: 'ability',
      subtype: 'Thief',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': 'm1',
      'Traits': 'Conjuration',
      text: 'Equip a +1 Might offhand Sword weapon.',
      'Materials': 'Soul',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 29,
      name: 'Armory',
      type: 'location',
      subtype: '',
      element: '',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Put your arms in here to buy them!',
      'Materials': '',
      'Recipe': '',
     play: PlayLocation
    },
    {
			number: 30,
      name: 'Berserker',
      type: 'being',
      subtype: 'Fighter',
      element: 'Fire',
      'Might': 3,
      'Armor': 2,
      'Agility': 2,
      'Will': '',
      'Traits': '',
      text: 'O: +2 Melee attack.\nD: React - After being hit by a basic attack, if the attacking character is in range, perform a -4 basic attack against them.',
      'Materials': '',
      'Recipe': '',
     play: PlayBeing,
    },
    {
			number: 31,
      name: 'Pyromancer',
      type: 'being',
      subtype: 'Mage',
      element: 'Fire',
      'Might': 3,
      'Armor': 0,
      'Agility': 2,
      'Will': '',
      'Traits': '',
      text: 'O: +0 Ranged attack.\nO: Burn target character. Range 2.',
      'Materials': '',
      'Recipe': '',
       play: PlayBeing,

    },
    {
			number: 32,
      name: 'Fire Rogue',
      type: 'being',
      subtype: 'Rogue',
      element: 'Fire',
      'Might': 1,
      'Armor': 1,
      'Agility': 3,
      'Will': '',
      'Traits': '',
      text: 'O: 1 damage Melee attack. Draw a card.\nD: The next attack that targets this character misses.',
      'Materials': '',
      'Recipe': '',
      play: PlayBeing,

    },
    {
			number: 33,
      name: 'Hero',
      type: 'being',
      subtype: 'Fighter',
      element: 'Fire',
      'Might': 5,
      'Armor': 4,
      'Agility': 2,
      'Will': '',
      'Traits': 'Leader',
      text: 'O: +2 Melee attack.\nO: You may move up to 3 spaces in one direction and then make a -2 melee attack.\nD: The next time an adjacent character would take damage from an opponent\'s attack, this character takes that damage instead.',
      'Materials': '',
      'Recipe': '',
      play: PlayBeing,

    },
    {
			number: 34,
      name: 'Rebirth Potion',
      type: 'Item',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Use: Recruit a character from the Crypt.',
      'Materials': '',
      'Recipe': '',
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			number: 35,
      name: 'Fire Core',
      type: 'location',
      subtype: 'Core',
      element: 'Fire',
      'Might': '-',
      'Armor': 20,
      'Agility': '-',
      'Will': '',
      'Traits': '',
      text: 'Draw +1. At the end of your turn, discard a card from your hand.',
      'Materials': '',
      'Recipe': '',
     play: PlayLocation
    },
    {
			number: 36,
      name: 'Volcano',
      type: 'location',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': 'Quest',
      text: 'Complete: Have 5 or more of your characters on the landscape.\nReward: Draw a card for each of your characters on the landscape.',
      'Materials': '+1 wood, +1 metal',
      'Recipe': '',
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 37,
      name: 'Campfire',
      type: 'location',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Characters in this row have +1 Might. Fire characters in this row have +3 Might.',
      'Materials': '+1 Soul',
      'Recipe': '',
     play: PlayLocation,
      'text': '',
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['soul'] = resources['soul'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 38,
      name: 'Obsidian Mine',
      type: 'location',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Enter: +3 Soul or +3 Metal.',
      'Materials': '2 metal',
      'Recipe': '',
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			number: 39,
      name: 'Heatwell',
      type: 'location',
      subtype: '',
      element: 'Fire',
      'Might': '',
      'Armor': '',
      'Agility': '',
      'Will': '',
      'Traits': '',
      text: 'Build: +1 Soul. \n-3 Soul: Draw a card.',
      'Materials': '+1 Soul',
      'Recipe': '',
      play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['soul'] = resources['soul'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },

  ]
}
