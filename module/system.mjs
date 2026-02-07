/**
 * Spell and Steel System for Foundry VTT
 * Main initialization file
 */

import { SPELL_AND_STEEL } from "./config.mjs";
import { SpellAndSteelRoll, rollDicePool } from "./dice.mjs";
import SpellAndSteelActor from "./actor/actor.mjs";
import SpellAndSteelItem from "./item/item.mjs";
import SpellAndSteelCharacterSheet from "./sheets/character-sheet.mjs";
import SpellAndSteelNPCSheet from "./sheets/npc-sheet.mjs";
import SpellAndSteelItemSheet from "./sheets/item-sheet.mjs";
import CharacterCreationWizard from "./wizard/character-wizard.mjs";

const systemID = "spell-and-steel";

Hooks.once("init", async () => {
  console.log("Spell and Steel | Initializing the Spell and Steel System");

  // Assign custom classes and constants to the global scope
  CONFIG.SPELL_AND_STEEL = SPELL_AND_STEEL;
  CONFIG.Actor.documentClass = SpellAndSteelActor;
  CONFIG.Item.documentClass = SpellAndSteelItem;

  // Register sheet classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(systemID, SpellAndSteelCharacterSheet, { types: ["character"], makeDefault: true });
  Actors.registerSheet(systemID, SpellAndSteelNPCSheet, { types: ["npc"], makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(systemID, SpellAndSteelItemSheet, { types: ["weapon", "spell", "armor", "equipment", "loot"], makeDefault: true });

  // Register the custom Roll class for Spell and Steel
  CONFIG.Dice.rolls[0] = SpellAndSteelRoll;

  // Preload templates
  return preloadHandlebarsTemplates();
});

Hooks.once("ready", () => {
  console.log("Spell and Steel | System ready!");
  
  // Add Focus Token economy info
  game.spellAndSteel = {
    rollDicePool,
    config: SPELL_AND_STEEL,
    CharacterCreationWizard
  };
});

/**
 * Preload template files
 */
async function preloadHandlebarsTemplates() {
  return loadTemplates([
    // Character sheet
    `systems/${systemID}/templates/sheets/character-sheet.hbs`,
    `systems/${systemID}/templates/sheets/character-attributes.hbs`,
    `systems/${systemID}/templates/sheets/character-skills.hbs`,
    `systems/${systemID}/templates/sheets/character-inventory.hbs`,
    `systems/${systemID}/templates/sheets/character-spells.hbs`,
    
    // NPC sheet
    `systems/${systemID}/templates/sheets/npc-sheet.hbs`,
    
    // Item sheets
    `systems/${systemID}/templates/sheets/weapon-sheet.hbs`,
    `systems/${systemID}/templates/sheets/spell-sheet.hbs`,
    `systems/${systemID}/templates/sheets/armor-sheet.hbs`,
    `systems/${systemID}/templates/sheets/equipment-sheet.hbs`,
    `systems/${systemID}/templates/sheets/loot-sheet.hbs`,
    
    // Partials
    `systems/${systemID}/templates/partials/actor-header.hbs`,
    `systems/${systemID}/templates/partials/actor-tabs.hbs`,
    `systems/${systemID}/templates/partials/skill-row.hbs`,
    `systems/${systemID}/templates/partials/item-row.hbs`,
  ]);
}

/**
 * Handle socket events for synchronized actions
 */
Hooks.on("createActor", (actor) => {
  console.log(`Spell and Steel | Actor created: ${actor.name}`);
});

Hooks.on("createItem", (item) => {
  console.log(`Spell and Steel | Item created: ${item.name}`);
});

/**
 * Make SpellAndSteelRoll and wizard available for macros
 */
globalThis.rollDicePool = rollDicePool;
globalThis.SpellAndSteelRoll = SpellAndSteelRoll;
globalThis.CharacterCreationWizard = CharacterCreationWizard;
globalThis.openCharacterWizard = () => {
  new CharacterCreationWizard().render(true);
};

export default {
  SPELL_AND_STEEL,
  SpellAndSteelRoll,
  SpellAndSteelActor,
  SpellAndSteelItem,
  SpellAndSteelCharacterSheet,
  SpellAndSteelNPCSheet,
  SpellAndSteelItemSheet,
  CharacterCreationWizard
};
