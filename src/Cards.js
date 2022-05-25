// function Card(value, suit, rank) {
			// "Number": "",
//   // this.value = value;
//   // this.suit = suit;
//   // this.rank = rank;
// }

function PlayLocation (G, ctx, id) {
    console.log('play:', id)
    let player = G.players[ctx.currentPlayer]
    let field = G.field[ctx.currentPlayer]
    if (player.selectedHandCardID && player.selectedFieldID) {
      console.log('you can play this card!')
      player['handIDs'] = player['handIDs'].filter(cid => cid != player.selectedHandCardID)
      field[parseInt(player.selectedFieldID)]['fieldCardID'] = player.selectedHandCardID
    }
    G.players[ctx.currentPlayer] = player
    G.field[ctx.currentPlayer] = field
    return G
}

export function Cards() {
  return [
    {
			"Number": "1",
      "Name": "Commerce",
      "Type": "Ability",
      "Subtype": "",
      "Element": "",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Destroy a friendly Item. Reveal the top 5 cards of your deck. Add an item of the same type to your Inventory.",
      "Materials": "",
      play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "2",
      "Name": "Diplomatic Solution",
      "Type": "Ability",
      "Subtype": "",
      "Element": "None",
      "Strength": "",
      "Armor": "",
      "Agility": "min2",
      "Will": "",
      "Traits": "",
      "Text": "React: Prevent all damage to this character.",
      "Materials": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "3",
      "Name": "Hone",
      "Type": "Ability",
      "Subtype": "",
      "Element": "None",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "This character's next Sharp or Piercing attack this turn does +2 damage On Hit.",
      "Materials": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "4",
      "Name": "Teleport",
      "Type": "Ability",
      "Subtype": "",
      "Element": "None",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "min3",
      "Traits": "",
      "Text": "Move this character up to 4. Action +1.",
      "Materials": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "5",
      "Name": "Greatship",
      "Type": "Location",
      "Subtype": "",
      "Element": "Water",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "",
      "Materials": "Metal, Rope, Hide, Wood",
      play: PlayLocation
    },
    {
			"Number": "6",
      "Name": "Health Potion",
      "Type": "Item",
      "Subtype": "Potion",
      "Element": "",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Use: Heal 5. Draw a card.",
      "Materials": "Soul",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "7",
      "Name": "Leather Armor",
      "Type": "Item",
      "Subtype": "Armor",
      "Element": "None",
      "Strength": 0,
      "Armor": "+2",
      "Agility": 0,
      "Will": 0,
      "Traits": "Armor, Light, Chest",
      "Text": "",
      "Materials": "Hide",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "8",
      "Name": "Lighthammer",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+1",
      "Armor": 0,
      "Agility": 0,
      "Will": 0,
      "Traits": "Hammer, 1-Handed, Blunt",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "9",
      "Name": "Long Axe",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+3",
      "Armor": "+1",
      "Agility": -1,
      "Will": 0,
      "Traits": "Axe, 2-Handed, Sharp",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "10",
      "Name": "Longbow",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+4",
      "Armor": -3,
      "Agility": 0,
      "Will": 0,
      "Traits": "Bow, 2-Handed, Piercing",
      "Text": "",
      "Materials": "Wood, Rope",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "11",
      "Name": "Longsword",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+3",
      "Armor": "+1",
      "Agility": -1,
      "Will": 0,
      "Traits": "Sword, 2-Handed, Sharp",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "12",
      "Name": "Plate Armor",
      "Type": "Item",
      "Subtype": "Armor",
      "Element": "None",
      "Strength": 0,
      "Armor": "+4",
      "Agility": -2,
      "Will": 0,
      "Traits": "Armor, Heavy, Chest",
      "Text": "",
      "Materials": "Metal, Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "13",
      "Name": "Short Axe",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+1",
      "Armor": 0,
      "Agility": 0,
      "Will": 0,
      "Traits": "Axe, 1-Handed, Sharp",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "14",
      "Name": "Shortbow",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+2",
      "Armor": -2,
      "Agility": 0,
      "Will": 0,
      "Traits": "Bow, 2-Handed, Piercing",
      "Text": "",
      "Materials": "Wood, Rope",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "15",
      "Name": "Shortsword",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+1",
      "Armor": 0,
      "Agility": 0,
      "Will": 0,
      "Traits": "Sword, 1-Handed, Sharp",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "16",
      "Name": "Sledgehammer",
      "Type": "Item",
      "Subtype": "Weapon",
      "Element": "None",
      "Strength": "+3",
      "Armor": "+1",
      "Agility": -1,
      "Will": 0,
      "Traits": "Hammer, 2-Handed, Blunt",
      "Text": "",
      "Materials": "Metal",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "17",
      "Name": "Farmhouse",
      "Type": "Location",
      "Subtype": "",
      "Element": "Earth",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "",
      "Materials": "Hide, Metal, Rope",
      'text': '+1 wood',
      play: PlayLocation,
      onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "18",
      "Name": "Tree-on-Cliff",
      "Type": "Location",
      "Subtype": "",
      "Element": "Earth",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "+1 wood",
      "Materials": "Metal, Wood",
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "19",
      "Name": "Dwarven Fortress",
      "Type": "Location",
      "Subtype": "Castle",
      "Element": "Earth",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "+1 wood, +1 metal",
      "Materials": "",
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "20",
      "Name": "Woodland",
      "Type": "Location",
      "Subtype": "Wild",
      "Element": "Earth",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "",
      "Materials": "Wood",
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
			"Number": "21",
      "Name": "Item Shop",
      "Type": "Location",
      "Subtype": "Vendor",
      "Element": "",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Sells goods",
      "Materials": "",
     play: PlayLocation,
     text: 'Vendor',
    },
    {
			"Number": "22",
      "Name": "First City",
      "Type": "Location",
      "Subtype": "Settlement",
      "Element": "",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",

      "Materials": "",
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
			"Number": "23",
      "Name": "Little Village",
      "Type": "Location",
      "Subtype": "Settlement",
      "Element": "",
      "Strength": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Place some sheeps around. +1 wood",
      "Materials": "",
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "24",
      "Name": "Fireball",
      "Type": "Ability",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "min2",
      "Traits": "Destruction",
      "Text": "+3 Ranged attack.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "25",
      "Name": "Desecrate",
      "Type": "Ability",
      "Subtype": "Tactic",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "Destruction",
      "Text": "Characters cannot move through target space.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "26",
      "Name": "Fury",
      "Type": "Ability",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "+3 Might this turn. -3 Armor this turn.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "27",
      "Name": "Channel",
      "Type": "Ability",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "-X Soul: Perform a +X ranged attack.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "28",
      "Name": "Fire Dagger",
      "Type": "Ability",
      "Subtype": "Thief",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "m1",
      "Traits": "Conjuration",
      "Text": "Equip a +1 Might offhand Sword weapon.",
      "Materials": "Soul",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "29",
      "Name": "Armory",
      "Type": "Location",
      "Subtype": "",
      "Element": "",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Put your arms in here to buy them!",
      "Materials": "",
      "Recipe": "",
     play: PlayLocation
    },
    {
			"Number": "30",
      "Name": "Berserker",
      "Type": "Character",
      "Subtype": "Fighter",
      "Element": "Fire",
      "Might": 3,
      "Armor": 2,
      "Agility": 2,
      "Will": "",
      "Traits": "",
      "Text": "O: +2 Melee attack.\nD: React - After being hit by a basic attack, if the attacking character is in range, perform a -4 basic attack against them.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "31",
      "Name": "Pyromancer",
      "Type": "Character",
      "Subtype": "Mage",
      "Element": "Fire",
      "Might": 3,
      "Armor": 0,
      "Agility": 2,
      "Will": "",
      "Traits": "",
      "Text": "O: +0 Ranged attack.\nO: Burn target character. Range 2.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "32",
      "Name": "Fire Rogue",
      "Type": "Character",
      "Subtype": "Rogue",
      "Element": "Fire",
      "Might": 1,
      "Armor": 1,
      "Agility": 3,
      "Will": "",
      "Traits": "",
      "Text": "O: 1 damage Melee attack. Draw a card.\nD: The next attack that targets this character misses.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "33",
      "Name": "Hero",
      "Type": "Character",
      "Subtype": "Fighter",
      "Element": "Fire",
      "Might": 5,
      "Armor": 4,
      "Agility": 2,
      "Will": "",
      "Traits": "Leader",
      "Text": "O: +2 Melee attack.\nO: You may move up to 3 spaces in one direction and then make a -2 melee attack.\nD: The next time an adjacent character would take damage from an opponent's attack, this character takes that damage instead.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "34",
      "Name": "Rebirth Potion",
      "Type": "Item",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Use: Recruit a character from the Crypt.",
      "Materials": "",
      "Recipe": "",
     play: (G, ctx) => {
        console.log('play')
        return G
      },
    },
    {
			"Number": "35",
      "Name": "Fire Core",
      "Type": "Location",
      "Subtype": "Core",
      "Element": "Fire",
      "Might": "-",
      "Armor": 20,
      "Agility": "-",
      "Will": "",
      "Traits": "",
      "Text": "Draw +1. At the end of your turn, discard a card from your hand.",
      "Materials": "",
      "Recipe": "",
     play: PlayLocation
    },
    {
			"Number": "36",
      "Name": "Volcano",
      "Type": "Location",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "Quest",
      "Text": "Complete: Have 5 or more of your characters on the field.\nReward: Draw a card for each of your characters on the field.",
      "Materials": "+1 wood, +1 metal",
      "Recipe": "",
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "37",
      "Name": "Campfire",
      "Type": "Location",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Characters in this row have +1 Might. Fire characters in this row have +3 Might.",
      "Materials": "+1 Soul",
      "Recipe": "",
     play: PlayLocation,
      'text': '',
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['soul'] = resources['soul'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "38",
      "Name": "Obsidian Mine",
      "Type": "Location",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Enter: +3 Soul or +3 Metal.",
      "Materials": "2 metal",
      "Recipe": "",
     play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['wood'] = resources['wood'] + 1
         resources['metal'] = resources['metal'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    },
    {
			"Number": "39",
      "Name": "Heatwell",
      "Type": "Location",
      "Subtype": "",
      "Element": "Fire",
      "Might": "",
      "Armor": "",
      "Agility": "",
      "Will": "",
      "Traits": "",
      "Text": "Build: +1 Soul. \n-3 Soul: Draw a card.",
      "Materials": "+1 Soul",
      "Recipe": "",
      play: PlayLocation,
     onTurnStart: (G, ctx) => {
         let resources = G.resources[ctx.currentPlayer]
         resources['soul'] = resources['soul'] + 1
         G.resources[ctx.currentPlayer] = resources
      },
    }
  ]
}
