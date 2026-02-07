/**
 * Spell and Steel Item Document
 */
export default class SpellAndSteelItem extends Item {
  prepareData() {
    super.prepareData();
    this.prepareDerivedData();
  }

  prepareDerivedData() {
    if (this.type === "weapon") this.prepareWeapon();
    else if (this.type === "armor") this.prepareArmor();
    else if (this.type === "spell") this.prepareSpell();
  }

  /**
   * Prepare weapon data
   */
  prepareWeapon() {
    const data = this.system;
    // Weapons have basic damage values set in the data
  }

  /**
   * Prepare armor data
   */
  prepareArmor() {
    const data = this.system;
    // Armor values are set in the data
  }

  /**
   * Prepare spell data
   */
  prepareSpell() {
    const data = this.system;
    // Verify that mana cost and tier are valid
    if (data.tier < 1) data.tier = 1;
    if (data.tier > 3) data.tier = 3;
  }

  /**
   * Get the skill required to use this weapon
   */
  getRequiredSkill() {
    if (this.type !== "weapon") return null;
    return this.system.skillRequired;
  }

  /**
   * Get the damage of this weapon
   */
  getDamage() {
    if (this.type !== "weapon" && this.type !== "spell") return 0;
    return this.system.quantities?.damage ?? this.system.damage ?? 0;
  }

  /**
   * Get the armor value of this piece
   */
  getArmorValue() {
    if (this.type !== "armor") return 0;
    return this.system.armor?.value ?? 0;
  }

  /**
   * Toggle equipped status
   */
  toggleEquipped() {
    if (this.type === "weapon" || this.type === "armor" || this.type === "equipment") {
      const equipped = this.system.properties?.equipped ?? false;
      return this.update({ "system.properties.equipped": !equipped });
    }
  }

  /**
   * Check if this spell can be learned/cast
   */
  canBeLearned(actor, skillLevel, spiritAttribute) {
    if (this.type !== "spell") return false;

    const spellSchool = this.system.spellType;
    const skillKey = spellSchool === "arcana" ? "arcana" : "faith";
    const skill = actor.system.skills[skillKey];

    const maxSpells = Math.ceil(((skill?.value || 0) + spiritAttribute) * 1.5);
    const currentSpells = actor.items.filter(
      item => item.type === "spell" && item.system.spellType === spellSchool
    ).length;

    return currentSpells < maxSpells;
  }

  /**
   * Check if the actor can cast this spell
   */
  canBeCast(actor) {
    if (this.type !== "spell") return false;

    // Check mana
    if (actor.system.mana.value < this.system.manaCost) {
      return false;
    }

    // Check spell tier against skill level
    const spellSchool = this.system.spellType;
    const skillKey = spellSchool === "arcana" ? "arcana" : "faith";
    const skill = actor.system.skills[skillKey];
    const maxTier = this.getMaxSpellTier(skill?.value || 0);

    return this.system.tier <= maxTier;
  }

  /**
   * Get maximum spell tier based on skill level
   */
  getMaxSpellTier(skillLevel) {
    if (skillLevel <= 2) return 1;
    if (skillLevel <= 4) return 2;
    return 3;
  }
}
