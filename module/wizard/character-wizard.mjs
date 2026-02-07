/**
 * Character Creation Wizard for Spell and Steel
 * Guides players through the character creation process
 */

export default class CharacterCreationWizard extends FormApplication {
  constructor(options = {}) {
    super({}, options);
    this.currentStep = 0;
    this.characterData = {
      name: "",
      ancestry: "human",
      attributes: {
        vigor: 1,
        agility: 1,
        smarts: 1,
        spirit: 1
      },
      attributePoints: 10,
      skills: {},
      skillPoints: 10,
      equipment: [],
      spells: [],
      biography: ""
    };

    // Initialize all skills to 0
    const skillKeys = Object.keys(CONFIG.SPELL_AND_STEEL.skills);
    skillKeys.forEach(skill => {
      this.characterData.skills[skill] = 0;
    });
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "character-wizard",
      title: "Character Creation Wizard",
      template: "systems/spell-and-steel/templates/wizard/character-wizard.hbs",
      width: 600,
      height: 700,
      closeOnSubmit: false,
      resizable: true
    });
  }

  async getData() {
    const remainingAttributePoints = this.getAttributePointsRemaining();
    const remainingSkillPoints = this.getSkillPointsRemaining();

    return {
      step: this.currentStep,
      character: this.characterData,
      config: CONFIG.SPELL_AND_STEEL,
      remainingAttributePoints,
      remainingSkillPoints,
      attributePoints: [0, 1, 2, 3, 4, 5],
      skillPoints: [0, 1, 2, 3, 4, 5, 6],
      stepTitles: this.getStepTitles(),
      stepDescriptions: this.getStepDescriptions(),
      isFirstStep: this.currentStep === 0,
      isLastStep: this.currentStep === 4,
      wizardProgress: Math.round((this.currentStep / 4) * 100)
    };
  }

  getStepTitles() {
    return [
      "Basic Information",
      "Attributes",
      "Skills",
      "Equipment & Spells",
      "Review & Create"
    ];
  }

  getStepDescriptions() {
    return [
      "Let's start with the basics - give your character a name and choose an ancestry.",
      "Distribute 10 attribute points among Vigor, Agility, Smarts, and Spirit (each starts at 1, max 6).",
      "Distribute 10 skill points among 23 available skills (max 6 per skill).",
      "Choose starting weapons, armor, and 2 spells (you have 250 Silver to spend).",
      "Review your character and click Create to bring them to life!"
    ];
  }

  getAttributePointsRemaining() {
    const used = this.characterData.attributePoints - 10;
    const spent = (this.characterData.attributes.vigor - 1) +
                  (this.characterData.attributes.agility - 1) +
                  (this.characterData.attributes.smarts - 1) +
                  (this.characterData.attributes.spirit - 1);
    return Math.max(0, 10 - spent);
  }

  getSkillPointsRemaining() {
    const spent = Object.values(this.characterData.skills).reduce((a, b) => a + b, 0);
    return Math.max(0, 10 - spent);
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Navigation buttons
    html.find(".btn-next").click(() => this.nextStep(html));
    html.find(".btn-prev").click(() => this.prevStep());
    html.find(".btn-create").click(() => this.createCharacter());

    // Step 1: Basic Info
    html.find("input[name='character-name']").change(ev => {
      this.characterData.name = ev.currentTarget.value;
    });

    html.find("select[name='character-ancestry']").change(ev => {
      this.characterData.ancestry = ev.currentTarget.value;
    });

    // Step 2: Attributes
    html.find(".attribute-adjuster").click(ev => this.adjustAttribute(ev));

    // Step 3: Skills
    html.find(".skill-input").change(ev => {
      const skillKey = ev.currentTarget.dataset.skill;
      const value = parseInt(ev.currentTarget.value) || 0;
      this.characterData.skills[skillKey] = Math.min(6, Math.max(0, value));
      this.render();
    });

    // Step 4: Equipment selection
    html.find(".equipment-checkbox").change(ev => {
      const itemType = ev.currentTarget.dataset.type;
      const itemName = ev.currentTarget.dataset.name;
      const itemPrice = parseInt(ev.currentTarget.dataset.price);

      if (ev.currentTarget.checked) {
        const totalCost = this.characterData.equipment.reduce((sum, item) => sum + item.price, 0);
        if (totalCost + itemPrice <= 250) {
          this.characterData.equipment.push({
            name: itemName,
            type: itemType,
            price: itemPrice
          });
        } else {
          ev.currentTarget.checked = false;
          ui.notifications.warn("Not enough Silver for this item!");
        }
      } else {
        this.characterData.equipment = this.characterData.equipment.filter(
          item => !(item.name === itemName && item.type === itemType)
        );
      }
      this.render();
    });

    html.find(".spell-checkbox").change(ev => {
      const spellName = ev.currentTarget.dataset.spell;
      
      if (ev.currentTarget.checked) {
        if (this.characterData.spells.length < 2) {
          this.characterData.spells.push(spellName);
        } else {
          ev.currentTarget.checked = false;
          ui.notifications.warn("You can only select 2 starting spells!");
        }
      } else {
        this.characterData.spells = this.characterData.spells.filter(s => s !== spellName);
      }
      this.render();
    });

    html.find("textarea[name='character-biography']").change(ev => {
      this.characterData.biography = ev.currentTarget.value;
    });
  }

  adjustAttribute(event) {
    const button = event.currentTarget;
    const attributeName = button.dataset.attribute;
    const direction = button.dataset.direction;
    const currentValue = this.characterData.attributes[attributeName];

    if (direction === "inc" && currentValue < 6) {
      if (this.getAttributePointsRemaining() > 0) {
        this.characterData.attributes[attributeName]++;
      } else {
        ui.notifications.warn("No attribute points remaining!");
      }
    } else if (direction === "dec" && currentValue > 1) {
      this.characterData.attributes[attributeName]--;
    }

    this.render();
  }

  async nextStep(html) {
    // Validate current step before advancing
    if (!this.validateStep(this.currentStep)) {
      return;
    }

    if (this.currentStep < 4) {
      this.currentStep++;
      this.render();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  validateStep(step) {
    switch (step) {
      case 0: // Basic Info
        if (!this.characterData.name.trim()) {
          ui.notifications.error("Please enter a character name!");
          return false;
        }
        break;

      case 1: // Attributes
        const attrSpent = (this.characterData.attributes.vigor - 1) +
                         (this.characterData.attributes.agility - 1) +
                         (this.characterData.attributes.smarts - 1) +
                         (this.characterData.attributes.spirit - 1);
        if (attrSpent !== 10) {
          ui.notifications.error("You must distribute exactly 10 attribute points!");
          return false;
        }
        break;

      case 2: // Skills
        const skillSpent = Object.values(this.characterData.skills).reduce((a, b) => a + b, 0);
        if (skillSpent !== 10) {
          ui.notifications.error("You must distribute exactly 10 skill points!");
          return false;
        }
        break;

      case 3: // Equipment
        if (this.characterData.spells.length !== 2) {
          ui.notifications.error("Please select exactly 2 starting spells!");
          return false;
        }
        break;
    }

    return true;
  }

  async createCharacter() {
    if (!this.validateStep(4)) {
      return;
    }

    try {
      // Create the actor
      const actorData = {
        name: this.characterData.name,
        type: "character",
        img: "systems/spell-and-steel/assets/character.svg",
        system: {
          ancestry: this.characterData.ancestry,
          attributes: this.characterData.attributes,
          skills: this.characterData.skills,
          health: {
            value: this.characterData.attributes.vigor * 5,
            max: this.characterData.attributes.vigor * 5
          },
          mana: {
            value: this.characterData.attributes.spirit * 5,
            max: this.characterData.attributes.spirit * 5
          },
          biography: this.characterData.biography,
          currency: {
            silver: 250 - this.characterData.equipment.reduce((sum, item) => sum + item.price, 0)
          }
        }
      };

      const actor = await Actor.create(actorData);

      // Add equipment items
      const itemsToCreate = [];

      // Add weapons and armor from equipment list
      for (const item of this.characterData.equipment) {
        itemsToCreate.push(this.createItemData(item.name, item.type, item.price));
      }

      // Add spells
      for (const spellName of this.characterData.spells) {
        itemsToCreate.push(this.createSpellItemData(spellName));
      }

      if (itemsToCreate.length > 0) {
        await actor.createEmbeddedDocuments("Item", itemsToCreate);
      }

      ui.notifications.info(`${this.characterData.name} has been created!`);
      this.close();

      // Open the character sheet
      actor.sheet.render(true);
    } catch (error) {
      console.error("Error creating character:", error);
      ui.notifications.error("Error creating character. Check the console.");
    }
  }

  createItemData(name, type, price) {
    // Get predefined items from the system
    const predefinedItems = this.getPredefinedItems();
    const itemTemplate = predefinedItems[type]?.[name];

    if (itemTemplate) {
      return {
        name: name,
        type: itemTemplate.type,
        system: itemTemplate.system
      };
    }

    // Fallback
    return {
      name: name,
      type: type,
      system: { price: price }
    };
  }

  createSpellItemData(spellName) {
    const spellList = this.getSpellList();
    const spell = spellList.find(s => s.name === spellName);

    if (spell) {
      return {
        name: spell.name,
        type: "spell",
        system: spell.system
      };
    }

    return {
      name: spellName,
      type: "spell",
      system: {}
    };
  }

  getPredefinedItems() {
    return {
      weapon: {
        "Shortsword": {
          type: "weapon",
          system: {
            quantities: { damage: 2 },
            skillRequired: "shortBlades",
            weapon: { type: "melee", range: 0 },
            price: 50
          }
        },
        "Dagger": {
          type: "weapon",
          system: {
            quantities: { damage: 1 },
            skillRequired: "shortBlades",
            weapon: { type: "melee", range: 0 },
            price: 25
          }
        },
        "Longsword": {
          type: "weapon",
          system: {
            quantities: { damage: 3 },
            skillRequired: "longBlades",
            weapon: { type: "melee", range: 0 },
            price: 100
          }
        },
        "Greatsword": {
          type: "weapon",
          system: {
            quantities: { damage: 4 },
            skillRequired: "largeBlades",
            weapon: { type: "melee", range: 0 },
            price: 250
          }
        },
        "Shortbow": {
          type: "weapon",
          system: {
            quantities: { damage: 2 },
            skillRequired: "ranged",
            weapon: { type: "ranged", range: 10 },
            price: 50
          }
        },
        "Longbow": {
          type: "weapon",
          system: {
            quantities: { damage: 3 },
            skillRequired: "ranged",
            weapon: { type: "ranged", range: 15 },
            price: 100
          }
        },
        "Mace": {
          type: "weapon",
          system: {
            quantities: { damage: 2 },
            skillRequired: "blunt",
            weapon: { type: "melee", range: 0 },
            price: 30
          }
        },
        "Spear": {
          type: "weapon",
          system: {
            quantities: { damage: 2 },
            skillRequired: "polearms",
            weapon: { type: "melee", range: 2 },
            price: 40
          }
        }
      },
      armor: {
        "Pauldrons": {
          type: "armor",
          system: {
            armor: { type: "light", value: 1 },
            price: 50
          }
        },
        "Helm": {
          type: "armor",
          system: {
            armor: { type: "light", value: 1 },
            price: 50
          }
        },
        "Breastplate": {
          type: "armor",
          system: {
            armor: { type: "medium", value: 2 },
            price: 100
          }
        },
        "Greaves": {
          type: "armor",
          system: {
            armor: { type: "light", value: 1 },
            price: 50
          }
        },
        "Gauntlets": {
          type: "armor",
          system: {
            armor: { type: "light", value: 1 },
            price: 50
          }
        }
      }
    };
  }

  getSpellList() {
    return [
      {
        name: "Arcane Bolt",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 3,
          successThreshold: 2,
          range: "12 Range",
          quantities: { damage: 2 },
          description: "You hurl a bolt of pure arcane energy at your opponent.",
          price: 50
        }
      },
      {
        name: "Mage Light",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 1,
          successThreshold: 1,
          range: "6 Range",
          description: "A floating orb of soft light follows you.",
          price: 50
        }
      },
      {
        name: "Gust",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 3,
          successThreshold: 2,
          range: "6 Range",
          description: "A violent burst of wind pushes one target back.",
          price: 50
        }
      },
      {
        name: "Purify",
        system: {
          spellType: "faith",
          tier: 1,
          manaCost: 3,
          successThreshold: 2,
          range: "Touch",
          description: "Your touch draws out impurities.",
          price: 50
        }
      },
      {
        name: "Mending Word",
        system: {
          spellType: "faith",
          tier: 1,
          manaCost: 3,
          successThreshold: 2,
          range: "Touch",
          description: "You whisper a brief prayer to knit flesh and bone.",
          price: 50
        }
      },
      {
        name: "Guiding Bolt",
        system: {
          spellType: "faith",
          tier: 1,
          manaCost: 4,
          successThreshold: 3,
          range: "12 Range",
          quantities: { damage: 2 },
          description: "A flash of divine light strikes the foe.",
          price: 50
        }
      },
      {
        name: "Mirror Image",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 4,
          successThreshold: 3,
          range: "Self",
          description: "You create a shimmering duplicate of yourself.",
          price: 50
        }
      },
      {
        name: "Frost Touch",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 4,
          successThreshold: 2,
          range: "Reach 1",
          quantities: { damage: 2 },
          description: "Your hand glows with a killing chill.",
          price: 50
        }
      },
      {
        name: "Cinder Snap",
        system: {
          spellType: "arcana",
          tier: 1,
          manaCost: 2,
          successThreshold: 2,
          range: "3 Range",
          quantities: { damage: 1 },
          description: "You snap your fingers, igniting your enemies.",
          price: 50
        }
      },
      {
        name: "Curse",
        system: {
          spellType: "faith",
          tier: 1,
          manaCost: 4,
          successThreshold: 3,
          range: "10 Range",
          description: "You hex an enemy with misfortune.",
          price: 50
        }
      }
    ];
  }
}
