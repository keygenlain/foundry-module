# Spell and Steel - Foundry VTT System Module

A complete Foundry Virtual Tabletop system module for **Spell and Steel**, a tabletop RPG by Laine Coulter.

## Features

- ✅ Full character sheet with all attributes, skills, and health tracking
- ✅ Character Creation Wizard - guided step-by-step character creation
- ✅ NPC/Monster sheet with customizable tags (UNDEAD, VOID, HOLY, etc.)
- ✅ Item system supporting weapons, armor, spells, equipment, and loot
- ✅ Exploding Dice system (d6 dice pool that explodes on 6s)
- ✅ Success counting (4+ = success) with automatic calculation
- ✅ Spell management with tier and mana cost tracking
- ✅ Focus Token economy for player rewards
- ✅ Combat-ready with attack rolls and damage calculation
- ✅ Responsive character sheets
- ✅ Chat message integration for rolls

## Installation

1. Download the module folder
2. Extract to `Foundry VTT/Data/systems/spell-and-steel/`
3. Restart Foundry VTT
4. Create a new world and select **Spell and Steel** as the system
5. Start creating characters!

## Directory Structure

```
spell-and-steel/
├── system.json                          # System manifest
├── template.json                        # Data structure templates
├── README.md                            # This file
├── CHANGELOG.md                         # Version history
├── module/
│   ├── config.mjs                       # Configuration and constants
│   ├── dice.mjs                         # Dice rolling system
│   ├── system.mjs                       # Main system initialization
│   ├── actor/
│   │   └── actor.mjs                    # Actor document class
│   ├── item/
│   │   └── item.mjs                     # Item document class
│   └── sheets/
│       ├── character-sheet.mjs          # Character sheet class
│       ├── npc-sheet.mjs                # NPC sheet class
│       └── item-sheet.mjs               # Item sheet class
├── css/
│   └── spell-and-steel.css              # Stylesheet
└── templates/
    └── sheets/
        ├── character-sheet.hbs          # Character sheet template
        ├── npc-sheet.hbs                # NPC sheet template
        └── item-sheet.hbs               # Item sheet template
```

## Character Creation

### Quick Start: Character Creation Wizard

For new players, use the **Character Creation Wizard** for a guided experience:

1. Create a new Character actor
2. Click the **"📋 Character Builder"** button on the character sheet
3. Follow the 5-step wizard:
   - **Step 1**: Name & Ancestry
   - **Step 2**: Distribute 10 Attribute Points
   - **Step 3**: Distribute 10 Skill Points
   - **Step 4**: Choose Equipment & Spells (250 Silver budget)
   - **Step 5**: Review & Create

The wizard automatically validates your choices and creates the character with all items.

### Advanced: Manual Character Sheet

Experienced players can create characters directly on the sheet:

1. Fill in name and ancestry
2. Use the Attributes tab to distribute points
3. Use the Skills tab to pick skills
4. Use the Inventory tab to add weapons/armor
5. Use the Spells tab to add starting spells

### Step 1: Create Character
- Create a new Actor of type "Character"
- Fill in name, ancestry, and religion

### Step 2: Distribute Attributes
- Distribute 10 points among Vigor, Agility, Smarts, and Spirit
- Each starts at 1, max 6

### Step 3: Distribute Skills
- Each character gets 10 skill points
- Distribute among 23 available skills (max 6 per skill)
- Skills use attributes for dice pools (skill level + attribute level)

### Step 4: Add Items
- Create weapons from the Inventory tab
- Add armor pieces for protection
- Add starting spells from the Spells tab

### Step 5: Set Starting Resources
- Default health: Vigor × 5
- Default mana: Spirit × 5
- Can award Focus Tokens from the Attributes tab

## Using the System

### Rolling Dice Pools
1. Click on any skill to roll a dice pool
2. The system automatically:
   - Calculates pool size (skill + attribute)
   - Rolls d6s
   - Explodes 6s
   - Counts successes (4+)

### Combat
1. Weapon attacks use the required skill (Brawl, Long Blades, Ranged, etc.)
2. Attack roll uses Success Threshold of 3 (unless modified)
3. Each success over ST deals 1 additional hit
4. Damage = weapon damage - armor value

### Spells
1. Select a spell to cast
2. System automatically deducts mana
3. Roll uses Spirit + relevant skill (Arcana or Faith)
4. Success threshold determined by spell

### Focus Tokens
- Award tokens from the character sheet
- Spend to reroll or add 1 die to a pool
- Track up to 10 tokens per character

### Rest
- Click "Rest 8 Hours" to fully recover health and mana

## Dice Rolling

The system uses a **Dice Pool** mechanic with **Exploding Dice**:

- Roll a number of d6s equal to (Skill Level + Attribute Level)
- Each die that rolls 6 "explodes" - roll another d6 (cap at 6 explosions per pool)
- Count successes: each die result of 4+ is one success
- Compare successes to Success Threshold

### Success Thresholds
| ST | Difficulty | Example |
|----|-----------|---------|
| 1 | Trivial | Easy task |
| 2 | Easy | Basic task |
| 3-4 | Standard | Common task |
| 5 | Hard | Difficult task |
| 6+ | Legendary | Nearly impossible |

## Creating NPCs/Monsters

1. Create a new Actor of type "NPC"
2. Set attributes (no maximum cap)
3. Add tags to identify type: UNDEAD, VOID, HOLY, DEMONIC, CONSTRUCT
4. Add items (weapons, spells) from the Items tab
5. Can have unlimited skill and attribute levels

## Item Types

### Weapons
- Damage value
- Skill required
- Type (melee/ranged)
- Range (for ranged weapons)

### Armor
- Armor Value (reduces incoming damage)
- Type (light/medium/heavy)
- Can be equipped from character sheet

### Spells
- School (Arcana or Faith)
- Tier (1-3)
- Mana cost
- Success threshold
- Range
- Optional damage

### Equipment
- General items and accessories
- Don't provide statistics default

### Loot/Treasure
- Items for treasure and rewards
- Track quantity

## Macros

You can create macros for common rolls:

```javascript
// Roll a skill
game.actors.getName("Character Name").rollSkill("arcana");

// Roll a weapon attack
game.actors.getName("Character Name").rollAttack("WEAPON_ID");

// Cast a spell
game.actors.getName("Character Name").castSpell("SPELL_ID");

// Rest
game.actors.getName("Character Name").rest();
```

## Configuration

Edit `CONFIG.SPELL_AND_STEEL` in the console to modify:
- Ancestries and their bonuses
- Skills and their attributes
- Success thresholds
- Spell schools and tiers
- Monster tags
- Status effects

## Spell List Integration

The module includes all spells from Spell and Steel core:
- **Arcana T1-T3**: Gust, Arcane Bolt, Fireball, Disintegrate, etc.
- **Faith T1-T3**: Purify, Guiding Bolt, Holy Radiance, Resurrection, etc.

GMs can easily create custom spells using the spell creation interface.

## Known Limitations

- Enchantments are tracked in item descriptions (manual application)
- Combat tracker integration planned for future update
- Opposed rolls require manual setup (player vs player/NPC)

## Future Updates

- [ ] Combat tracker with initiative calculation
- [ ] Automated opposed roll resolution
- [ ] Spell browsing/search
- [ ] Character creation wizard
- [ ] Automated ancestry bonuses
- [ ] Status effect automation
- [ ] Monster generator

## License

This Foundry VTT system module is licensed under the Creative Comrades License Agreement 1.0 (CCLA 1.0).

See [creativecomrades.org](https://creativecomrades.org) for full terms.

**Spell and Steel** is © 2026 by Laine Coulter.

## Credits

- **Game Design**: Laine Coulter
- **Foundry Module**: [Your Name]
- **Art**: John Cichowski, Campaign Cartographer 3+

## Support

For issues or feature requests, please contact:
- Email: mousecamp@proton.me
- Website: mousecamp.com

## System Version

**Spell and Steel v1.0.0** for Foundry VTT v12+
