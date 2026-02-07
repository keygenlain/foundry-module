/**
 * Item Sheet for Spell and Steel
 */
export default class SpellAndSteelItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["spell-and-steel", "sheet", "item"],
      template: "systems/spell-and-steel/templates/sheets/item-sheet.hbs",
      width: 530,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "details" }]
    });
  }

  async getData() {
    const source = this.item.toObject(false);

    return {
      item: this.item,
      source: source,
      system: source.system,
      owner: this.item.isOwner,
      editable: this.isEditable,
      cssClass: this.item.isOwner ? "editable" : "locked",
      config: CONFIG.SPELL_AND_STEEL,
      itemType: source.type
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Universal inputs
    html.find(".item-input").change(ev => this.onInputChange(ev));
    html.find("textarea").change(ev => this.onTextChange(ev));
    html.find(".select-input").change(ev => this.onSelectChange(ev));
  }

  async onInputChange(event) {
    const target = event.currentTarget;
    const path = target.dataset.path || target.name;
    const value = target.type === "number" ? parseInt(target.value) || 0 : target.value;

    await this.item.update({ [path]: value });
  }

  async onTextChange(event) {
    const textarea = event.currentTarget;
    const path = textarea.dataset.path || textarea.name;
    const value = textarea.value;

    await this.item.update({ [path]: value });
  }

  async onSelectChange(event) {
    const select = event.currentTarget;
    const path = select.dataset.path || select.name;
    const value = select.value;

    await this.item.update({ [path]: value });
  }
}
