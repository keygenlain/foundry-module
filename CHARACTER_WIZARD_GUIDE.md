# Character Creation Wizard - User Guide

## Overview

The **Character Creation Wizard** is an interactive, step-by-step guide that walks new players through creating a Spell and Steel character. It's designed to be intuitive and prevent common mistakes.

## Accessing the Wizard

### Method 1: From Character Sheet (Recommended)
1. Create a new Actor of type "Character"
2. On the character sheet, click the **"📋 Character Builder"** button
3. The wizard window will open

### Method 2: Using Macro
Create a macro with the following command:
```javascript
openCharacterWizard()
```

## The 5 Steps

### Step 1: Basic Information

**What to do:**
- Enter your character's **name** (required)
- Choose an **ancestry** from the dropdown

**Why it matters:**
- Your name identifies your character
- Your ancestry provides attribute and skill bonuses

**Ancestries available:**
- **Dwarf**: +1 Vigor, immune to knockback
- **Ratfolk**: +1 Agility + Stealth, reroll once per session
- **Human**: +1 to any skill, combat attribute boost
- **Orc**: +1 Vigor + Brawl, inspire allies
- **Elf**: +1 Smarts + Ranged, +2 Lore dice

**Tips:**
- Choose an ancestry that matches your character concept
- You can change this later on the character sheet

---

### Step 2: Attributes

**You have 10 points to distribute** among 4 attributes (each starts at 1, max 6)

**The Four Attributes:**

1. **Vigor** - Strength and Endurance
   - Used for: Large/Short Blades, Brawl, Blunt, Polearms, Athletics, Fortitude
   - Determines Health (Vigor × 5)

2. **Agility** - Dexterity and Reflexes
   - Used for: Ranged, Acrobatics, Stealth, Sleight of Hand, Ride
   - Affects Initiative

3. **Smarts** - Intelligence and Wits
   - Used for: Investigation, Lore, Arcana, Medicine, Survival
   - Key for skilled characters

4. **Spirit** - Willpower and Charisma
   - Used for: Insight, Persuade, Faith, Intimidate, Perform, Resolve
   - Determines Mana (Spirit × 5)

**How to distribute points:**
- Click the **+** button to add a point (if you have points remaining)
- Click the **−** button to remove a point
- You must spend exactly 10 points (the wizard won't let you proceed until you do)

**Tips:**
- Balanced builds: 3-3-2-2 (versatile character)
- Combat-focused: 4-3-2-1 (strong in physical skills)
- Magic-focused: 2-1-3-4 (mage character)
- Social character: 2-1-2-5 (charismatic)

---

### Step 3: Skills

**You have 10 points to distribute** among 23 available skills (max 6 per skill)

**How Skills Work:**
- Each skill is tied to an attribute
- Your dice pool = Skill Level + Attribute Level
- Example: If you have Arcana 3 and Smarts 4, you roll 7 dice for spellcasting

**The 23 Skills:**

**Combat Skills (Vigor-based):**
- Large Blades, Short Blades, Brawl, Long Blades, Blunt, Polearms
- Fortitude

**Ranged Skills (Agility-based):**
- Ranged, Acrobatics, Stealth, Sleight of Hand, Ride

**Knowledge Skills (Smarts-based):**
- Investigation, Lore, Arcana, Medicine, Survival

**Social Skills (Spirit-based):**
- Insight, Persuade, Faith, Intimidate, Perform, Resolve

**Athletics (Vigor-based):**
- Athletics (general physical activity)

**How to distribute points:**
- Type the number directly or use + and − buttons
- You must distribute exactly 10 points
- Max 6 in any single skill

**Tips:**
- Focus on 3-5 key skills for your character concept
- Don't spread points too thin
- Consider what your party needs (someone shouldspecialize in Arcana, someone in Medicine, etc.)
- Example Fighter: Brawl 4, Long Blades 3, Athletics 2, Fortitude 1
- Example Wizard: Arcana 4, Lore 3, Investigation 2, Insight 1

---

### Step 4: Equipment & Spells

**Budget: 250 Silver**

This step is divided into two parts:

#### Part A: Equipment Selection

Choose weapons and armor from the list:

**Weapons:**
- Shortsword (50) - balanced melee weapon
- Dagger (25) - light, cheap backup weapon
- Longsword (100) - strong melee weapon
- Greatsword (250) - massive two-handed weapon
- Shortbow (50) - ranged light weapon
- Longbow (100) - ranged powerful weapon
- Mace (30) - blunt weapon
- Spear (40) - reach weapon

**Armor:**
- Helm (50) - AV 1 head protection
- Breastplate (100) - AV 2 torso protection
- Pauldrons (50) - AV 1 shoulder protection
- Greaves (50) - AV 1 leg protection
- Gauntlets (50) - AV 1 hand protection

**Tips:**
- You don't have to spend all 250 Silver (leftover becomes starting cash)
- Mix weapons and armor based on your skills
- Light armor is better for high Agility characters
- Heavy armor is better for high Vigor characters
- Most characters should have at least one melee weapon and some armor

**Example loadouts:**

*Fighter (100 Silver):*
- Longsword (100)
- Remaining: 150 Silver

*Ranger (100 Silver):*
- Shortbow (50)
- Shortsword (50)
- Remaining: 150 Silver

*Armored Knight (200 Silver):*
- Longsword (100)
- Breastplate (100)
- Remaining: 50 Silver

#### Part B: Starting Spells

**Choose exactly 2 spells** from the list:

**Arcana Spells (Magic):**
- **Arcane Bolt** - Damage spell, 3 mana
- **Mage Light** - Utility light spell, 1 mana
- **Gust** - Knockback spell, 3 mana
- **Mirror Image** - Defense spell, 4 mana
- **Frost Touch** - Melee frost damage, 4 mana
- **Cinder Snap** - AOE fire, 2 mana

**Faith Spells (Divine):**
- **Purify** - Remove negative effects, 3 mana
- **Mending Word** - Healing spell, 3 mana
- **Guiding Bolt** - Damage + buff ally, 4 mana
- **Curse** - Debuff enemy, 4 mana

**Tips:**
- Pick spells that complement your skills
- Balance offense and utility
- You can learn more spells after character creation
- Ask your GM if you're unsure

---

### Step 5: Review & Create

**What this does:**
- Shows a summary of your character
- Displays all attributes, health, mana
- Lists your top skills
- Shows selected equipment and spells
- Remaining silver

**Review Points:**
- Check that everything looks correct
- Verify your health and mana calculations
- Make sure you have equipment and spells

**If something is wrong:**
- Click **← Previous** to go back and fix it
- The wizard will help you step through again

**When ready:**
- Click **"Create Character"** button
- Your character will be created instantly
- The character sheet will open automatically

## Common Issues

### "You must distribute exactly 10 attribute points!"

**Problem:** You haven't spent all your attribute points on Step 2

**Solution:** 
- Add more points using the + buttons
- Make sure the total reaches 10
- Click Next when the count shows 10/10

### "You must distribute exactly 10 skill points!"

**Problem:** You haven't spent all your skill points on Step 3

**Solution:**
- Add more points to skills using the input fields
- Make sure the total reaches 10
- The indicator shows "Skill Points Remaining: 0/10" when done

### "Please select exactly 2 starting spells!"

**Problem:** You selected too many or too few spells on Step 4

**Solution:**
- Uncheck spells you don't want
- Check exactly 2 spells
- The counter shows "Spells Selected: 2 / 2" when done

### "Not enough Silver for this item!"

**Problem:** The item costs more than your remaining budget

**Solution:**
- Uncheck more expensive items
- Choose cheaper equipment
- You can buy more equipment after creation

## After Character Creation

Once your character is created:

1. **The wizard closes** and your character sheet opens
2. **Review your character** - double-check all values
3. **You can make edits** - any values can be changed on the sheet
4. **Add more items** - click "+ Add" in the Inventory tab
5. **Learn more spells** - you can add more spells in the Spells tab
6. **Join the game** - your character is ready!

## Tips for Success

✅ **DO:**
- Take your time with each step
- Imagine your character's concept before choosing attributes/skills
- Ask the GM about optimal builds for your group
- Think about what your party needs (healer, fighter, rogue, etc.)
- Review your character after creation

❌ **DON'T:**
- Spread points too thin across many skills
- Ignore your attribute bonuses when planning skills
- Be afraid to restart if you made a mistake
- Skip reading the recommendations in each step

## Restarting Character Creation

If you made a mistake or want to try again:

1. Delete the character (right-click Delete in Actors)
2. Create a new Character actor
3. Click the Character Builder button again
4. The wizard starts fresh

Or you can:

1. Use the character sheet directly
2. Edit values manually
3. Delete items and add new ones
4. Change attributes and skills

The wizard is just a guide—you have full control over your character at any time!

## Getting Help

- **In-Game:** Ask your GM for advice
- **Character Sheet:** Hover over labels for tooltips
- **Wizard Tips:** Each step has a 💡 tip section
- **Rules:** See the SETUP_GUIDE.md for more information

---

**You're ready to adventure in Araie!** 🎲⚔️
