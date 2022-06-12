// GeneralType:
// {
//   number: Unique identifying integer for the "set" of cards
//   name: Card name. Should be unique.
//   type: One of ["Being", "Item", "Location"]
//   subtype: Depends on the type, but usually something like "Equipment".
//   rarity: ["common", "uncommon", "rare", "legendary rare"],
//   element: ["fire", "water", "earth", "air", "light", "dark"],
//
//   traits: Identifying characteristics for the subject of the card:
//           ["human", "archer", "flammable", "knight"],
//   materials: An object containing the cost to play the card. Possible resources so far:
//   {
//     flax: plant based stuff (for cloth/clothing).
//     metal: metal.
//     wood: for making wooden things.
//     food: For eating.
//     soul: Human essence? Can be used to play beings and cast spells.
//     gold: currency.
//   },
//   text: What the card does based on the above. Will probably be auto generated in many cases
// },

// Location:
// {
//   ...GeneralType,
//   // Motherland = can start as home base
//   subtype: ["Motherland"]
//   stats: Any bonuses this card gives to party members at this location:
//   {
//     strength: 0-25, 0=insect, 25=strongest possible being
//     armor: 0-25
//     agility: 0-25
//     will: 0-25
//   },
// },

// Being:
// {
//   ...GeneralType,
//   // Object containing the following character statistics:
//   stats:
//   {
//     strength: 0-25, 0=insect, 25=strongest possible being
//     armor: 0-25
//     agility: 0-25
//     will: 0-25
//   },
//   Will also need something here for special dude abilities
// },

// Item:
// {
//   ...GeneralType,
//   stats: Any bonuses this card gives to party members using this item:
//   {
//     strength: 0-25, 0=insect, 25=strongest possible being
//     armor: 0-25
//     agility: 0-25
//     will: 0-25
//   },
//   Similar to abilities below
//   use: {
//     damage: {
//      amount: 0
//    }
//  }
// },

// Ability:
// {
//   ...GeneralType,
//   One-off vs remains in play
//   subtype: ["Instant", "Sorcery"]
//   stats: probably should represent any stat bonuses:
//   {
//     strength: 0-25, 0=insect, 25=strongest possible being
//     armor: 0-25
//     agility: 0-25
//     will: 0-25
//   },
//   Many abilities will do damage or healing, I think
//   damage: {
//     Flat damage bonus
//     amount: 0
//     Bonus from any stats
//     statBonus: null
//   },
//   For example, this would heal 5 + the caster's Will stat
//   healing: {
//     amount: 5,
//     statBonus: 'will'
//   },
// },

// Quest:
// {
//   ...GeneralType,
//   TBD
// },

const cardlist = [
  // Locations (1-20)
  {
    number: 1,
    name: "Bathurst",
    type: "Location",
    subtype: "Motherland",
    rarity: "common",
    element: "",
    text: "Discard a Fire element card: +1 metal.",
    production: {
      soul: 1,
    },
  },
  {
    number: 2,
    name: "Iron Mine",
    type: "Location",
    subtype: "",
    rarity: "common",
    element: "Earth",
    traits: ["underground"],
    text: "",
    production: {
      metal: 1,
    },
  },
  {
    number: 3,
    name: "Dense Forest",
    type: "Location",
    subtype: "",
    rarity: "common",
    element: "Earth",
    traits: ["wooded"],
    text: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: -2,
      will: 0,
    },
    production: {
      wood: 1,
    },
  },
  {
    number: 4,
    name: "Pathway",
    type: "Location",
    subtype: "",
    rarity: "common",
    element: "",
    traits: [],
    text: "Movement through this landscape costs 0.",
  },
  {
    number: 5,
    name: "Wizard Tower",
    type: "Location",
    subtype: "",
    rarity: "uncommon",
    element: "",
    text: "{Wizards} only.",
    stats: {
      strength: 0,
      armor: 0,
      agility: 0,
      will: 1,
    },
    production: {
      soul: 1,
    },
  },
  {
    number: 6,
    name: "Suffragette City",
    type: "Location",
    subtype: "Motherland",
    rarity: "rare",
    element: "",
    text: "Hey man, my workday's insane",
    traits: ["city", "lodging", "shop"],
    production: {
      soul: 1,
      gold: 1,
    },
  },
  {
    number: 7,
    name: "Grumpy's Farm",
    type: "Location",
    subtype: "",
    rarity: "common",
    element: "",
    text: "They don't call him Grumpy for nothin'",
    traits: [],
    stats: {
      strength: 0,
      armor: 1,
      agility: 0,
      will: 0,
    },
    production: {
      flax: 1,
      food: 1,
    },
  },
  // {
  //   number: 23,
  //   name: "Great Gate",
  //   type: "Location",
  //   subtype: "",
  //   rarity: "common",
  //   element: "",
  //   text: "Must be played adjacent to a city.",
  //   traits: [],
  //   stats: {
  //     strength: 0,
  //     armor: 3,
  //     agility: 0,
  //     will: 0,
  //   },
  // },

  // Beings (21-30)
  {
    number: 21,
    name: "Pyromancer",
    type: "Being",
    subtype: "",
    rarity: "common",
    element: "fire",
    stats: {
      strength: 0,
      armor: 0,
      agility: 0,
      will: 2,
    },
    traits: ["human", "wizard"],
    text: "Fire {abilities} do +1 damage. Fire enchantments provide +1 to any stat bonuses.",
    materials: {
      soul: 1,
    },
  },
  {
    number: 22,
    name: "Tank",
    type: "Being",
    subtype: "",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 2,
      agility: 0,
      will: 0,
    },
    traits: ["human", "fighter"],
    text: "",
    materials: {
      soul: 1,
    },
  },
  {
    number: 23,
    name: "Thief",
    type: "Being",
    subtype: "",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: 2,
      will: 0,
    },
    traits: ["human", "rogue"],
    text: "I should use agility as armor probably",
    materials: {
      soul: 1,
    },
  },
  {
    number: 24,
    name: "Scary Lich",
    type: "Being",
    subtype: "",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: 0,
      will: 3,
    },
    traits: ["undead", "wizard"],
    text: "",
    materials: {
      soul: 1,
    },
  },
  {
    number: 25,
    name: "Bear Druid",
    type: "Being",
    subtype: "",
    rarity: "rare",
    element: "",
    stats: {
      strength: 2,
      armor: 0,
      agility: 0,
      will: 2,
    },
    traits: ["human", "fighter", "wizard"],
    text: "+1 to all stats in {wooded} areas. RAWWARWARAWRRR.",
    materials: {
      soul: 1,
    },
  },
  {
    number: 26,
    name: "Water Wizard",
    type: "Being",
    subtype: "",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: 0,
      will: 2,
    },
    traits: ["human", "wizard"],
    text: "Beware my waterball!",
    materials: {
      soul: 1,
    },
  },
  {
    number: 27,
    name: "Necromancer",
    type: "Being",
    subtype: "",
    rarity: "rare",
    element: "",
    stats: {
      strength: 1,
      armor: 1,
      agility: 0,
      will: 4,
    },
    traits: ["undead"],
    text: "Spooky...",
    materials: {
      soul: 1,
    },
  },
  // {
  //   number: 28,
  //   name: "Lil' Bear",
  //   type: "Being",
  //   subtype: "Companion",
  //   rarity: "common",
  //   element: "",
  //   text: "He's a lil bear!",
  //   traits: ["animal"],
  //   stats: {
  //     strength: 2,
  //     armor: 2,
  //     agility: 0,
  //     will: 0,
  //   },
  // },

  // Items (31-40)
  {
    number: 31,
    name: "Short Sword",
    type: "Item",
    subtype: "Weapon",
    rarity: "common",
    element: "",
    stats: {
      strength: 1,
      armor: 1,
      agility: 0,
      will: 0,
    },
    traits: ["sword", "one-handed"],
    text: "",
    materials: {
      metal: 1,
    },
  },
  {
    number: 32,
    name: "Small Shield",
    type: "Item",
    subtype: "Armor",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 2,
      agility: 0,
      will: 0,
    },
    traits: ["shield", "one-handed"],
    text: "",
    materials: {
      wood: 1,
    },
  },
  {
    number: 33,
    name: "Silk Cloak",
    type: "Item",
    subtype: "Armor",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: 2,
      will: 0,
    },
    traits: ["armor"],
    text: "",
    materials: {
      flax: 1,
    },
  },
  {
    number: 33,
    name: "Hearty Meal",
    type: "Item",
    subtype: "",
    rarity: "common",
    element: "",
    traits: ["food"],
    text: "",
    materials: {
      food: 1,
    },
    effect: {
      type: "use",
      healing: {
        amount: 2,
      },
    },
  },
  {
    number: 34,
    name: "Silver Ring",
    type: "Item",
    subtype: "Armor",
    rarity: "common",
    element: "",
    stats: {
      strength: 0,
      armor: 0,
      agility: 0,
      will: 1,
    },
    traits: ["accessory"],
    text: "",
    materials: {
      metal: 2,
    },
  },
  {
    number: 35,
    name: "Firey Grenade",
    type: "Item",
    subtype: "",
    rarity: "common",
    element: "",
    text: "3 damage {ranged} attack.",
    traits: ["ranged"],
    materials: {
      metal: 1,
    },
    effect: {
      type: "use",
      damage: {
        amount: 3,
      },
    },
  },
  {
    number: 36,
    name: "Little Red Potion",
    type: "Item",
    subtype: "",
    rarity: "common",
    element: "",
    text: "Heal 3.",
    traits: ["potion"],
    effect: {
      type: "use",
      healing: {
        amount: 3,
      },
    },
  },

  // Abilities (41-50)
  {
    number: 41,
    name: "Fireball",
    type: "Ability",
    subtype: "Sorcery",
    rarity: "common",
    element: "",
    text: "{Will} + 3 damage.",
    traits: ["spell"],
    effect: {
      cost: {
        soul: 1,
      },
      type: "use",
      damage: {
        amount: 3,
        statBonus: "will",
      },
    },
  },
  {
    number: 42,
    name: "Flame Weapon",
    type: "Ability",
    subtype: "Sorcery",
    rarity: "common",
    element: "",
    text: "Target melee weapon you control gets +{will} strength.",
    traits: ["enchantment"],
    effect: {
      type: "ongoing",
      stats: {
        strength: "will",
        armor: 0,
        agility: 0,
        will: 0,
      },
    },
  },
  {
    number: 43,
    name: "Little Heal",
    type: "Ability",
    subtype: "",
    rarity: "common",
    element: "",
    text: "Heal {Will}+1. I bet that feels good.",
    traits: ["spell"],
    effect: {
      type: "use",
      healing: {
        amount: 1,
        statBonus: "will",
      },
    },
  },

  // Quests (51-55)
  // {
  //   number: 22,
  //   name: "Soul Searching",
  //   type: "Quest",
  //   subtype: "",
  //   rarity: "common",
  //   element: "",
  //   text: "Travel at least 3 spaces away from your starting location. Reward: draw a card. Draw 3 cards if you are really far away.",
  //   complete: {
  //     something
  //   },
  //   effect: {
  //      something else
  //   },
  // },

  // Older card ideas, to be incorporated later:

  // {
  //   "number": "5",
  //   "name": "Short Sword",
  //   "type": "Item",
  //   "subtype": "Item",
  //   "element": "",
  //   "stats": {
  //     "strength": 1,
  //     "armor": 1,
  //     "agility": 0,
  //     "will": 0,
  //   },
  //   "traits": ['sword', 'one-handed'],
  //   "text": "",
  //   "materials": {
  //     metal: 1,
  //   },
  // },

  // {
  //   "number": "1",
  //   "name": "Commerce",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Destroy a friendly Item. Reveal the top 5 cards of your deck. Add an item of the same type to your Inventory.",
  //   "materials": "",
  // },
  // {
  //   "number": "2",
  //   "name": "Diplomatic Solution",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "None",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "min2",
  //   "will": "",
  //   "traits": [],
  //   "text": "React: Prevent all damage to this character.",
  //   "materials": "",
  // },
  // {
  //   "number": "3",
  //   "name": "Hone",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "None",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "This character's next Sharp or Piercing attack this turn does +2 damage On Hit.",
  //   "materials": "",
  // },
  // {
  //   "number": "4",
  //   "name": "Teleport",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "None",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "min3",
  //   "traits": [],
  //   "text": "Move this character up to 4. Action +1.",
  //   "materials": "",
  // },
  // {
  //   "number": "5",
  //   "name": "Greatship",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Water",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "",
  //   "materials": "Metal, Rope, Hide, Wood",
  // },
  // {
  //   "number": "6",
  //   "name": "Health Potion",
  //   "type": "Item",
  //   "subtype": "Potion",
  //   "element": "",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Use: Heal 5. Draw a card.",
  //   "materials": "Soul",
  // },
  // {
  //   "number": "7",
  //   "name": "Leather Armor",
  //   "type": "Item",
  //   "subtype": "Armor",
  //   "element": "None",
  //   "strength": 0,
  //   "armor": "+2",
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Armor, Light, Chest",
  //   "text": "",
  //   "materials": "Hide",
  // },
  // {
  //   "number": "8",
  //   "name": "Lighthammer",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+1",
  //   "armor": 0,
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Hammer, 1-Handed, Blunt",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "9",
  //   "name": "Long Axe",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+3",
  //   "armor": "+1",
  //   "agility": -1,
  //   "will": 0,
  //   "traits": "Axe, 2-Handed, Sharp",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "10",
  //   "name": "Longbow",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+4",
  //   "armor": -3,
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Bow, 2-Handed, Piercing",
  //   "text": "",
  //   "materials": "Wood, Rope",
  // },
  // {
  //   "number": "11",
  //   "name": "Longsword",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+3",
  //   "armor": "+1",
  //   "agility": -1,
  //   "will": 0,
  //   "traits": "Sword, 2-Handed, Sharp",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "12",
  //   "name": "Plate Armor",
  //   "type": "Item",
  //   "subtype": "Armor",
  //   "element": "None",
  //   "strength": 0,
  //   "armor": "+4",
  //   "agility": -2,
  //   "will": 0,
  //   "traits": "Armor, Heavy, Chest",
  //   "text": "",
  //   "materials": "Metal, Metal",
  // },
  // {
  //   "number": "13",
  //   "name": "Short Axe",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+1",
  //   "armor": 0,
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Axe, 1-Handed, Sharp",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "14",
  //   "name": "Shortbow",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+2",
  //   "armor": -2,
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Bow, 2-Handed, Piercing",
  //   "text": "",
  //   "materials": "Wood, Rope",
  // },
  // {
  //   "number": "15",
  //   "name": "Shortsword",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+1",
  //   "armor": 0,
  //   "agility": 0,
  //   "will": 0,
  //   "traits": "Sword, 1-Handed, Sharp",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "16",
  //   "name": "Sledgehammer",
  //   "type": "Item",
  //   "subtype": "Weapon",
  //   "element": "None",
  //   "strength": "+3",
  //   "armor": "+1",
  //   "agility": -1,
  //   "will": 0,
  //   "traits": "Hammer, 2-Handed, Blunt",
  //   "text": "",
  //   "materials": "Metal",
  // },
  // {
  //   "number": "17",
  //   "name": "Farmhouse",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Earth",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "",
  //   "materials": "Hide, Metal, Rope",
  //   'text': '+1 wood',
  //   "production": {
  //     "wood": 1,
  //   },
  // },
  // {
  //   "number": "18",
  //   "name": "Tree-on-Cliff",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Earth",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "+1 wood",
  //   "materials": "Metal, Wood",
  //   "production": {
  //     "wood": 1
  //   },
  // },
  // {
  //   "number": "19",
  //   "name": "Dwarven Fortress",
  //   "type": "Location",
  //   "subtype": "Castle",
  //   "element": "Earth",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "+1 wood, +1 metal",
  //   "materials": "",
  //   "production": {
  //     "wood": 1,
  //     "metal": 1
  //   },
  // },
  // {
  //   "number": "20",
  //   "name": "Woodland",
  //   "type": "Location",
  //   "subtype": "Wild",
  //   "element": "Earth",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "",
  //   "materials": "Wood",
  //   "production": {
  //     "wood": 1,
  //     "metal": 1
  //   },
  //   'text': '+1 wood, +1 metal',
  // },
  // {
  //   "number": "21",
  //   "name": "Item Shop",
  //   "type": "Location",
  //   "subtype": "Vendor",
  //   "element": "",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Sells goods",
  //   "materials": "",
  //  text: 'Vendor',
  // },
  // {
  //   "number": "22",
  //   "name": "First City",
  //   "type": "Location",
  //   "subtype": "Settlement",
  //   "element": "",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "materials": "",
  //   "production": {
  //     "wood": 1,
  //     "metal": 1
  //   },
  //   'Text': '+1 metal',
  // },
  // {
  //   "number": "23",
  //   "name": "Little Village",
  //   "type": "Location",
  //   "subtype": "Settlement",
  //   "element": "",
  //   "strength": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Place some sheeps around. +1 wood",
  //   "materials": "",
  //   "production": {
  //     "wood": 1,
  //   },
  // },
  // {
  //   "number": "24",
  //   "name": "Fireball",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "min2",
  //   "traits": "Destruction",
  //   "text": "+3 Ranged attack.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "25",
  //   "name": "Desecrate",
  //   "type": "Ability",
  //   "subtype": "Tactic",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": "Destruction",
  //   "text": "Characters cannot move through target space.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "26",
  //   "name": "Fury",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "+3 Might this turn. -3 Armor this turn.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "27",
  //   "name": "Channel",
  //   "type": "Ability",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "-X Soul: Perform a +X ranged attack.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "28",
  //   "name": "Fire Dagger",
  //   "type": "Ability",
  //   "subtype": "Thief",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "m1",
  //   "traits": "Conjuration",
  //   "text": "Equip a +1 Might offhand Sword weapon.",
  //   "materials": "Soul",
  //   "recipe": "",
  // },
  // {
  //   "number": "29",
  //   "name": "Armory",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Put your arms in here to buy them!",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "30",
  //   "name": "Berserker",
  //   "type": "Being",
  //   "subtype": "Fighter",
  //   "element": "Fire",
  //   "might": 3,
  //   "armor": 2,
  //   "agility": 2,
  //   "will": "",
  //   "traits": [],
  //   "text": "O: +2 Melee attack.\nD: React - After being hit by a basic attack, if the attacking character is in range, perform a -4 basic attack against them.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "31",
  //   "name": "Pyromancer",
  //   "type": "Being",
  //   "subtype": "Mage",
  //   "element": "Fire",
  //   "might": 3,
  //   "armor": 0,
  //   "agility": 2,
  //   "will": "",
  //   "traits": [],
  //   "text": "O: +0 Ranged attack.\nO: Burn target character. Range 2.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "32",
  //   "name": "Fire Rogue",
  //   "type": "Being",
  //   "subtype": "Rogue",
  //   "element": "Fire",
  //   "might": 1,
  //   "armor": 1,
  //   "agility": 3,
  //   "will": "",
  //   "traits": [],
  //   "text": "O: 1 damage Melee attack. Draw a card.\nD: The next attack that targets this character misses.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "33",
  //   "name": "Hero",
  //   "type": "Being",
  //   "subtype": "Fighter",
  //   "element": "Fire",
  //   "might": 5,
  //   "armor": 4,
  //   "agility": 2,
  //   "will": "",
  //   "traits": "Leader",
  //   "text": "O: +2 Melee attack.\nO: You may move up to 3 spaces in one direction and then make a -2 melee attack.\nD: The next time an adjacent character would take damage from an opponent's attack, this character takes that damage instead.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "34",
  //   "name": "Rebirth Potion",
  //   "type": "Item",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Use: Recruit a character from the Crypt.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "35",
  //   "name": "Fire Core",
  //   "type": "Location",
  //   "subtype": "Core",
  //   "element": "Fire",
  //   "might": "-",
  //   "armor": 20,
  //   "agility": "-",
  //   "will": "",
  //   "traits": [],
  //   "text": "Draw +1. At the end of your turn, discard a card from your hand.",
  //   "materials": "",
  //   "recipe": "",
  // },
  // {
  //   "number": "36",
  //   "name": "Volcano",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": "Quest",
  //   "text": "Complete: Have 5 or more of your characters on the field.\nReward: Draw a card for each of your characters on the field.",
  //   "materials": "+1 wood, +1 metal",
  //   "recipe": "",
  //   "production": {
  //     "wood": 1,
  //     "metal": 1
  //   },
  // },
  // {
  //   "number": "37",
  //   "name": "Campfire",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Characters in this row have +1 Might. Fire characters in this row have +3 Might.",
  //   "materials": "+1 Soul",
  //   "recipe": "",
  //   "production": {
  //     "soul": 1,
  //   },
  //   'text': '',
  // },
  // {
  //   "number": "38",
  //   "name": "Obsidian Mine",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Enter: +3 Soul or +3 Metal.",
  //   "materials": "2 metal",
  //   "recipe": "",
  //   "production": {
  //     "wood": 1,
  //     "metal": 1
  //   },
  // },
  // {
  //   "number": "39",
  //   "name": "Heatwell",
  //   "type": "Location",
  //   "subtype": "",
  //   "element": "Fire",
  //   "might": "",
  //   "armor": "",
  //   "agility": "",
  //   "will": "",
  //   "traits": [],
  //   "text": "Build: +1 Soul. \n-3 Soul: Draw a card.",
  //   "materials": "+1 Soul",
  //   "recipe": "",
  //   "production": {
  //     "soul": 1
  //   },
  // }
];

export function generateDeckFromDecklist(decklist) {
  return cardlist
    .reduce(
      (populatedDeck, card) =>
        decklist.hasOwnProperty(card.name) && decklist[card.name] > 0
          ? [
              ...populatedDeck,
              ...Array.from({ length: decklist[card.name] }).fill({ ...card }),
            ]
          : populatedDeck,
      []
    )
    .map((card, i) => ({
      ...card,
      id: i.toString(),
      catalogId: cardCatalog().find(({ name }) => name === card.name).catalogId,
    }));
}

export function Cards() {
  return cardlist;
}

let _uniqueIncrementalID = 0;
let _catalog;
export const cardCatalog = () => {
  if (_catalog) return _catalog;
  _catalog = cardlist.map((card) => ({
    ...card,
    catalogId: _uniqueIncrementalID++,
  }));
  return _catalog;
};
