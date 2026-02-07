/**
 * Character Sheet for Spell and Steel
 */
import CharacterCreationWizard from "../wizard/character-wizard.mjs";

export default class SpellAndSteelCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["spell-and-steel", "sheet", "actor"],
      template: "systems/spell-and-steel/templates/sheets/character-sheet.hbs",
      width: 720,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }],
      dragDrop: [
        { dragSelector: ".item-list .item", dropSelector: ".inventory" },
        { dragSelector: ".spell-list .item", dropSelector: ".spellbook" }
      ]
    });
  }

  get template() {
    if (!game.user.isGM && this.actor.limited) {
      return "systems/spell-and-steel/templates/sheets/limited-sheet.hbs";
    }
    return this.options.template;
  }

  async getData() {
    const source = this.actor.toObject(false);
    const actorData = this.actor.toObject(false);

    const data = {
      actor: this.actor,
      source: source,
      system: actorData.system,
      items: this.actor.items.map(item => ({
        ...item.toObject(false),
        id: item.id,
        sort: item.sort
      })),
      effects: Array.from(this.actor.effects.values()),
      owner: this.actor.isOwner,
      limited: this.actor.limited,
      options: this.options,
      editable: this.isEditable,
      cssClass: this.actor.isOwner ? "editable" : "locked",
      config: CONFIG.SPELL_AND_STEEL,
      attributes: this.getAttributeData(),
      skills: this.getSkillData(),
      weapons: this.getWeapons(),
      spells: this.getSpells(),
      armor: this.getArmor()
    };

    return data;
  }

  getAttributeData() {
    const attrs = this.actor.system.attributes;
    return Object.entries(attrs).map(([key, attr]) => ({
      key,
      label: CONFIG.SPELL_AND_STEEL.attributes[key]?.label || key,
      value: attr.value,
      max: attr.max
    }));
  }

  getSkillData() {
    const skills = this.actor.system.skills;
    return Object.entries(skills).map(([key, skill]) => ({
      key,
      ...skill
    }));
  }

  getWeapons() {
    return this.actor.items.filter(item => item.type === "weapon");
  }

  getSpells() {
    return this.actor.items.filter(item => item.type === "spell");
  }

  getArmor() {
    return this.actor.items.filter(item => item.type === "armor");
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Wizard button
    html.find(".open-wizard").click(ev => {
      ev.preventDefault();
      new CharacterCreationWizard().render(true);
    });

    // Attribute input
    html.find(".attribute-input").change(ev => this.onAttributeChange(ev));

    // Skill input
    html.find(".skill-input").change(ev => this.onSkillChange(ev));

    // Item buttons
    html.find(".item-create").click(ev => this.onItemCreate(ev));
    html.find(".item-edit").click(ev => this.onItemEdit(ev));
    html.find(".item-delete").click(ev => this.onItemDelete(ev));
    html.find(".item-equipped").click(ev => this.onToggleEquipped(ev));

    // Roll buttons
    html.find(".skill-roll").click(ev => this.onSkillRoll(ev));
    html.find(".weapon-roll").click(ev => this.onWeaponRoll(ev));
    html.find(".spell-cast").click(ev => this.onSpellCast(ev));

    // Focus Token buttons
    html.find(".award-focus").click(() => this.actor.awardFocusToken());
    html.find(".spend-focus").click(() => this.actor.spendFocusToken());

    // Rest button
    html.find(".rest").click(() => this.actor.rest());

    // Health/Mana inputs
    html.find(".health-input").change(ev => this.onHealthChange(ev));
    html.find(".mana-input").change(ev => this.onManaChange(ev));
  }

  onAttributeChange(event) {
    const input = event.currentTarget;
    const attrKey = input.dataset.attribute;
    const value = parseInt(input.value) || 0;
    
    this.actor.update({
      [`system.attributes.${attrKey}.value`]: value
    });
  }

  onSkillChange(event) {
    const input = event.currentTarget;
    const skillKey = input.dataset.skill;
    const value = parseInt(input.value) || 0;

    this.actor.update({
      [`system.skills.${skillKey}.value`]: value
    });
  }

  onHealthChange(event) {
    const value = parseInt(event.currentTarget.value) || 0;
    this.actor.update({ "system.health.value": value });
  }

  onManaChange(event) {
    const value = parseInt(event.currentTarget.value) || 0;
    this.actor.update({ "system.mana.value": value });
  }

  async onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget.dataset;
    const type = header.type;
    const itemData = {
      name: `New ${type}`,
      type: type,
      system: {}
    };

    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }

  onItemEdit(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);
    item?.sheet.render(true);
  }

  onItemDelete(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    this.actor.deleteEmbeddedDocuments("Item", [itemId]);
  }

  async onToggleEquipped(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);
    item?.toggleEquipped();
  }

  async onSkillRoll(event) {
    event.preventDefault();
    const skillKey = event.currentTarget.dataset.skill;
    this.actor.rollSkill(skillKey);
  }

  async onWeaponRoll(event) {
    event.preventDefault();
    const weaponId = event.currentTarget.closest(".item").dataset.itemId;
    this.actor.rollAttack(weaponId);
  }

  async onSpellCast(event) {
    event.preventDefault();
    const spellId = event.currentTarget.closest(".item").dataset.itemId;
    this.actor.castSpell(spellId);
  }

  _onDragStart(event) {
    const li = event.currentTarget;
    const item = this.actor.items.get(li.dataset.itemId);
    let dragData = item ? item.toDragData() : {};
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  async _onDrop(event) {
    const data = TextEditor.getDragEventData(event);
    const actor = this.actor;

    if (data.type === "Item") {
      return this._onDropItem(event, data);
    }
  }

  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;

    const item = await Item.implementation.fromDropData(data);

    // Check if it's from another actor
    if (item.parent?.id !== this.actor.id) {
      // Create a copy in this actor
      let itemData = item.toObject();
      return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    return false;
  }
}
