/**
 * Spell and Steel System Configuration
 */

export const SPELL_AND_STEEL = {};

// Ancestries
SPELL_AND_STEEL.ancestries = {
  dwarf: {
    label: "Dwarf",
    description: "Mountain dwellers known for craftsmanship",
    attributes: {
      bonusVigor: 1,
      bonusFortitude: 1
    }
  },
  ratfolk: {
    label: "Ratfolk",
    description: "Small folk from underground dens",
    attributes: {
      bonusAgility: 1,
      bonusStealth: 1
    }
  },
  human: {
    label: "Human",
    description: "Versatile and ambitious",
    attributes: {
      skillBonus: 1
    }
  },
  orc: {
    label: "Orc",
    description: "Proud and strong",
    attributes: {
      bonusVigor: 1,
      bonusBrawl: 1
    }
  },
  elf: {
    label: "Elf",
    description: "Long-lived and wise",
    attributes: {
      bonusSmarts: 1,
      bonusRanged: 1
    }
  }
};

// Skill definitions
SPELL_AND_STEEL.skills = {
  largeBlades: { label: "Large Blades", attribute: "vigor" },
  shortBlades: { label: "Short Blades", attribute: "agility" },
  brawl: { label: "Brawl", attribute: "vigor" },
  longBlades: { label: "Long Blades", attribute: "vigor" },
  blunt: { label: "Blunt", attribute: "vigor" },
  polearms: { label: "Polearms", attribute: "vigor" },
  ranged: { label: "Ranged", attribute: "agility" },
  athletics: { label: "Athletics", attribute: "vigor" },
  acrobatics: { label: "Acrobatics", attribute: "agility" },
  stealth: { label: "Stealth", attribute: "agility" },
  sleightOfHand: { label: "Sleight of Hand", attribute: "agility" },
  ride: { label: "Ride", attribute: "agility" },
  investigation: { label: "Investigation", attribute: "smarts" },
  lore: { label: "Lore", attribute: "smarts" },
  arcana: { label: "Arcana", attribute: "smarts" },
  medicine: { label: "Medicine", attribute: "smarts" },
  survival: { label: "Survival", attribute: "smarts" },
  insight: { label: "Insight", attribute: "spirit" },
  persuade: { label: "Persuade", attribute: "spirit" },
  faith: { label: "Faith", attribute: "spirit" },
  intimidate: { label: "Intimidate", attribute: "spirit" },
  perform: { label: "Perform", attribute: "spirit" },
  resolve: { label: "Resolve", attribute: "spirit" },
  fortitude: { label: "Fortitude", attribute: "vigor" }
};

// Success Thresholds
SPELL_AND_STEEL.successThresholds = {
  1: "Trivial",
  2: "Easy",
  3: "Standard (Hard)",
  4: "Standard (Hard)",
  5: "Hard",
  6: "Legendary"
};

// Spell Schools
SPELL_AND_STEEL.spellSchools = {
  arcana: "Arcana",
  faith: "Faith"
};

// Spell Tiers
SPELL_AND_STEEL.spellTiers = {
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3"
};

// Weapon Types
SPELL_AND_STEEL.weaponTypes = {
  melee: "Melee",
  ranged: "Ranged"
};

// Armor Types
SPELL_AND_STEEL.armorTypes = {
  light: "Light",
  medium: "Medium",
  heavy: "Heavy"
};

// Status Effects
SPELL_AND_STEEL.statusEffects = {
  blinded: {
    label: "Blinded",
    description: "Cannot see until cured"
  },
  burning: {
    label: "Burning",
    description: "Take 1 damage per turn for 3 turns"
  },
  poisoned: {
    label: "Poisoned",
    description: "Take 1 damage per turn until cured"
  },
  shaken: {
    label: "Shaken",
    description: "-1 penalty to all dice pools next turn"
  },
  restrained: {
    label: "Restrained",
    description: "Movement reduced to 0"
  }
};

// Monster Tags
SPELL_AND_STEEL.monsterTags = {
  undead: "UNDEAD",
  void: "VOID",
  holy: "HOLY",
  construct: "CONSTRUCT",
  demonic: "DEMONIC"
};

// Equipment Types
SPELL_AND_STEEL.equipmentTypes = {
  shield: "Shield",
  accessory: "Accessory",
  trinket: "Trinket",
  misc: "Miscellaneous"
};

// Attributes
SPELL_AND_STEEL.attributes = {
  vigor: { label: "Vigor", abbr: "Vig" },
  agility: { label: "Agility", abbr: "Agi" },
  smarts: { label: "Smarts", abbr: "Sma" },
  spirit: { label: "Spirit", abbr: "Spi" }
};
