/**
 * Spell and Steel Dice Rolling System
 * Implements the Exploding Dice mechanic
 */

export class SpellAndSteelDie extends Die {
  constructor(termData) {
    super(termData);
  }

  /**
   * Determine whether this die should be exploded.
   * A die explodes on a roll of 6.
   */
  shouldExplode(initialPool = true) {
    if (!initialPool || this.isIntermediate) return false;
    return this.total === 6;
  }
}

export class SpellAndSteelRoll extends Roll {
  constructor(formula, data = {}, options = {}) {
    super(formula, data, options);
    this.options.explodingDice = true;
    this.successCount = 0;
    this.dicePool = [];
  }

  /**
   * Roll the dice pool and count successes.
   * A success is 4 or higher on a d6.
   */
  async evaluate({ minimize = false, maximize = false } = {}) {
    await super.evaluate({ minimize, maximize });
    this.countSuccesses();
    return this;
  }

  /**
   * Count successes in the roll (4+ is a success).
   */
  countSuccesses() {
    this.successCount = 0;
    if (this.terms && this.terms.length > 0) {
      const firstTerm = this.terms[0];
      if (firstTerm.results) {
        this.dicePool = firstTerm.results.map(r => r.result);
        this.successCount = this.dicePool.filter(die => die >= 4).length;
      }
    }
  }

  /**
   * Get an object with roll details for display
   */
  getDetails() {
    return {
      formula: this.formula,
      total: this.total,
      results: this.dicePool,
      successes: this.successCount,
      rolled: this.rolled
    };
  }

  /**
   * Return a string representation of this roll
   */
  toString() {
    return `${this.formula} = ${this.total} (${this.successCount} successes)`;
  }
}

/**
 * Roll a dice pool for Spell and Steel
 * @param {number} diceCount - Number of d6s to roll
 * @param {string} skillName - Name of the skill (for chat message display)
 * @param {Object} options - Additional options
 * @returns {Promise<SpellAndSteelRoll>}
 */
export async function rollDicePool(diceCount, skillName = "", options = {}) {
  const diceFormula = `${Math.max(diceCount, 0)}d6`;
  
  const roll = new SpellAndSteelRoll(diceFormula, {}, options);
  await roll.evaluate();

  // Create chat message
  const speaker = ChatMessage.getSpeaker({ actor: options.actor });
  
  let content = `<div class="dice-pool-result">`;
  content += `<h3>${skillName || "Dice Pool"}</h3>`;
  content += `<p><strong>Formula:</strong> ${roll.formula}</p>`;
  content += `<p><strong>Results:</strong> ${roll.dicePool.join(", ")}</p>`;
  content += `<p class="success-count"><strong>Successes:</strong> <span class="success-number">${roll.successCount}</span></p>`;
  content += `</div>`;

  if (!options.silent) {
    await ChatMessage.create({
      speaker,
      content,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      roll: roll.toJSON()
    });
  }

  return roll;
}

/**
 * Roll an opposed check
 * @param {Object} player - Player dice pool and skills
 * @param {Object} opponent - Opponent dice pool and skills
 * @returns {Promise<Object>}
 */
export async function rollOpposedCheck(player, opponent) {
  const playerRoll = new SpellAndSteelRoll(`${player.diceCount}d6`);
  const opponentRoll = new SpellAndSteelRoll(`${opponent.diceCount}d6`);

  await playerRoll.evaluate();
  await opponentRoll.evaluate();

  let winner = null;
  if (playerRoll.successCount > opponentRoll.successCount) {
    winner = "player";
  } else if (opponentRoll.successCount > playerRoll.successCount) {
    winner = "opponent";
  } else {
    // Tie-breaker: higher skill wins
    if (player.skill > opponent.skill) {
      winner = "player";
    } else if (opponent.skill > player.skill) {
      winner = "opponent";
    } else {
      // If skills are tied, roll 1d6
      const tieRoll = new Roll("1d6");
      await tieRoll.evaluate();
      winner = tieRoll.total >= 4 ? "player" : "opponent";
    }
  }

  return {
    playerRoll,
    opponentRoll,
    winner,
    playerSuccesses: playerRoll.successCount,
    opponentSuccesses: opponentRoll.successCount
  };
}

/**
 * Create a SpellAndSteelRoll from a string formula
 */
export class SpellAndSteelRollFactory {
  static createRoll(formula, data = {}, options = {}) {
    return new SpellAndSteelRoll(formula, data, options);
  }

  static rollPool(diceCount, options = {}) {
    return rollDicePool(diceCount, options.skillName || "", options);
  }
}
