/**
 * NPC Sheet for Spell and Steel
 */
export default class SpellAndSteelNPCSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["spell-and-steel", "sheet", "actor"],
      template: "systems/spell-and-steel/templates/sheets/npc-sheet.hbs",
      width: 600,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
    });
  }

  async getData() {
    const source = this.actor.toObject(false);

    return {
      actor: this.actor,
      source: source,
      system: source.system,
      items: this.actor.items.map(item => ({
        ...item.toObject(false),
        id: item.id
      })),
      owner: this.actor.isOwner,
      editable: this.isEditable,
      cssClass: this.actor.isOwner ? "editable" : "locked",
      config: CONFIG.SPELL_AND_STEEL,
      tags: source.system.tags || []
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".attribute-input").change(ev => this.onAttributeChange(ev));
    html.find(".health-input").change(ev => this.onHealthChange(ev));
    html.find(".armor-input").change(ev => this.onArmorChange(ev));
    html.find(".item-delete").click(ev => this.onItemDelete(ev));
  }

  onAttributeChange(event) {
    const attrKey = event.currentTarget.dataset.attribute;
    const value = parseInt(event.currentTarget.value) || 0;
    this.actor.update({ [`system.attributes.${attrKey}.value`]: value });
  }

  onHealthChange(event) {
    const value = parseInt(event.currentTarget.value) || 0;
    this.actor.update({ "system.health.value": value });
  }

  onArmorChange(event) {
    const value = parseInt(event.currentTarget.value) || 0;
    this.actor.update({ "system.armor": value });
  }

  onItemDelete(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    this.actor.deleteEmbeddedDocuments("Item", [itemId]);
  }
}
