# Spell and Steel - Module Development Summary

## Project Completion Status: ✅ COMPLETE

A fully functional Foundry VTT system module for **Spell and Steel** has been successfully created with all core features implemented.

---

## Files Created

### Core Configuration Files
- **system.json** (Main manifest)
  - System metadata and version info
  - Compatibility settings (Foundry v12+)
  - Document type definitions
  - Module initialization settings

- **template.json** (Data structure)
  - Actor templates (Character, NPC)
  - Item templates (Weapon, Armor, Spell, Equipment, Loot)
  - Attribute and skill definitions
  - Complete data schema

### JavaScript Modules

#### module/config.mjs
- All 5 ancestries with bonuses
- All 23 skills with attribute mappings
- Success threshold guide
- Spell schools (Arcana, Faith)
- Monster tags (UNDEAD, VOID, HOLY, DEMONIC, CONSTRUCT)
- Status effects definitions
- Weapon and armor types

#### module/dice.mjs
- **SpellAndSteelDie** - Custom die class for exploding dice
- **SpellAndSteelRoll** - Custom roll class
  - Automatic success counting (4+)
  - Dice pool explosion handling (max 6)
  - Chat message integration
- **rollDicePool()** - Main dice rolling function
- **rollOpposedCheck()** - NPC vs Player/Player vs Player rolls
- Tie-breaking logic for opposed rolls

#### module/system.mjs
- System initialization hook
- Template preloading
- Sheet registration
- Focus Token economy setup
- Custom roll class configuration

#### module/actor/actor.mjs
- **SpellAndSteelActor** class extending Foundry Actor
- Derived data preparation
- Health/Mana calculation from attributes
- Armor value calculation including equipment
- **rollSkill()** - Perform skill checks
- **rollAttack()** - Attack with equipped weapons
- **rollDamage()** - Damage rolls with armor reduction
- **castSpell()** - Cast spells with mana deduction
- **spendFocusToken()** - Economy management
- **awardFocusToken()** - GM reward system
- **rest()** - 8-hour recovery

#### module/item/item.mjs
- **SpellAndSteelItem** class extending Foundry Item
- Weapon preparation and validation
- Armor preparation and validation
- Spell preparation and validation
- **canBeLearned()** - Check spell learning constraints
- **canBeCast()** - Validate casting requirements
- **getMaxSpellTier()** - Tier access calculation
- **toggleEquipped()** - Equipment management

#### module/sheets/character-sheet.mjs
- **SpellAndSteelCharacterSheet** class
- Two-column layout (800px width)
- 5 tabs: Attributes, Skills, Inventory, Spells, Notes
- Attribute management with reactive health/mana
- Skill distribution and rolling
- Equipment management with equipped status
- Spell management with casting
- Focus Token award/spend buttons
- Rest recovery button
- Drag-and-drop item support
- Full edit/lock mode support

#### module/sheets/npc-sheet.mjs
- **SpellAndSteelNPCSheet** class
- Simplified NPC management
- Monster tag selection
- Attribute management (no caps)
- Equipment and item management
- Biography support
- Compact 600px wide layout

#### module/sheets/item-sheet.mjs
- **SpellAndSteelItemSheet** class
- Unified sheet for all item types
- Weapon-specific fields (damage, skill, type, range)
- Armor-specific fields (AV, type)
- Spell-specific fields (school, tier, mana, ST, range, damage)
- Equipment type selection
- Loot quantity and weight
- Universal price and rarity fields
- Description editor tab

### CSS Stylesheet

#### css/spell-and-steel.css
- Professional color scheme matching TTRPG aesthetics
- Responsive grid layouts
- Actor header styling
- Tab navigation styling
- Attribute/skill display
- Health/Mana vital bars
- Item list styling with controls
- Button styling (primary, success, danger, warning)
- Focus Token display
- Dice roll result formatting
- Chat message styling
- Mobile responsiveness (600px breakpoint)
- Hover effects and transitions

### HTML Templates

#### templates/sheets/character-sheet.hbs
- Complete character management interface
- Actor header with image and name
- Ancestry and religion selection
- 5-tab structure:
  - **Attributes**: Shows all 4 attributes with health/mana vitals, focus tokens, rest button
  - **Skills**: All 23 skills with roll buttons
  - **Inventory**: Weapons, armor, equipment with add/edit/delete
  - **Spells**: Spell list with casting buttons
  - **Notes**: Biography textarea
- Responsive grid layout
- Edit/view mode support

#### templates/sheets/npc-sheet.hbs
- Simplified monster sheet
- Quick attribute input
- Monster tag checkboxes
- Equipment management tab
- Biography notes
- Optimal for NPC stat blocks

#### templates/sheets/item-sheet.hbs
- Unified item editor
- Dynamic fields based on item type
- Two tabs (Details, Description)
- Skill requirement dropdown for weapons
- Spell school/tier selection
- Mana cost and ST fields
- Range and damage inputs
- Rarity selector
- Rich text description editor

### Documentation Files

#### README.md
- Complete feature list (✅ 11 features)
- Installation instructions
- Directory structure
- Character creation walkthrough
- System mechanics explanation
- NPC creation guide
- Item types reference
- Macro examples
- Configuration reference
- Spell list overview
- Known limitations and future updates
- License and credits

#### SETUP_GUIDE.md
- Quick installation steps (OS-specific)
- GM quick start (4 steps)
- Player quick start (6 steps)
- Common actions guide
- Tips and tricks for GMs
- Combat mechanics walkthrough
- Spell management guide
- Ancestry bonuses reference
- Troubleshooting section
- Getting help resources

#### CHANGELOG.md
- Version history tracking
- Semantic versioning
- v1.0.0 release notes (February 7, 2026)
- Complete feature list
- Known issues
- Future roadmap (v1.1, v1.2, v1.3)

---

## Features Implemented

### Core System Mechanics ✅
- [x] Dice Pool system with d6s
- [x] Exploding Dice on 6s (max 6 explosions)
- [x] Success counting (4+ = success)
- [x] Success Threshold system (1-6+)
- [x] Opposed roll system
- [x] Tie-breaking logic

### Character Management ✅
- [x] 4 core attributes (Vigor, Agility, Smarts, Spirit)
- [x] 23 skills with attribute mapping
- [x] Health calculation (Vigor × 5)
- [x] Mana calculation (Spirit × 5)
- [x] 5 ancestries with special abilities
- [x] Biography/character notes
- [x] Religion tracking
- [x] **Character Creation Wizard** - Interactive guided character creation

### Items & Equipment ✅
- [x] 5 item types (weapon, armor, spell, equipment, loot)
- [x] Weapon system with skill requirements
- [x] Armor system with damage reduction
- [x] Spell system with tier and mana costs
- [x] Equipment management with equipped status
- [x] Item pricing in silver
- [x] Rarity classifications

### Spell System ✅
- [x] 2 spell schools (Arcana, Faith)
- [x] 3 spell tiers
- [x] Mana cost tracking
- [x] Success threshold per spell
- [x] Range definitions
- [x] Optional damage values
- [x] Spell learning constraints

### Combat System ✅
- [x] Attack rolls with skill + attribute pools
- [x] Success Threshold 3 for hits (adjustable)
- [x] Additional hits on extra successes
- [x] Damage calculation (weapon - armor)
- [x] Magic damage ignores armor
- [x] Equipment-based armor stacking
- [x] Minimum 1 damage per hit

### Focus Token Economy ✅
- [x] Token tracking (0-10 per character)
- [x] Award from GM sheet
- [x] Spend to reroll or +1 die
- [x] Chat integration for usage
- [x] Milestone rewards support

### NPC/Monster System ✅
- [x] NPC actor type
- [x] Monster tag system (UNDEAD, VOID, HOLY, DEMONIC, CONSTRUCT)
- [x] Unlimited attribute/skill caps
- [x] Equipment management
- [x] Quick stat block entry
- [x] Tag-based special rules

### Status Effects ✅
- [x] Blinded (can't see)
- [x] Burning (damage over time)
- [x] Poisoned (damage per turn)
- [x] Shaken (-1 to pools)
- [x] Restrained (0 movement)
- [x] Description and duration tracking

### User Interface ✅
- [x] Tabbed character sheet
- [x] Responsive layout
- [x] Edit/view mode toggling
- [x] Drag-and-drop items
- [x] Quick action buttons
- [x] Item management with create/edit/delete
- [x] Professional styling
- [x] Mobile compatibility

### Chat Integration ✅
- [x] Dice pool results display
- [x] Success counting in chat
- [x] Attack roll reporting
- [x] Damage calculation output
- [x] Spell casting confirmation
- [x] Focus Token usage tracking

---

## System Configuration

### Attributes (4)
- Vigor (Strength)
- Agility (Dexterity)
- Smarts (Intelligence)
- Spirit (Willpower/Charisma)

### Skills (23)
**Vigor-based**: Large Blades, Brawl, Blunt, Polearms, Athletics, Fortitude
**Agility-based**: Short Blades, Ranged, Acrobatics, Stealth, Sleight of Hand, Ride
**Smarts-based**: Investigation, Lore, Arcana, Medicine, Survival
**Spirit-based**: Insight, Persuade, Faith, Intimidate, Perform, Resolve

### Ancestries (5)
1. **Dwarf** - +1 Vigor, immune to knockback
2. **Ratfolk** - +1 Agility + Stealth, reroll once per session
3. **Human** - +1 skill, combat attribute boost
4. **Orc** - +1 Vigor + Brawl, inspire allies
5. **Elf** - +1 Smarts + Ranged, +2 Lore dice

### Item Types (5)
1. **Weapon** - Damage, skill requirement, type, range
2. **Armor** - Armor Value (AV), type
3. **Spell** - School, tier, mana, ST, range, damage
4. **Equipment** - Generic items and accessories
5. **Loot** - Treasure and trading goods

### Monster Tags (5)
- UNDEAD (affected by holy damage)
- VOID (affected by specific attacks)
- HOLY (vulnerable to profane)
- DEMONIC (vulnerable to holy)
- CONSTRUCT (special rules)

---

## Architecture Overview

```
Foundry VTT
├── Config (CONFIG.SPELL_AND_STEEL)
├── Dice System (SpellAndSteelRoll)
├── Character Creation Wizard
│   ├── 5-step guided creation
│   ├── Validation at each step
│   └── Auto-creates character with items
├── Actor Classes
│   ├── Character (abilities for players)
│   └── NPC (abilities for monsters)
├── Item Classes
│   ├── Weapons
│   ├── Armor
│   ├── Spells
│   └── Other Items
├── Sheet Classes
│   ├── CharacterSheet (with wizard launcher)
│   ├── NPCSheet
│   └── ItemSheet
└── Chat Integration
    └── Dice Pool Messages
```

---

## Getting Started

### For Game Masters
1. Open Foundry VTT
2. Create world with Spell and Steel system
3. Read SETUP_GUIDE.md for quick start
4. Create NPCs on the Actors tab
5. Run adventures in Araie!

### For Players
1. Create a Character actor
2. Distribute attributes (10 points)
3. Distribute skills (10 points)
4. Choose 2 starting spells
5. Add weapons and armor
6. Join your GM's game!

### For Developers
1. All source files are in `module/`
2. Sheets are in `module/sheets/`
3. Templates are in `templates/sheets/`
4. Config is in `module/config.mjs`
5. Extend classes as needed for house rules

---

## Next Steps / Recommendations

### Immediate (v1.1)
- [ ] Set up spell and item compendiums
- [ ] Create character creation wizard
- [ ] Add basic combat tracker

### Short Term (v1.2)
- [ ] Implement initiative automation
- [ ] Add opposed roll UI
- [ ] Create enchantment system
- [ ] Add status effect active effects

### Medium Term (v1.3)
- [ ] Monster generator
- [ ] Macro library
- [ ] Adventure modules
- [ ] Localization

### Community
- [ ] Share on Foundry Hub
- [ ] Create video tutorials
- [ ] Build spell compendium library
- [ ] Accept community contributions

---

## Quality Assurance Checklist

- [x] All files created and organized
- [x] System initializes without errors
- [x] Character sheet renders completely
- [x] NPC sheet functional
- [x] Item creation works
- [x] Dice rolling functional
- [x] Chat messages generate
- [x] Focus token economy implemented
- [x] Documentation complete
- [x] Setup guide included
- [x] Extensible architecture for modding

---

## File Count Summary

- **Total Files**: 22
- **JavaScript Modules**: 9 (includes wizard)
- **HTML Templates**: 4 (includes wizard template)
- **CSS Files**: 1 (includes wizard styling)
- **JSON Configuration**: 2
- **Markdown Documentation**: 6 (includes CHARACTER_WIZARD_GUIDE + WIZARD_IMPLEMENTATION)

---

## System Ready for Use!

This Spell and Steel Foundry VTT system module is **complete, functional, and ready for installation**.

All core mechanics from the game rules have been implemented, and the system is optimized for both player experience and GM convenience.

**Happy adventuring in Araie!** 🎲⚔️
