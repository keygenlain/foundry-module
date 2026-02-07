/**
 * Spell and Steel Actor Document
 */
export default class SpellAndSteelActor extends Actor {
  /**
   * Calculate derived data for the actor
   */
  prepareData() {
    super.prepareData();
    this.prepareDerivedData();
  }

  /**
   * Prepare derived data for the actor
   */
  prepareDerivedData() {
    if (this.type === "character") this.prepareCharacterData();
    else if (this.type === "npc") this.prepareNPCData();
  }

  /**
   * Prepare character-type data
   */
  prepareCharacterData() {
    const data = this.system;

    // Update health based on Vigor
    if (data.attributes && data.attributes.vigor) {
      data.health.max = data.attributes.vigor.value * 5;
    }

    // Update mana based on Spirit
    if (data.attributes && data.attributes.spirit) {
      data.mana.max = data.attributes.spirit.value * 5;
    }

    // Ensure health and mana don't exceed max
    if (data.health.value > data.health.max) {
      data.health.value = data.health.max;
    }
    if (data.mana.value > data.mana.max) {
      data.mana.value = data.mana.max;
    }
  }

  /**
   * Prepare NPC-type data
   */
  prepareNPCData() {
    const data = this.system;

    // Update health based on Vigor
    if (data.attributes && data.attributes.vigor) {
      data.health.max = data.attributes.vigor.value * 5;
    }

    // Update mana based on Spirit
    if (data.attributes && data.attributes.spirit) {
      data.mana.max = data.attributes.spirit.value * 5;
    }
  }

  /**
   * Get the full Armor Value including equipment
   */
  getArmorValue() {
    let av = this.system.armor || 0;
    
    // Add armor from equipped items
    this.items
      .filter(item => item.type === "armor" && item.system.properties?.equipped)
      .forEach(armor => {
        av += armor.system.armor?.value || 0;
      });

    return av;
  }

  /**
   * Roll for this actor using a given skill
   */
  async rollSkill(skillKey, options = {}) {
    const skill = this.system.skills[skillKey];
    if (!skill) {
      ui.notifications.error(`Skill ${skillKey} not found`);
      return null;
    }

    const attributeKey = skill.attribute;
    const attribute = this.system.attributes[attributeKey];

    const diceCount = (skill.value || 0) + (attribute?.value || 0);
    
    const { rollDicePool } = await import("../dice.mjs");
    return rollDicePool(diceCount, `${this.name} - ${skill.label}`, {
      actor: this,
      ...options
    });
  }

  /**
   * Roll an attack with a weapon
   */
  async rollAttack(weaponId, options = {}) {
    const weapon = this.items.get(weaponId);
    if (!weapon || weapon.type !== "weapon") {
      ui.notifications.error("Invalid weapon");
      return null;
    }

    const skillKey = weapon.system.skillRequired || "brawl";
    const skill = this.system.skills[skillKey];
    if (!skill) {
      ui.notifications.error(`Skill ${skillKey} not found`);
      return null;
    }

    const attributeKey = skill.attribute;
    const attribute = this.system.attributes[attributeKey];

    const diceCount = (skill.value || 0) + (attribute?.value || 0);

    const { rollDicePool } = await import("../dice.mjs");
    const roll = await rollDicePool(diceCount, `${this.name} attacks with ${weapon.name}`, {
      actor: this,
      weapon: weapon.id,
      ...options
    });

    return roll;
  }

  /**
   * Roll damage for a weapon
   */
  async rollDamage(weaponId) {
    const weapon = this.items.get(weaponId);
    if (!weapon || weapon.type !== "weapon") {
      ui.notifications.error("Invalid weapon");
      return null;
    }

    const damage = weapon.system.quantities?.damage || 1;
    const roll = new Roll(`${damage}`);
    await roll.evaluate();

    const speaker = ChatMessage.getSpeaker({ actor: this });
    const content = `
      <div class="damage-roll">
        <h3>${this.name} deals damage with ${weapon.name}</h3>
        <p><strong>Damage:</strong> ${roll.total}</p>
      </div>
    `;

    await ChatMessage.create({
      speaker,
      content,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      roll: roll.toJSON()
    });

    return roll;
  }

  /**
   * Cast a spell
   */
  async castSpell(spellId, options = {}) {
    const spell = this.items.get(spellId);
    if (!spell || spell.type !== "spell") {
      ui.notifications.error("Invalid spell");
      return null;
    }

    // Check mana
    if (this.system.mana.value < spell.system.manaCost) {
      ui.notifications.error("Not enough mana");
      return null;
    }

    const skillKey = spell.system.spellType === "arcana" ? "arcana" : "faith";
    const skill = this.system.skills[skillKey];
    const attribute = this.system.attributes.spirit;

    const diceCount = (skill?.value || 0) + (attribute?.value || 0);

    const { rollDicePool } = await import("../dice.mjs");
    const roll = await rollDicePool(diceCount, `${this.name} casts ${spell.name}`, {
      actor: this,
      spell: spell.id,
      ...options
    });

    // Deduct mana
    if (roll.rolled) {
      await this.update({
        "system.mana.value": Math.max(0, this.system.mana.value - spell.system.manaCost)
      });
    }

    return roll;
  }

  /**
   * Spend a Focus Token
   */
  async spendFocusToken() {
    if (this.system.resources?.focusTokens?.value > 0) {
      await this.update({
        "system.resources.focusTokens.value": this.system.resources.focusTokens.value - 1
      });
      return true;
    }
    ui.notifications.error("No Focus Tokens available");
    return false;
  }

  /**
   * Award a Focus Token
   */
  async awardFocusToken() {
    const current = this.system.resources?.focusTokens?.value || 0;
    const max = this.system.resources?.focusTokens?.max || 10;
    
    if (current < max) {
      await this.update({
        "system.resources.focusTokens.value": current + 1
      });
      return true;
    }
    ui.notifications.warn("Focus Token maximum reached");
    return false;
  }

  /**
   * Rest and recover health and mana
   */
  async rest() {
    await this.update({
      "system.health.value": this.system.health.max,
      "system.mana.value": this.system.mana.max
    });

    const speaker = ChatMessage.getSpeaker({ actor: this });
    const content = `<p>${this.name} rests and recovers fully.</p>`;
    await ChatMessage.create({ speaker, content });
  }
}
