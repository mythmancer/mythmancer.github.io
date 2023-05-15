/* character models - just for demo */
const CHARACTER_MODELS = {
  "Pal Bonwater - Level 6 Elementalist": {
    "color": "#8386CC",
    "hit_points": {
      "total": 17,
      "current": 16
    },
    "ability_scores": {
      "strength": 16,
      "dexterity": 13,
      "constitution": 9,
      "wisdom": 17,
      "intelligence": 16,
      "charisma": 16,
    },
    "armor_class": 14,
    "armor": {
      "Chest": "Wet Suit",
      "Gloves": "Bracers of Armor +3",
    },
    "fighter": {
      "level": 5,
    },
    "rogue": {
      "level": 5,
    },
    "mage": {
      "level": 5,
      "arcane_casting_in_armor": 3,
    },
    "warlock": {
      "level": 5,
      "domain": "Elemental - Water",
      "major_patron": "Rath - Water Aspect",
    },
  },
  "Herakles - Level 5 Grinner": {
    "color": "#7c0a0a",
    "hit_points": {
      "total": 100000,
      "current": 18
    },
    "armor_class": 20,
    "ability_scores": {
      "strength": 19,
      "dexterity": 1,
      "constitution": 2,
      "wisdom": 3,
      "intelligence": 4,
      "charisma": 5,
    },
    "armor": {
      "Chest": "Buff af",
      "Gloves": "Gloooooooves",
    },
    "fighter": {
      "level": 221,
    },
    "rogue": {
      "level": 1,
    },
    "mage": {
      "level": 2,
      "arcane_casting_in_armor": 1,
    },
    "warlock": {
      "level": 3,
      "domain": "Elemental - Ice",
      "major_patron": "Belch",
    },
  },
  "Noam Gnomesky - Level 20 Old Man": {
    "color": "#989898",
    "hit_points": {
      "total": 2,
      "current": 1
    },
    "armor_class": 1,
    "ability_scores": {
      "strength": 0,
      "dexterity": 0,
      "constitution": 0,
      "wisdom": 20,
      "intelligence": 10,
      "charisma": 15,
    },
    "armor": {
      "Chest": "Sunken",
      "Gloves": "Evening soiree gloves",
    },
    "fighter": {
      "level": 0,
    },
    "rogue": {
      "level": 9,
    },
    "mage": {
      "level": 9,
      "arcane_casting_in_armor": 19,
    },
    "warlock": {
      "level": 9,
      "domain": "Arcana",
      "major_patron": "Some old dead thing",
    },
  }
};



/*******************************************************************
 **************************** CONSTANTS ****************************
 *******************************************************************/

CHARACTER_SHEET_STORAGE_KEY = "character_sheets";
COLOR_MODE_STORAGE_KEY = "color_mode";
THEME_STORAGE_KEY = "theme";

/*******************************************************************
 *************************** APPEARANCE ****************************
 *******************************************************************/
COLOR_MODES = {
  "dark": {
    "--cs-color-bg": "#181a1b",
    "--cs-color-text": "#ffffff",
    "--cs-color-btn-text": "#000000",
    "--cs-color-text-deemphasized": "#9f9f9f",
  },
  "light": {
    "--cs-color-bg": "#ffffff",
    "--cs-color-text": "#000000",
    "--cs-color-btn-text": "#ffffff",
    "--cs-color-text-deemphasized": "#5e5e5e",
  },
};

THEMES = {
  "standard": {
    "--cs-font": "Baskervville",
    "--cs-font-size-lg": "24px",
    "--cs-font-size-std": "16px",
    "--cs-font-size-sm": "12px",
    "--cs-width-divider-left": "12px",
    "--cs-arrow-height": "2px",
    "--cs-arrow-width": "4px",
  },
  "arcade": {
    "--cs-font": "HammerBro",
    "--cs-font-size-lg": "32px",
    "--cs-font-size-std": "20px",
    "--cs-font-size-sm": "16px",
    "--cs-width-divider-left": "16px",
    "--cs-arrow-height": "7px",
    "--cs-arrow-width": "10px",
  },
};

function setAppearance() {
  const colorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) || "light";
  for (let prop in COLOR_MODES[colorMode]) {
    document.documentElement.style.setProperty(prop, COLOR_MODES[colorMode][prop]);
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY) || "normal";
  for (let prop in THEMES[theme]) {
    document.documentElement.style.setProperty(prop, THEMES[theme][prop]);
  }
}

/*******************************************************************
 **************************** DATABASES ****************************
 *******************************************************************/
ARMOR = {
  "padded": {
    "ac": 1,
  },
  "leather": {
    "ac": 2,
  },
  "reinforced": {
    "ac": 3,
  },
  "ring mail": {
    "ac": 4,
    "max_dex_mod": 3,
  },
  "scale mail": {
    "ac": 5,
    "max_dex_mod": 3,
  },
  "chain mail": {
    "ac": 6,
    "max_dex_mod": 2,
  },
  "shield": {
    "ac": 2,
  },
  "elfin chain mail": {
    "ac": 5,
  },
  "dwarven mail": {
    "ac": 7,
    "max_dex_mod": 2,
  },
  "hoplon": {
    "ac": 3,
    "max_dex_mod": 2,
  },
};

SPELL_SLOTS = {
  0: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  1: {
    1: 2,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  2: {
    1: 3,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  3: {
    1: 3,
    2: 1,
    3: 0,
    4: 0,
    5: 0,
  },
  4: {
    1: 3,
    2: 2,
    3: 0,
    4: 0,
    5: 0,
  },
  5: {
    1: 4,
    2: 2,
    3: 1,
    4: 0,
    5: 0,
  },
  6: {
    1: 4,
    2: 3,
    3: 2,
    4: 0,
    5: 0,
  },
  7: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 0,
  },
  8: {
    1: 4,
    2: 3,
    3: 3,
    4: 2,
    5: 0,
  },
  9: {
    1: 4,
    2: 4,
    3: 3,
    4: 2,
    5: 1,
  },
};

ATTRIBUTE_MODIFIER_TABLE = {
  2: -4,
  3: -3,
  4: -2,
  5: -2,
  6: -1,
  7: -1,
  8: -1,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 1,
  14: 1,
  15: 1,
  16: 2,
  17: 2,
  18: 3,
  19: 4,
};

SKILL_PROFICIENCY_TABLE = {
  0: {
    "rogue": 0,
    "mage": 0,
    "fighter": 0,
    "warlock": 0,
  },
  1: {
    "rogue": 3,
    "mage": 1,
    "fighter": 1,
    "warlock": 1,
  },
  2: {
    "rogue": 5,
    "mage": 2,
    "fighter": 1,
    "warlock": 1,
  },
  3: {
    "rogue": 5,
    "mage": 2,
    "fighter": 1,
    "warlock": 1,
  },
  4: {
    "rogue": 6,
    "mage": 3,
    "fighter": 2,
    "warlock": 2,
  },
  5: {
    "rogue": 7,
    "mage": 3,
    "fighter": 2,
    "warlock": 2,
  },
  6: {
    "rogue": 8,
    "mage": 4,
    "fighter": 2,
    "warlock": 2,
  },
  7: {
    "rogue": 8,
    "mage": 4,
    "fighter": 2,
    "warlock": 2,
  },
  8: {
    "rogue": 9,
    "mage": 5,
    "fighter": 3,
    "warlock": 3,
  },
  9: {
    "rogue": 10,
    "mage": 5,
    "fighter": 3,
    "warlock": 3,
  },
};

/*******************************************************************
 *************** EVALUATING A CHARACTER TO COMPLETION **************
 *******************************************************************/

function getNumericalCharacteristic(val) {
  return parseInt(val || "0");
}

BUILDER_FUNCTIONS = {
  "total_character_level": characterData => {
    return getNumericalCharacteristic(characterData["fighter"]["level"])
      + getNumericalCharacteristic(characterData["mage"]["level"])
      + getNumericalCharacteristic(characterData["rogue"]["level"])
      + getNumericalCharacteristic(characterData["warlock"]["level"]);
  },
  "modifiers.charisma": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["charisma"])],
      "tooltip": "",
    };
  },

  "modifiers.constitution": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["constitution"])],
      "tooltip": "",
    };
  },

  "save_throws.constitution": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["constitution"])]
        + Math.floor(getNumericalCharacteristic(characterData["fighter"]["level"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["mage"]["level"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["rogue"]["level"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["warlock"]["level"]) / 3),
      "tooltip": "fortitude",
    };
  },

  "modifiers.dexterity": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["dexterity"])],
      "tooltip": "",
    };
  },

  "save_throws.dexterity": characterData => {
    // DEX + FGT/3 + MAG/3 + ROG/2 + WAR/4
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["dexterity"])]
        + Math.floor(getNumericalCharacteristic(characterData["fighter"]["level"]) / 3)
        + Math.floor(getNumericalCharacteristic(characterData["mage"]["level"]) / 3)
        + Math.floor(getNumericalCharacteristic(characterData["rogue"]["level"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["warlock"]["level"]) / 4),
      "tooltip": "A ".repeat(200),
    };
  },

  "modifiers.intelligence": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["intelligence"])],
      "tooltip": "",
    };
  },

  "modifiers.strength": characterData => {
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["strength"])],
      "tooltip": "",
    };
  },

  "modifiers.wisdom": characterData => {
    // table
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["wisdom"])],
      "tooltip": "",
    };
  },

  "save_throws.wisdom": characterData => {
    // WIS + FGT/4 + MAG/2 + ROG/3 + WAR/2
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["wisdom"])]
        + Math.floor(getNumericalCharacteristic(characterData["fighter"]["level"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["mage"]["level"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["rogue"]["level"]) / 3)
        + Math.floor(getNumericalCharacteristic(characterData["warlock"]["level"]) / 2),
      "tooltip": "will",
    };
  },

  "hit_points.hit_die": characterData => {
    // FGT + MAG + ROG + WAR
    return {
      "display": getNumericalCharacteristic(characterData["fighter"]["level"])
        + getNumericalCharacteristic(characterData["mage"]["level"])
        + getNumericalCharacteristic(characterData["rogue"]["level"])
        + getNumericalCharacteristic(characterData["warlock"]["level"]),
      "tooltip": "",
    };
  },

  "attacks.base_bonus": characterData => {
    // FGT + MAG/4 + ROG/2 + WAR/2
    return {
      "display": getNumericalCharacteristic(characterData["fighter"]["level"])
        + Math.floor(getNumericalCharacteristic(characterData["mage"]["level"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["rogue"]["level"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["warlock"]["level"]) / 2),
      "tooltip": "",
    };
  },

  "attacks.number_of_attacks": characterData => {
    // max(1 + (FGT-1)/4, 1)
    return {
      "display": Math.max(
        Math.floor(1 + (getNumericalCharacteristic(characterData["fighter"]["level"]) - 1) / 4),
        1,
      ),
      "tooltip": "",
    };
  },

  "equipment.allowed_armor": characterData => {
    // if(FGT > 0, "Heavy + Shields", if(WAR > 0, "Medium", if(ROG > 0, "Light", "None")))
    let allowedArmor;

    if (getNumericalCharacteristic(characterData["fighter"]["level"]) > 0) {
      allowedArmor = "Heavy + Shields";
    } else if (getNumericalCharacteristic(characterData["warlock"]["level"]) > 0) {
      allowedArmor = "Medium";
    } else if (getNumericalCharacteristic(characterData["rogue"]["level"]) > 0) {
      allowedArmor = "Light";
    } else {
      allowedArmor = "None";
    }

    return {
      "display": allowedArmor,
      "tooltip": "",
    };
  },

  "equipment.allowed_weapons": characterData => {
    // if(FGT > 0, "Martial", if(ROG+WAR > 0, "Standard", "Simple"))
    let allowedWeapons;

    if (getNumericalCharacteristic(characterData["fighter"]["level"]) > 0) {
      allowedWeapons = "Martial";
    } else if (getNumericalCharacteristic(characterData["warlock"]["level"]) > 0) {
      allowedWeapons = "Standard";
    } else if (getNumericalCharacteristic(characterData["rogue"]["level"]) > 0) {
      allowedWeapons = "Standard";
    } else {
      allowedWeapons = "Simple";
    }

    return {
      "display": allowedWeapons,
      "tooltip": "",
    };
  },

  "skills.skill_check_bonus": characterData => {
    // ROG + MAG/2 + FGT/4 + WAR/4
    return {
      "display": Math.floor(getNumericalCharacteristic(characterData["mage"]["level"]) / 2)
        + getNumericalCharacteristic(characterData["rogue"]["level"])
        + Math.floor(getNumericalCharacteristic(characterData["fighter"]["level"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["warlock"]["level"]) / 4),
      "tooltip": "",
    };
  },

  "skills.max_skill_proficiencies": characterData => {
    // table
    return {
      "display": SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["mage"]["level"])]["mage"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["rogue"]["level"])]["rogue"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["rogue"]["level"])]["fighter"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["rogue"]["level"])]["warlock"],
      "tooltip": "",
    };
  },

  "mage.max_spells_learnable_per_degree": characterData => {
    // 5 + INT
    return {
      "display": 5 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["intelligence"])],
      "tooltip": "",
    };
  },

  "warlock.max_minor_patrons": characterData => {
    // min(1 + CHA, (WAR+1)/2)
    return {
      "display": Math.min(
        1 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["charisma"])],
        Math.floor((getNumericalCharacteristic(characterData["warlock"]["level"]) + 1) / 2)
      ),
      "tooltip": "",
    };
  },


  "warlock.l1_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["warlock"]["level"])][1],
      "tooltip": "",
    };
  },

  "warlock.l2_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["warlock"]["level"])][2],
      "tooltip": "",
    };
  },

  "warlock.l3_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["warlock"]["level"])][3],
      "tooltip": "",
    };
  },

  "warlock.l4_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["warlock"]["level"])][4],
      "tooltip": "",
    };
  },

  "warlock.l5_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["warlock"]["level"])][5],
      "tooltip": "",
    };
  },

  "mage.l1_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["mage"]["level"])][1],
      "tooltip": "",
    };
  },

  "mage.l2_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["mage"]["level"])][2],
      "tooltip": "",
    };
  },

  "mage.l3_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["mage"]["level"])][3],
      "tooltip": "",
    };
  },

  "mage.l4_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["mage"]["level"])][4],
      "tooltip": "",
    };
  },

  "mage.l5_spell_slots": characterData => {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["mage"]["level"])][5],
      "tooltip": "",
    };
  },

  "cs-armor-class": characterData => {
    let equipmentAC = 0;
    let dexMod = ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["ability_scores"]["dexterity"])];

    // TODO - go through euipment and populate equipmentAC

    return {
      "display": 10 + dexMod + equipmentAC,
      "tooltip": `<h1>Armor Class</h1>${dexMod} from dex<br/>${equipmentAC} from equipment`,
    };
  },
};

function buildFinalizedCharacterModel(baseCharacterModel) {
  const finalizedCharacterModel = structuredClone(baseCharacterModel);

  for (let prop in BUILDER_FUNCTIONS) {
    const propPath = prop.split(".");
    let currLevel = finalizedCharacterModel;
    for (let i = 0; i < propPath.length - 1; i++) {
      if (!currLevel.hasOwnProperty(propPath[i])) {
        currLevel[propPath[i]] = {};
      }
      currLevel = currLevel[propPath[i]];
    }
    currLevel[propPath[propPath.length - 1]] = BUILDER_FUNCTIONS[prop](baseCharacterModel);
  }

  return finalizedCharacterModel;
}

function getCharacterModel(characterName) {
  return CHARACTER_MODELS[characterName];
}

/**
 * Returns white or black depending on a provided color that should visually stand out in comparison
 * @param {string} hexColor String for the hex code of a color
 * @returns {string} a hex string for white or black
 */
function getContrastColor(hexColor) {
  hexColor = hexColor.replace('#', '');
  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);

  // Calculate the brightness (luminance) using the relative luminance formula
  const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return (brightness > 0.5) ? '#000000' : '#FFFFFF';
}

class WeaponAttack {
  /**
   * WIP - model for weapon attacks, intended to contain the necessary info to describe an attack in a standard way
   * TODO - represent "Critically hits on 19" somehow
   *
   * @param {string} verb descriptive verb of this attack (Strike, Shoot, etc) along with any distinguishing conditions
   * @param {number} numberOfAttacks
   * @param {boolean} isFast
   * @param {string} range TODO - use an enum or similar: none, melee, reach, short, medium, or long
   * @param {number} bonusToHit
   * @param {string} damage TODO - represent as a class eventually
   * @param {string} condition free-form string of conditions this class requires e.g. "opponent is heavily armored"
   */
  constructor(verb, numberOfAttacks, isFast, range, bonusToHit, damage, condition) {
    this.verb = verb;
    this.numberOfAttacks = numberOfAttacks;
    this.isFast = isFast;
    this.range = range;
    this.bonusToHit = bonusToHit;
    this.damage = damage;
    this.condition = condition;
  }

  _rangeDescription() {
    const attack = this.numberOfAttacks === 1 ? "Attack" : "Attacks";
    if (this.range === "melee") {
      return `Melee ${attack}`;
    } else if (this.range === "reach") {
      return `Melee ${attack} with Reach`;
    } else if (this.range === "short" || this.range === "medium" || this.range === "long") {
      return `${this.range.charAt(0).toUpperCase() + this.range.slice(1)}-Range ${attack}`;
    } else {
      return "(UNKNOWN RANGE)";
    }
  }

  description() {
    // "1 Attack at +3 to hit dealing 1d6 damage if some condition is filled"
    return `${this.numberOfAttacks} ${this.isFast ? "Fast " : ""}${this._rangeDescription()} at
      ${this.bonusToHit >= 0 ? `+${this.bonusToHit}` : this.bonusToHit} to hit
      dealing ${this.damage} damage${this.condition === "" ? "" : ` if ${this.condition}`}`;
  }
}

// CORE COMPONENTS //
class HTMLComponent {
  getHTML() {
    console.log(`${this.constructor.name} does not have a defined HTML rendering function`);
    alert(`Could not render page`);
    throw new Error(`${this.constructor.name} does not have a defined HTML rendering function`);
  }
}

class Pane extends HTMLComponent {
  /**
   * Vertical list of {@link PaneSection}
   * @param {PaneSection[]} sections List items within the pane
   */
  constructor(sections) {
    super();
    this.sections = sections;
  }

  getHTML() {
    return `
    <div class="cs-panel cs-col cs-padding-v cs-border-right">
        ${this.sections.map((section) => section.getHTML()).join("")}
    </div>
    `;
  }
}

class PaneSection extends HTMLComponent {
  /**
   * Vertical list of {@link SectionEntry}
   * @param {SectionDivider} divider Optional title of the section
   * @param {SectionEntry[]} entries List items within the section
   */
  constructor({
                divider = null,
                entries = []
              }) {
    super();
    this.divider = divider;
    this.entries = entries;
  }

  getHTML() {
    return `
    <div class="cs-col">
        ${this.divider == null ? "" : this.divider.getHTML()}
        <div class="cs-col">
            ${this.entries.map((entry) => entry.getHTML()).join("")}
        </div>
    </div>
    `;
  }
}

class SectionDivider extends HTMLComponent {
  /**
   * Optional title of a section
   * @param {string} heading Title text of the section, flanked by horizontal lines
   */
  constructor(heading) {
    super();
    this.heading = heading;
  }

  getHTML() {
    return `
    <div class="cs-row cs-elem">
        <div class="arrow-line arrow-line-right cs-width-divider-left"></div>
        <div class="cs-elem cs-width-fill cs-font-size-sm">${this.heading}</div>
        <div class="arrow-line arrow-line-left cs-width-full"></div>
    </div>
    `;
  }
}

class SectionEntry extends HTMLComponent {
  /**
   * List item within a {@link PaneSection}. Composed of two rows, the main containing various buttons and labels to
   * serve as the primary descriptor of the entry, and the second being a vertical list of {@link SectionSubEntry}.
   *
   * @param {string} shortKeyText Optional short key of fixed width on the far left of the main row
   * @param {DiceButton} diceButton Optional button to roll dice associated with this entry
   * @param {string} mainKeyText Optional text for the left side of the main row in a key-value pair
   * @param {string} valueText Optional text for the right side of the main row in a key-value pair
   * @param {string} tooltipHTML Optional HTML for the tooltip of this entry TODO - this ought to be a class
   * @param {EditButton} editButton Optional button to edit this entry on the far right of the main row
   * @param {SectionSubEntry[]} subEntries Optional vertical list of small-text descriptors beneath the main row
   */
  constructor({
                shortKeyText = "",
                diceButton = null,
                mainKeyText = "",
                valueText = "",
                tooltipHTML = "",
                editButton = null,
                subEntries = []
              }) {
    super();
    this.shortKeyText = shortKeyText;
    this.diceButton = diceButton;
    this.mainKeyText = mainKeyText;
    this.valueText = valueText;
    this.tooltipHTML = tooltipHTML;
    this.editButton = editButton;
    this.subEntries = subEntries;
  }

  getHTML() {
    return `
    <div class="cs-col cs-padding-h">
      <div class="cs-row">
          ${this.shortKeyText === "" ? "" : `
            <div class="cs-elem cs-font-color-deemphasized cs-width-fixed-short-key">
              ${this.shortKeyText}
            </div>
          `}
          ${this.diceButton == null && this.mainKeyText === "" ? "" : `
            <div class="cs-row">
              ${this.diceButton == null ? "" : this.diceButton.getHTML()}
              <div class="cs-elem">${this.mainKeyText}</div>
            </div>
          `}
          ${this.valueText === "" ? `
            ${this.editButton == null ? "" : this.editButton.getHTML()}
          ` : `
            <div class="cs-row">
              ${this.valueText === "" ? "" : `
              <div class="cs-elem cs-width-full ${this.tooltipHTML ? "cs-has-tooltip" : ""}">
                ${this.valueText}
                ${this.tooltipHTML ? `<div class="cs-tooltiptext">${this.tooltipHTML}</div>` : ""}
              </div>`
              }
              ${this.editButton == null ? "" : this.editButton.getHTML()}
            </div>
          `}

      </div>
      ${this.subEntries.map((subEntry) => subEntry.getHTML()).join("")}
    </div>
    `;
  }
}

class SectionSubEntry extends HTMLComponent {
  /**
   * Small-text descriptive list item beneath a {@link SectionEntry}
   * @param {DiceButton} diceButton Optional button to roll dice associated with this sub-entry
   * @param {string} text Optional text for this sub-entry
   */
  constructor({
                diceButton = null,
                text = ""
              }) {
    super();
    this.diceButton = diceButton;
    this.text = text;
  }

  getHTML() {
    return `
    <div class="cs-row">
        ${this.diceButton == null ? "" : this.diceButton.getHTML()}
        <div class="cs-elem cs-font-size-sm">${this.text}</div>
    </div>
    `;
  }
}

class DiceButton extends HTMLComponent {
  /**
   * Button that rolls dice
   * @param {string} text Button text
   */
  constructor(text) {
    super();
    this.text = text;
  }

  getHTML() {
    return `
    <div class="cs-btn cs-font-size-sm cs-font-color-character cs-padding-h cs-line-height-btn cs-width-fill cs-color-character-bg">
        ⚅ ${this.text}
    </div>
    `;
  }
}

class EditButton extends HTMLComponent {
  /**
   * Button used for editing entries
   * @param {string} text Button text
   */
  constructor(text) {
    super();
    this.text = text;
  }

  getHTML() {
    return `
    <div class="cs-btn cs-font-size-sm cs-padding-h cs-line-height-btn cs-width-fill cs-color-btn">
        ${this.text}
    </div>
    `;
  }
}

// COMPOSITE COMPONENTS //
/**
 * Entry with dice button, key, and value.
 *
 * Used for: Ability Scores, Save Throws, Skill Check
 *
 * @param {string} action
 * @param {string} key
 * @param {string} value ({display: ..., tooltip: ...})
 * @param {string} description
 */
function actionKeyValue(action, key, value, description = "") {
  // TODO: cleanup to having common way to access all display, tooltip data
  let tooltipHTML = "";
  if (value && value.hasOwnProperty("display")) {
    tooltipHTML = value.tooltip;
    value = value.display;
  }

  return new SectionEntry({
    diceButton: new DiceButton(action),
    mainKeyText: key,
    valueText: value,
    tooltipHTML: tooltipHTML,
    subEntries: description === "" ? [] : [new SectionSubEntry({text: description})]
  });
}

/**
 * Entry with the name of a weapon, an edit button, and a list of attacks that can be performed with that weapon
 *
 * @param {string} weapon Name of the weapon
 * @param {WeaponAttack[]} attacks List of attacks that can be performed with this weapon
 */
function weaponAndActions(weapon, attacks) {
  return new SectionEntry({
    mainKeyText: weapon,
    editButton: new EditButton("Edit / Remove"),
    subEntries: attacks.map((attack) => new SectionSubEntry({
      diceButton: new DiceButton(attack.verb),
      text: attack.description()
    }))
  });
}

/**
 * Entry about armor and other worn equipment. Can represent unequipped / equipped states based on the existence of
 * the {@link item} param.
 *
 * The unequipped state simply contains a key-value pair of the body part and an equip (edit) button.
 *
 * The equipped state contains the body part, name of the item, an edit/remove button and an optional descriptor.
 *
 * @param {string} part Body part where this armor is equipped (Chest, Belt, etc.)
 * @param {string} item Optional name of the piece of equipment
 * @param {string} description Optional description for equipment that grants extra effects
 */
function armor(part, item = "", description = "") {
  if (item === "") {
    return new SectionEntry({
      shortKeyText: part,
      editButton: new EditButton("Equip")
    });
  } else {
    return new SectionEntry({
      shortKeyText: part,
      mainKeyText: item,
      editButton: new EditButton("Edit / Remove"),
      subEntries: (description === "") ? [] : [new SectionSubEntry({text: description})]
    });
  }
}

/**
 * An entry displaying a (typically temporary) effect on the character such as a spell buff
 *
 * @param {string} effect name of this effect
 * @param {string} duration description of the remaining time on this effect
 * @param {string} description Small-text description of this effect
 */
function activeEffect(effect, duration, description) {
  return new SectionEntry({
    mainKeyText: effect,
    editButton: new EditButton("Edit / Remove"),
    subEntries: [
      new SectionSubEntry({text: description}),
      new SectionSubEntry({text: `Duration: ${duration}`})
    ]
  })
}

/**
 * Entry about class data containing simple key-value pairs and optional notes
 *
 * @param {string} key
 * @param {string} value
 * @param {string[]} notes
 */
function classKeyValue(key, value, notes = []) {
  return new SectionEntry({
    mainKeyText: key,
    valueText: value,
    subEntries: notes.map(note => new SectionSubEntry({text: note}))
  })
}

function renderCharacter(characterName) {
  const baseCharacterModel = getCharacterModel(characterName);
  const characterModel = buildFinalizedCharacterModel(baseCharacterModel);
  let html = "";

  const panes = [

    // Pane 1 of 3 Core gameplay info and Actions
    new Pane([
      new PaneSection({
          entries: [
            // TODO - add editable HP field... though it'll be a unique case :/
            new SectionEntry({
              mainKeyText: "Hit Points",
              valueText: `${characterModel.hit_points.current} / ${characterModel.hit_points.total}`
            }),
            new SectionEntry({mainKeyText: "Armor Class", valueText: `${characterModel.armor_class}`})
          ]
        }
      ),
      new PaneSection({
        divider: new SectionDivider("Abilities"),
        entries: [
          actionKeyValue("Check", "Strength", characterModel.ability_scores.strength),
          actionKeyValue("Check", "Dexterity", characterModel.ability_scores.dexterity),
          actionKeyValue("Check", "Constitution", characterModel.ability_scores.constitution),
          actionKeyValue("Check", "Wisdom", characterModel.ability_scores.wisdom),
          actionKeyValue("Check", "Intelligence", characterModel.ability_scores.intelligence),
          actionKeyValue("Check", "Charisma", characterModel.ability_scores.charisma)
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Save Throws"),
        entries: [
          actionKeyValue("Save vs", "Reflex", characterModel.save_throws.dexterity),
          actionKeyValue("Save vs", "Fortitude", characterModel.save_throws.constitution),
          actionKeyValue("Save vs", "Will", characterModel.save_throws.wisdom),
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Skills & Special Abilities"),
        entries: [
          actionKeyValue("Perform", "Skill Check", characterModel.skills.skill_check_bonus, "When attempting: TODO - List of Skills"),
          new SectionEntry({mainKeyText: "TODO - Derive from list of special abilities"}),
          ...[] // TODO, pull Special Ability info from model
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Weapons & Attacks"),
        entries: [
          new SectionEntry({editButton: new EditButton("+ Equip a Weapon")}),
          weaponAndActions("Pipe Wrench", [
            new WeaponAttack("Strike", 1, false, "melee", 1, "1d4", ""),
            new WeaponAttack("Strike vs Heavy Armor", 3, false, "melee", 1, "1d4", "opponent is heavily armored")
          ]),
          ...[] // TODO, pull Attack info from model
        ]
      })
    ]),

    // Pane 2 of 3 Equipment and Effects
    new Pane([
      new PaneSection({
        divider: new SectionDivider("Armor"),
        entries: [ // TODO - fix alignment of Equip to align left if possible
          armor("Chest", "Wet Suit", "Water I: Bestows Bless - Water Mobility upon the wearer"),
          armor("Shield"),
          armor("Gloves", "Bracers of Armor +3"),
          armor("Head"),
          armor("Cloak"),
          armor("Boots"),
          armor("Neck", "Siren's Scale", "Water I: Grants access to The Siren as a Minor Patron in " +
            "addition to one 1st Degree Occult Spell Slot"),
          armor("Ring 1"),
          armor("Ring 2"),
          armor("Other")
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Effects"),
        entries: [
          new SectionEntry({editButton: new EditButton("+ Add an Effect")}),
          activeEffect("Bless - Water Mobility", "Permanent", "Can attack and perform basic actions unhindered while swimming. " +
            "Can maintain a consistent swimming speed similar to walking speed and can hold breath for 1 minute without " +
            "issue."),
          activeEffect("Enlarged", "4 Rounds", "Strength is set to 16, size is now Large"),
          ...[] // TODO - load effects from the character model
        ]
      })
    ]),

    // Pane 3 of 3 Character Bio and Class Details
    new Pane([
      new PaneSection({
        entries: [
          new SectionEntry({
            mainKeyText: "Total Character Level",
            valueText: characterModel.total_character_level,
            editButton: new EditButton("Level Up / Edit Levels")
          }), new SectionEntry({
            mainKeyText: "Base Attack Bonus",
            valueText: characterModel.attacks.base_bonus.display,
          }),
          new SectionEntry({
            mainKeyText: "Allowed Weapons",
            valueText: characterModel.equipment.allowed_weapons.display,
          }),
          new SectionEntry({
            mainKeyText: "Allowed Armor",
            valueText: characterModel.equipment.allowed_armor.display,
          })
        ]
      }),
      new PaneSection({ // TODO - only populate classes the character actually has levels in
        divider: new SectionDivider("Fighter"),
        entries: [
          classKeyValue("Fighter Level", "5"),
          classKeyValue("Additional Attacks", "1"),
          classKeyValue("Weapon Specializations", "2", [
            "Dagger & Sword I - +1 to Hit and Damage",
            "Dagger & Sword II - Critical hits on 19",
          ])
        ]
      }),
      ...[]  // TODO - load class data from model instead
    ]),
  ];

  document.documentElement.style.setProperty("--cs-color-character-bg", characterModel.color);
  document.documentElement.style.setProperty("--cs-color-character-text", getContrastColor(characterModel.color));

  document.getElementById("cs-right-pane").innerHTML = `
      <div id="cs-current-character">
        <div id="cs-current-character-heading" class="cs-row cs-padding-h cs-padding-v">
            <div class="cs-elem cs-width-full">${characterName}</div>
        </div>
        <div class="cs-panels">${panes.map(pane => pane.getHTML()).join("")}</div>
      </div>
    `;
}

function loadCharacter(event) {
  renderCharacter(event.target.textContent);
  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    if (characterListings[i] === event.target) {
      characterListings[i].classList.add("cs-character-listing-current");
    } else {
      characterListings[i].classList.remove("cs-character-listing-current");
    }
  }
}

window.onload = function () {
  setAppearance();

  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    characterListings[i].addEventListener("click", loadCharacter);
  }
};
