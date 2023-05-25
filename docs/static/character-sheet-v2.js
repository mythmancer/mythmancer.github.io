/* character models - just for demo */
const CHARACTER_MODELS = {
  "Pal Bonwater": {
    "name": "Pal Bonwater",
    "race": "Halfling",
    "title": "Elementalist",
    "meta": {
      "color": "#8386cc",
    },
    "hit_points": {
      "total": 17,
      "current": 16
    },
    "ability_scores": {
      "strength": 17,
      "dexterity": 12,
      "constitution": 9,
      "wisdom": 17,
      "intelligence": 16,
      "charisma": 16,
    },
    "equipment": {
      "armor": {
        "chest": {
          "name": "Wet Suit",
          "description": "Water I: Bestows Bless - Water Mobility upon the wearer",
          "equipped": true,
          "effects": [
            {
              "attribute": "misc",
              "description": "Can attack and perform basic actions unhindered while swimming. Can maintain a consistent swimming speed similar to walking speed and can hold breath for 1 minute without issue.",
            },
          ],
        },
        "gloves": {
          "name": "Bracers of Armor",
          "equipped": true,
          "effects": [
            {
              "attribute": "armor_class",
              "adjustment": 3,
              "operation": "add",
            },
          ]
        },
        "neck": {
          "name": "Siren's Scale",
          "equipped": true,
          "description": "Water I: Grants access to The Siren as a Minor Patron in addition to one 1st Degree Occult Spell Slot",
          "effects": [
            {
              "attribute": "warlock.l1_spell_slots",
              "adjustment": 2,
              "operation": "add",
            },
            {
              "attribute": "misc",
              "description": "Access to The Siren as a Minor Patron",
            },
          ],
        },
      },
    },
    "fighter": {
      "level": 5,
    },
    "rogue": {
      "level": 5,
    },
    "mage": {
      "level": 5,
    },
    "warlock": {
      "level": 5,
      "domain": "Elemental - Water",
      "major_patron": "Rath - Water Aspect",
    },
    "active_external_effects": [
      {
        "source": "Talisman (Inventory)",
        "attribute": "mage.l1_spell_slots",
        "adjustment": 1,
        "operation": "add",
        "duration": "While equipped",
        "is_external": true,
      },
      {
        "source": "Enlarged",
        "attribute": "ability_scores.strength",
        "adjustment": 16,
        "operation": "override",
        "duration": "4 Rounds",
        "is_external": true,
      },
      {
        "source": "Enlarged",
        "attribute": "misc",
        "description": "Size is now Large",
        "duration": "4 Rounds",
        "is_external": true,
      },
    ],
  },
  "Herakles": {
    "name": "Herakles",
    "race": "Orc",
    "title": "Grinner",
    "meta": {
      "color": "#7c0a0a",
    },
    "hit_points": {
      "total": 100000,
      "current": 18
    },
    "ability_scores": {
      "strength": 18,
      "dexterity": 3,
      "constitution": 2,
      "wisdom": 3,
      "intelligence": 4,
      "charisma": 5,
    },
    "equipment": {
      "armor": {
        "chest": {
          "name": "Buff af",
          "equipped": true,
        },
        "gloves": {
          "name": "Gloooooooves",
          "equipped": true,
          "effects": [
            {
              "attribute": "armor_class",
              "adjustment": 1,
              "operation": "add",
            },
          ]
        },
      },
    },
    "fighter": {
      "level": 9,
    },
    "rogue": {
      "level": 1,
    },
    "mage": {
      "level": 2,
    },
    "warlock": {
      "level": 3,
      "domain": "Elemental - Ice",
      "major_patron": "Belch",
    },
    "active_external_effects": [],
  },
  "Noam Gnomesky": {
    "name": "Noam Gnomesky",
    "race": "Halfling",
    "title": "Old Man",
    "meta": {
      "color": "#989898",
    },
    "hit_points": {
      "total": 2,
      "current": 1
    },
    "ability_scores": {
      "strength": 3,
      "dexterity": 1,
      "constitution": 2,
      "wisdom": 19,
      "intelligence": 10,
      "charisma": 15,
    },
    "equipment": {
      "armor": {
        "chest": {
          "name": "Sunken",
          "equipped": true,
        },
        "gloves": {
          "name": "Evening soiree gloves",
          "equipped": true,
          "effects": [
            {
              "attribute": "armor_class",
              "adjustment": 1,
              "operation": "add",
            }
          ],
        },
      },
    },
    "fighter": {
      "level": 0,
    },
    "rogue": {
      "level": 9,
    },
    "mage": {
      "level": 9,
    },
    "warlock": {
      "level": 9,
      "domain": "Arcana",
      "major_patron": "Some old dead thing",
    },
    "active_external_effects": [],
  },
};


/*******************************************************************
 **************************** CONSTANTS ****************************
 *******************************************************************/

CHARACTER_SHEET_STORAGE_KEY = "character_sheets_v2";
COLOR_MODE_STORAGE_KEY = "color_mode";
DISPLAY_MODE_STORAGE_KEY = "display_mode";
THEME_STORAGE_KEY = "theme";
TOOLTIP_POSITIONS = ["bottomleft", "bottomright", "topleft", "topright"];
EMPTY_CHARACTER_MODEL =   {
  "meta": {
    "color": "#8386cc",
  },
  "hit_points": {
    "current": 0
  },
  "active_external_effects": [],
};

/*******************************************************************
 *************************** APPEARANCE ****************************
 *******************************************************************/
COLOR_MODES = {
  dark: {
    "--cs-color-bg": "#252525",
    "--cs-color-section-bg": "#000000",
    "--cs-color-text": "#ffffff",
    "--cs-color-text-deemphasized": "#9f9f9f",
    "--cs-color-btn": "#52595c",
    "--cs-color-btn-text": "#ffffff",
  },
  light: {
    "--cs-color-bg": "#e5e5e5",
    "--cs-color-section-bg": "#ffffff",
    "--cs-color-text": "#000000",
    "--cs-color-text-deemphasized": "#5e5e5e",
    "--cs-color-btn": "#989898",
    "--cs-color-btn-text": "#000000",
  },
};

THEMES = {
  standard: {
    "--cs-font": "Baskervville",
    "--cs-font-size-lg": "24px",
    "--cs-font-size-std": "16px",
    "--cs-font-size-sm": "12px",
    "--cs-width-divider-left": "12px",
    "--cs-arrow-height": "2px",
    "--cs-arrow-width": "4px",
  },
  arcade: {
    "--cs-font": "HammerBro",
    "--cs-font-size-lg": "32px",
    "--cs-font-size-std": "20px",
    "--cs-font-size-sm": "16px",
    "--cs-width-divider-left": "16px",
    "--cs-arrow-height": "7px",
    "--cs-arrow-width": "10px",
  },
};

DISPLAY_MODES = {
  standard: {
    show_debug: false,
    show_dice_buttons: true,
  },
  advanced: {
    show_debug: false,
    show_dice_buttons: false,
  },
  debug: {
    show_debug: true,
    show_dice_buttons: true,
  },
};

function setAppearance() {
  const colorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) || "light";
  for (let prop in COLOR_MODES[colorMode]) {
    document.documentElement.style.setProperty(prop, COLOR_MODES[colorMode][prop]);
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY) || "standard";
  for (let prop in THEMES[theme]) {
    document.documentElement.style.setProperty(prop, THEMES[theme][prop]);
  }
}

function getDisplayMode() {
  const displayMode = window.localStorage.getItem(DISPLAY_MODE_STORAGE_KEY) || "standard";
  return DISPLAY_MODES[displayMode];
}

/*******************************************************************
 **************************** DATABASES ****************************
 *******************************************************************/

SPELL_SLOTS = {
  0: [0, 0, 0, 0, 0],
  1: [2, 0, 0, 0, 0],
  2: [3, 0, 0, 0, 0],
  3: [3, 1, 0, 0, 0],
  4: [3, 2, 0, 0, 0],
  5: [4, 2, 1, 0, 0],
  6: [4, 3, 2, 0, 0],
  7: [4, 3, 2, 1, 0],
  8: [4, 3, 3, 2, 0],
  9: [4, 4, 3, 2, 1],
};

MODIFIER_TABLE = {
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
  rogue: [0, 3, 5, 5, 6, 7, 8, 9, 10],
  mage: [0, 1, 2, 2, 3, 3, 4, 5, 5],
  fighter: [0, 1, 1, 1, 2, 2, 2, 3, 3],
  warlock: [0, 1, 1, 1, 2, 2, 2, 3, 3],
};


/**
 * The Effect schema:
 * * source: the item/spell/etc that caused the effect
 * * attribute: the attribute that this effect impacts. "misc" for generic effects
 * * adjustment: the numerical adjustment to the attribute. Only if attribute is NOT "misc"
 * * operation: how the numerical adjustment should be factored it - an override, or an add
 * * duration: duration, in D&D time units, of the effect
 * * is_external: if the effect is caused by something external to the character
 *                (like a spell that was cast on them, or they drank poison)
 * * hide_from_list: if this effect should be hidden from the displayed list. For instance,
 *                   Race effects are hidden since they're already factored in and don't need to
 *                   be consciously considered
 *
 * While specifying effects of equipment/inventory items::
 * * That impacts an attribute: only "attribute", "adjustment", "operation" are needed
 * * That is a generic effect: only "attribute", "description" are needed
 *
 * While specifying effects that are external (stored in character model): in addition to the above,
 * "source", "duration", "is_external" (set to true) are also needed
 */
EFFECTS = {
  "race": {
    "halfling": [
      {
        "source": "race",
        "attribute": "ability_scores.strength",
        "adjustment": -1,
        "operation": "add",
      },
      {
        "source": "race",
        "attribute": "ability_scores.dexterity",
        "adjustment": 1,
        "operation": "add",
      },
    ],
    "orc": [
      {
        "source": "race",
        "attribute": "ability_scores.strength",
        "adjustment": 1,
        "operation": "add",
      },
      {
        "source": "race",
        "attribute": "ability_scores.dexterity",
        "adjustment": -1,
        "operation": "add",
      },
    ],
  }
};

/*******************************************************************
 ****************** CHARACTER MODEL AND ATTRIBUTES *****************
 *******************************************************************/

function getNumericalCharacteristic(val) {
  return parseInt(val || "0");
}

ATTRIBUTES = {};

class Attribute {
  constructor({
    path,
    name = "",
    isIntrinsic = false,
    calculateFunction = null,
    formatFunction = null,
  }) {
    this.path = path;
    this.name = name || path;
    this.isIntrinsic = isIntrinsic;
    this.calculateFunction = calculateFunction || (characterData => {
      return {
        value: this.getValue(characterData),
        tooltip: "",
      };
    });
    this.formatFunction = formatFunction || (characterData => {
      return this.getValue(characterData);
    });
    ATTRIBUTES[path] = this;
  }

  get(characterModel) {
    return {
      value: this.getValue(characterModel),
      tooltip: this.getTooltip(characterModel),
    };
  }

  set(characterModel, valueAndTooltip) {
    this.setValue(characterModel, valueAndTooltip.value);
    this.setTooltip(characterModel, valueAndTooltip.tooltip);
  }

  getAttributeFromModel(model) {
    if (!model) {
      return null;
    }
    const propPath = this.path.split(".");
    let currLevel = model;
    for (let i = 0; i < propPath.length - 1; i++) {
      if (!currLevel || !currLevel.hasOwnProperty(propPath[i])) {
        return null;
      }
      currLevel = currLevel[propPath[i]];
    }
    return currLevel[propPath[propPath.length - 1]];
  }

  setAttributeInModel(model, value) {
    const propPath = this.path.split(".");
    let currLevel = model;
    for (let i = 0; i < propPath.length - 1; i++) {
      if (!currLevel.hasOwnProperty(propPath[i])) {
        currLevel[propPath[i]] = {};
      }
      currLevel = currLevel[propPath[i]];
    }
    currLevel[propPath[propPath.length - 1]] = value;
  }

  getTooltip(characterModel) {
    return this.getAttributeFromModel(characterModel.tooltips);
  }

  setTooltip(characterModel, tooltip) {
    this.setAttributeInModel(characterModel.tooltips, tooltip);
  }

  getValue(characterModel) {
    return this.getAttributeFromModel(characterModel);
  }

  setValue(characterModel, value) {
    this.setAttributeInModel(characterModel, value);
  }

  getDisplayString(characterModel) {
    return this.formatFunction(characterModel);
  }

  calculate(characterModel) {
    return this.calculateFunction(characterModel);
  }
}

NAME_ATTRIBUTE = new Attribute({
  path: "name",
  name: "Name",
  isIntrinsic: true,
});
RACE_ATTRIBUTE = new Attribute({
  path: "race",
  name: "Race",
  isIntrinsic: true,
});
TITLE_ATTRIBUTE = new Attribute({
  path: "title",
  name: "Title",
  isIntrinsic: true,
});
NAME_ATTRIBUTE = new Attribute({
  path: "experience",
  name: "Experience",
  isIntrinsic: true,
});

COLOR_ATTRIBUTE = new Attribute({
  path: "meta.color",
  isIntrinsic: true,
});
HIT_POINTS_TOTAL_ATTRIBUTE = new Attribute({
  path: "hit_points.total",
  name: "Total Hit Points",
  isIntrinsic: true,
  formatFunction: characterData => {
    return `${characterData.hit_points.current} / ${characterData.hit_points.total}`;
  },
});
HIT_POINTS_CURRENT_ATTRIBUTE = new Attribute({
  path: "hit_points.current",
  name: "Current Hit Points",
  isIntrinsic: true,
  formatFunction: characterData => {
    return `${characterData.hit_points.current} / ${characterData.hit_points.total}`;
  },
});
ABILITY_SCORES_STRENGTH_ATTRIBUTE = new Attribute({
  path: "ability_scores.strength",
  name: "Strength",
  isIntrinsic: true,
});
ABILITY_SCORES_DEXTERITY_ATTRIBUTE = new Attribute({
  path: "ability_scores.dexterity",
  name: "Dexterity",
  isIntrinsic: true,
});
ABILITY_SCORES_CONSTITUTION_ATTRIBUTE = new Attribute({
  path: "ability_scores.constitution",
  name: "Constitution",
  isIntrinsic: true,
});
ABILITY_SCORES_INTELLIGENCE_ATTRIBUTE = new Attribute({
  path: "ability_scores.intelligence",
  name: "Intelligence",
  isIntrinsic: true,
});
ABILITY_SCORES_WISDOM_ATTRIBUTE = new Attribute({
  path: "ability_scores.wisdom",
  name: "Wisdom",
  isIntrinsic: true,
});
ABILITY_SCORES_CHARISMA_ATTRIBUTE = new Attribute({
  path: "ability_scores.charisma",
  name: "Charisma",
  isIntrinsic: true,
});
FIGHTER_LEVEL_ATTRIBUTE = new Attribute({
  path: "fighter.level",
  name: "Fighter Level",
  isIntrinsic: true,
});
ROGUE_LEVEL_ATTRIBUTE = new Attribute({
  path: "rogue.level",
  name: "Rogue Level",
  isIntrinsic: true,
});
MAGE_LEVEL_ATTRIBUTE = new Attribute({
  path: "mage.level",
  name: "Mage Level",
  isIntrinsic: true,
});
WARLOCK_LEVEL_ATTRIBUTE = new Attribute({
  path: "warlock.level",
  name: "Warlock Level",
  isIntrinsic: true,
});
WARLOCK_DOMAIN_ATTRIBUTE = new Attribute({
  path: "warlock.domain",
  name: "Warlock Domain",
  isIntrinsic: true,
});
WARLOCK_MAJOR_PATRON_ATTRIBUTE = new Attribute({
  path: "warlock.major_patron",
  name: "Warlock Major Patron",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_CHEST_ATTRIBUTE = new Attribute({
  path: "equipment.armor.chest",
  name: "Chest Armor",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_SHIELD_ATTRIBUTE = new Attribute({
  path: "equipment.armor.shield",
  name: "Shield",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_GLOVES_ATTRIBUTE = new Attribute({
  path: "equipment.armor.gloves",
  name: "Gloves",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_HEAD_ATTRIBUTE = new Attribute({
  path: "equipment.armor.head",
  name: "Head Armor",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_CLOAL_ATTRIBUTE = new Attribute({
  path: "equipment.armor.cloak",
  name: "Cloak",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_BOOTS_ATTRIBUTE = new Attribute({
  path: "equipment.armor.boots",
  name: "Boots",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_NECK_ATTRIBUTE = new Attribute({
  path: "equipment.armor.neck",
  name: "Neck Armor",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_RING_1_ATTRIBUTE = new Attribute({
  path: "equipment.armor.ring1",
  name: "Ring #1",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_RING_2_ATTRIBUTE = new Attribute({
  path: "equipment.armor.ring2",
  name: "Ring #2",
  isIntrinsic: true,
});
EQUIPMENT_ARMOR_OTHER_ATTRIBUTE = new Attribute({
  path: "equipment.armor.other",
  name: "Other Armor",
  isIntrinsic: true,
});
ACTIVE_EXTERNAL_EFFECTS_ATTRIBUTE = new Attribute({
  path: "active_external_effects",
  isIntrinsic: true,
});
ACTIVE_EFFECTS_ATTRIBUTE = new Attribute({
  path: "active_effects",
  isIntrinsic: true,
  calculateFunction: characterData => {
    return {
      value: characterData.active_external_effects.concat(getActiveEffects(characterData)),
      tooltip: "",
    };
  }
});

// derived attributes
CHARACTER_LEVEL_ATTRIBUTE = new Attribute({
  path: "total_character_level",
  name: "Total Character Level",
  calculateFunction: characterData => {
    return {
      value: getNumericalCharacteristic(characterData.fighter.level)
        + getNumericalCharacteristic(characterData.mage.level)
        + getNumericalCharacteristic(characterData.rogue.level)
        + getNumericalCharacteristic(characterData.warlock.level),
      tooltip: "force? dyad?",
    };
  }
});

MODIFIERS_CHARISMA_ATTRIBUTE = new Attribute({
  path: "modifiers.charisma",
  name: "Charisma Modifier",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.charisma)],
      tooltip: "ah, a force dyad",
    };
  },
});

MODIFIERS_CONSTITUTION_ATTRIBUTE = new Attribute({
  path: "modifiers.constitution",
  name: "Constitution Modifier",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.constitution)],
      tooltip: "ah, a force dyad",
    };
  },
});

SAVE_THROWS_CONSTITUTION_ATTRIBUTE = new Attribute({
  path: "save_throws.constitution",
  name: "Constitution Save Throw",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.constitution)]
        + Math.floor(getNumericalCharacteristic(characterData.fighter.level) / 2)
        + Math.floor(getNumericalCharacteristic(characterData.mage.level) / 4)
        + Math.floor(getNumericalCharacteristic(characterData.rogue.level) / 4)
        + Math.floor(getNumericalCharacteristic(characterData.warlock.level) / 3),
      tooltip: "fortitude",
    };
  },
});

MODIFIERS_DEXTERITY_ATTRIBUTE = new Attribute({
  path: "modifiers.dexterity",
  name: "Dexterity Modifier",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.dexterity)],
      tooltip: "ah, a force dyad",
    };
  },
});

SAVE_THROWS_DEXTERITY_ATTRIBUTE = new Attribute({
  path: "save_throws.dexterity",
  name: "Dexterity Save Throw",
  calculateFunction: characterData => {
    // DEX + FGT/3 + MAG/3 + ROG/2 + WAR/4
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.dexterity)]
        + Math.floor(getNumericalCharacteristic(characterData.fighter.level) / 3)
        + Math.floor(getNumericalCharacteristic(characterData.mage.level) / 3)
        + Math.floor(getNumericalCharacteristic(characterData.rogue.level) / 2)
        + Math.floor(getNumericalCharacteristic(characterData.warlock.level) / 4),
      tooltip: "A ".repeat(200),
    };
  },
});

MODIFIERS_INTELLIGENCE_ATTRIBUTE = new Attribute({
  path: "modifiers.intelligence",
  name: "Intelligence Modifier",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.intelligence)],
      tooltip: "ah, a force dyad",
    };
  },
});

MODIFIERS_STRENGTH_ATTRIBUTE = new Attribute({
  path: "modifiers.strength",
  name: "Strength Modifier",
  calculateFunction: characterData => {
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.strength)],
      tooltip: "A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A ",
    };
  },
});

MODIFIERS_WISDOM_ATTRIBUTE = new Attribute({
  path: "modifiers.wisdom",
  name: "Wisdom Modifier",
  calculateFunction: characterData => {
    // table
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.wisdom)],
      tooltip: "ah, a force dyad",
    };
  },
});

SAVE_THROWS_WISDOM_ATTRIBUTE = new Attribute({
  path: "save_throws.wisdom",
  name: "Wisdom Save Throw",
  calculateFunction: characterData => {
    // WIS + FGT/4 + MAG/2 + ROG/3 + WAR/2
    return {
      value: MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.wisdom)]
        + Math.floor(getNumericalCharacteristic(characterData.fighter.level) / 4)
        + Math.floor(getNumericalCharacteristic(characterData.mage.level) / 2)
        + Math.floor(getNumericalCharacteristic(characterData.rogue.level) / 3)
        + Math.floor(getNumericalCharacteristic(characterData.warlock.level) / 2),
      tooltip: "ah, a force dyad",
    };
  },
});

HIT_POINTS_HIT_DIE_ATTRIBUTE = new Attribute({
  path: "hit_points.hit_die",
  name: "Hit Die",
  calculateFunction: characterData => {
    // FGT + MAG + ROG + WAR
    return {
      value: getNumericalCharacteristic(characterData.fighter.level)
        + getNumericalCharacteristic(characterData.mage.level)
        + getNumericalCharacteristic(characterData.rogue.level)
        + getNumericalCharacteristic(characterData.warlock.level),
      tooltip: "ah, a force dyad",
    };
  },
});

ATTACKS_BASE_BONUS_ATTRIBUTE = new Attribute({
  path: "attacks.base_bonus",
  name: "Base Attack Bonus",
  calculateFunction: characterData => {
    // FGT + MAG/4 + ROG/2 + WAR/2
    return {
      value: getNumericalCharacteristic(characterData.fighter.level)
        + Math.floor(getNumericalCharacteristic(characterData.mage.level) / 4)
        + Math.floor(getNumericalCharacteristic(characterData.rogue.level) / 2)
        + Math.floor(getNumericalCharacteristic(characterData.warlock.level) / 2),
      tooltip: "ah, a force dyad",
    };
  },
});

ATTACKS_NUMBER_OF_ATTACKS_ATTRIBUTE = new Attribute({
  path: "attacks.number_of_attacks",
  name: "Number of Attacks",
  calculateFunction: characterData => {
    // max(1 + (FGT-1)/4, 1)
    return {
      value: Math.max(
        Math.floor(1 + (getNumericalCharacteristic(characterData.fighter.level) - 1) / 4),
        1,
      ),
      tooltip: "ah, a force dyad",
    };
  },
});

EQUIPMENT_ALLOWED_ARMOR_ATTRIBUTE = new Attribute({
  path: "equipment.allowed_armor",
  name: "Allowed Armor",
  calculateFunction: characterData => {
    // if(FGT > 0, "Heavy + Shields", if(WAR > 0, "Medium", if(ROG > 0, "Light", "None")))
    let allowedArmor;

    if (getNumericalCharacteristic(characterData.fighter.level) > 0) {
      allowedArmor = "Heavy + Shields";
    } else if (getNumericalCharacteristic(characterData.warlock.level) > 0) {
      allowedArmor = "Medium";
    } else if (getNumericalCharacteristic(characterData.rogue.level) > 0) {
      allowedArmor = "Light";
    } else {
      allowedArmor = "None";
    }

    return {
      value: allowedArmor,
      tooltip: "ah, a force dyad",
    };
  },
});


EQUIPMENT_ALLOWED_WEAPONS_ATTRIBUTE = new Attribute({
  path: "equipment.allowed_weapons",
  name: "Allowed Weapons",
  calculateFunction: characterData => {
    // if(FGT > 0, "Martial", if(ROG+WAR > 0, "Standard", "Simple"))
    let allowedWeapons;

    if (getNumericalCharacteristic(characterData.fighter.level) > 0) {
      allowedWeapons = "Martial";
    } else if (getNumericalCharacteristic(characterData.warlock.level) > 0) {
      allowedWeapons = "Standard";
    } else if (getNumericalCharacteristic(characterData.rogue.level) > 0) {
      allowedWeapons = "Standard";
    } else {
      allowedWeapons = "Simple";
    }

    return {
      value: allowedWeapons,
      tooltip: "ah, a force dyad",
    };
  },
});

SKILLS_SKILL_CHECK_BONUS_ATTRIBUTE = new Attribute({
  path: "skills.skill_check_bonus",
  name: "Skill Check Bonus",
  calculateFunction: characterData => {
    // ROG + MAG/2 + FGT/4 + WAR/4
    return {
      value: Math.floor(getNumericalCharacteristic(characterData.mage.level) / 2)
        + getNumericalCharacteristic(characterData.rogue.level)
        + Math.floor(getNumericalCharacteristic(characterData.fighter.level) / 4)
        + Math.floor(getNumericalCharacteristic(characterData.warlock.level) / 4),
      tooltip: "ah, a force dyad",
    };
  },
});

SKILLS_MAX_SKILL_PROFICIENCIES_ATTRIBUTE = new Attribute({
  path: "skills.max_skill_proficiencies",
  name: "Max Skill Proficiencies",
  calculateFunction: characterData => {
    // table
    return {
      value: SKILL_PROFICIENCY_TABLE.mage[getNumericalCharacteristic(characterData.mage.level) - 1]
        + SKILL_PROFICIENCY_TABLE.rogue[getNumericalCharacteristic(characterData.rogue.level) - 1]
        + SKILL_PROFICIENCY_TABLE.fighter[getNumericalCharacteristic(characterData.fighter.level) - 1]
        + SKILL_PROFICIENCY_TABLE.warlock[getNumericalCharacteristic(characterData.warlock.level) - 1],
      tooltip: "ah, a force dyad",
    };
  },
});

FIGHTER_ADDITIONAL_ATTACKS = new Attribute({
  path: "fighter.additional_attacks",
  name: "Additional Attacks",
  calculateFunction: characterData => {
    // TODO
    return {
      value: 1,
      tooltip: "Hardcoded; needs to implemented",
    };
  },
});

FIGHTER_WEAPON_SPECIALIZATIONS = new Attribute({
  path: "fighter.weapon_specializations",
  name: "Weapon Specializations",
  calculateFunction: characterData => {
    // TODO
    return {
      value: 2,
      tooltip: "Hardcoded; needs to implemented",
    };
  },
});

ROGUE_SKILL_SPECIALIZATIONS = new Attribute({
  path: "rogue.skill_specializations",
  name: "Skill Specializations",
  calculateFunction: characterData => {
    // TODO
    return {
      value: 1,
      tooltip: "Hardcoded; needs to implemented",
    };
  },
});

MAGE_ARCANE_CASTING_IN_ARMOR_ATTRIBUTE = new Attribute({
  path: "mage.arcane_casting_in_armor",
  name: "Arcane Casting In Armor",
  calculateFunction: characterData => {
    // TODO
    return {
      value: 3,
      tooltip: "Hardcoded; needs to implemented",
    };
  },
  formatFunction: characterData => {
    return `Up to ${characterData.mage.arcane_casting_in_armor}rd Degree`;
  },
});

MAGE_MAX_SPELLS_LEARNABLE_ATTRIBUTE = new Attribute({
  path: "mage.max_spells_learnable_per_degree",
  name: "Max Spells Learnable Per Degree",
  calculateFunction: characterData => {
    // 5 + INT
    return {
      value: 5 + MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.intelligence)],
      tooltip: "ah, a force dyad",
    };
  },
});

WARLOCK_MAX_MINOR_PATRONS_ATTRIBUTE = new Attribute({
  path: "warlock.max_minor_patrons",
  name: "Max Minor Patrons",
  calculateFunction: characterData => {
    // min(1 + CHA, (WAR+1)/2)
    return {
      value: Math.min(
        1 + MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.charisma)],
        Math.floor((getNumericalCharacteristic(characterData.warlock.level) + 1) / 2)
      ),
      tooltip: "ah, a force dyad",
    };
  },
  formatFunction: characterData => {
    return `Up to ${characterData.warlock.max_minor_patrons}`;
  }
});

WARLOCK_L1_SLOTS_ATTRIBUTE = new Attribute({
  path: "warlock.l1_spell_slots",
  name: "Level 1 Occult Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.warlock.level)][0],
      tooltip: "ah, a force dyad",
    };
  },
});

WARLOCK_L2_SLOTS_ATTRIBUTE = new Attribute({
  path: "warlock.l2_spell_slots",
  name: "Level 2 Occult Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.warlock.level)][1],
      tooltip: "ah, a force dyad",
    };
  },
});

WARLOCK_L3_SLOTS_ATTRIBUTE = new Attribute({
  path: "warlock.l3_spell_slots",
  name: "Level 3 Occult Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.warlock.level)][2],
      tooltip: "ah, a force dyad",
    };
  },
});

WARLOCK_L4_SLOTS_ATTRIBUTE = new Attribute({
  path: "warlock.l4_spell_slots",
  name: "Level 4 Occult Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.warlock.level)][3],
      tooltip: "ah, a force dyad",
    };
  },
});

WARLOCK_L5_SLOTS_ATTRIBUTE = new Attribute({
  path: "warlock.l5_spell_slots",
  name: "Level 5 Occult Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.warlock.level)][4],
      tooltip: "ah, a force dyad",
    };
  },
});

MAGE_L1_SLOTS_ATTRIBUTE = new Attribute({
  path: "mage.l1_spell_slots",
  name: "Level 1 Arcane Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.mage.level)][0],
      tooltip: "ah, a force dyad",
    };
  },
});

MAGE_L2_SLOTS_ATTRIBUTE = new Attribute({
  path: "mage.l2_spell_slots",
  name: "Level 2 Arcane Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.mage.level)][1],
      tooltip: "ah, a force dyad",
    };
  },
});

MAGE_L3_SLOTS_ATTRIBUTE = new Attribute({
  path: "mage.l3_spell_slots",
  name: "Level 3 Arcane Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.mage.level)][2],
      tooltip: "ah, a force dyad",
    };
  },
});

MAGE_L4_SLOTS_ATTRIBUTE = new Attribute({
  path: "mage.l4_spell_slots",
  name: "Level 4 Arcane Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.mage.level)][3],
      tooltip: "ah, a force dyad",
    };
  },
});

MAGE_L5_SLOTS_ATTRIBUTE = new Attribute({
  path: "mage.l5_spell_slots",
  name: "Level 5 Arcane Spell Slots",
  calculateFunction: characterData => {
    return {
      value: SPELL_SLOTS[getNumericalCharacteristic(characterData.mage.level)][4],
      tooltip: "ah, a force dyad",
    };
  },
});

ARMOR_CLASS_ATTRIBUTE = new Attribute({
  path: "armor_class",
  name: "Armor Class",
  calculateFunction: characterData => {
    let dexMod = MODIFIER_TABLE[getNumericalCharacteristic(characterData.ability_scores.dexterity)];

    return {
      value: 10 + dexMod,
      tooltip: `add ${dexMod} from dex`,
    };
  },
});

function getActiveEffects(characterModel) {
  const effects = [];

  const raceEffects = EFFECTS.race[characterModel.race.toLowerCase()];
  for (let i = 0; i < raceEffects.length; i++) {
    effects.push({
      source: `Race: ${characterModel.race}`,
      attribute: raceEffects[i].attribute,
      adjustment: raceEffects[i].adjustment,
      operation: raceEffects[i].operation,
      duration: "Permanent",
      hide_from_list: true,
    });
  }

  const equipments = characterModel.equipment;
  const armor = equipments.armor;
  for (let armorType in armor) {
    const equipment = armor[armorType];
    if (!equipment || !equipment.equipped || !equipment.effects) {
      // skip if not equipped, or has no effects
      continue ;
    }
    for (let i = 0; i < equipment.effects.length; i++) {
      const armorName = ATTRIBUTES[`equipment.armor.${armorType}`].name;
      effects.push({
        source: `${equipment.name} (${armorName})`,
        attribute: equipment.effects[i].attribute,
        adjustment: equipment.effects[i].adjustment,
        description: equipment.effects[i].description,
        operation: equipment.effects[i].operation,
        duration: "While equipped",
        hide_from_list: equipment.effects[i].attribute === "armor_class",
      });
    }
  }
  return effects;
}

function buildFinalizedCharacterModel(baseCharacterModel) {
  const finalizedCharacterModel = structuredClone(baseCharacterModel);
  finalizedCharacterModel.tooltips = {};

  // populate initial intrinsic attributes
  for (let attribute in ATTRIBUTES) {
    if (!ATTRIBUTES[attribute].isIntrinsic) {
      continue ;
    }
    ATTRIBUTES[attribute].set(
      finalizedCharacterModel,
      ATTRIBUTES[attribute].calculate(finalizedCharacterModel)
    );
  }

  // apply effects, in multiple steps
  const overriddenAttributes = [];
  const effects = finalizedCharacterModel.active_effects;

  // first resolve effects on intrinsic attributes
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    if (effect.attribute === "misc" || overriddenAttributes.includes(effect.attribute) || !ATTRIBUTES[effect.attribute].isIntrinsic) {
      continue ;
    }

    const previousValue = ATTRIBUTES[effect.attribute].get(finalizedCharacterModel);
    if (effect.operation === "add") {
      ATTRIBUTES[effect.attribute].set(finalizedCharacterModel, {
        value: previousValue.value + effect.adjustment,
        tooltip: previousValue.tooltip + ` ${previousValue.tooltip ? "| " : ""}add ${effect.adjustment} from ${effect.source}`,
      });
    } else if (effect.operation === "override") {
      ATTRIBUTES[effect.attribute].set(finalizedCharacterModel, {
        value: effect.adjustment,
        tooltip: previousValue.tooltip + ` ${previousValue.tooltip ? "| " : ""}override of ${effect.adjustment} from ${effect.source}`,
      });
      overriddenAttributes.push(effect.attribute);
    }
  }

  // calculate derived attributes
  for (let attribute in ATTRIBUTES) {
    if (ATTRIBUTES[attribute].isIntrinsic) {
      continue ;
    }
    ATTRIBUTES[attribute].set(finalizedCharacterModel, ATTRIBUTES[attribute].calculate(finalizedCharacterModel));
  }

  // finally, resolve effects on derived attributes
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    if (effect.attribute === "misc" || overriddenAttributes.includes(effect.attribute) || ATTRIBUTES[effect.attribute].isIntrinsic) {
      continue ;
    }

    const previousValue = ATTRIBUTES[effect.attribute].get(finalizedCharacterModel) || 0;
    if (effect.operation === "add") {
      ATTRIBUTES[effect.attribute].set(finalizedCharacterModel, {
        value: previousValue.value + effect.adjustment,
        tooltip: previousValue.tooltip + ` ${previousValue.tooltip ? "| " : ""}add ${effect.adjustment} from ${effect.source}`,
      });
    } else if (effect.operation === "override") {
      ATTRIBUTES[effect.attribute].set(finalizedCharacterModel, {
        value: effect.adjustment,
        tooltip: previousValue.tooltip + ` ${previousValue.tooltip ? "| " : ""}override of ${effect.adjustment} from ${effect.source}`,
      });
    }
  }
  return finalizedCharacterModel;
}

function getCharacterModel(characterName) {
  return JSON.parse(window.localStorage.getItem(CHARACTER_SHEET_STORAGE_KEY))[characterName];
}

function addCharacterModel(characterModel) {
  const characters = JSON.parse(window.localStorage.getItem(CHARACTER_SHEET_STORAGE_KEY));
  characters[characterModel.name] = characterModel;
  window.localStorage.setItem(CHARACTER_SHEET_STORAGE_KEY, JSON.stringify(characters));
}

function deleteCharacterModel(characterName) {
  const characters = JSON.parse(window.localStorage.getItem(CHARACTER_SHEET_STORAGE_KEY));
  delete characters[characterName];
  window.localStorage.setItem(CHARACTER_SHEET_STORAGE_KEY, JSON.stringify(characters));
}

function listCharacters(characterName) {
  return Object.keys(JSON.parse(window.localStorage.getItem(CHARACTER_SHEET_STORAGE_KEY)));
}

/*******************************************************************
 ************************* HTML COMPONENTS *************************
 *******************************************************************/

// storing component mappings for current character - this allows us to have a class attached to relevant
// UI components to make it easy to build complex logic. This way, the component can define its logic
// (example, die rolling), and we can easily connect it to the div using ids
COMPONENT_STORE = {};

class HTMLComponent {
  constructor({
    listeners = null,
    initializer = null,
  }) {
    this.listeners = listeners;
    this.initializer = initializer;
    this.id = crypto.randomUUID();
    // if either explicitly asked, or if it has listeners, store the component so that we can
    // manipulate it after creation
    // Note: individual components must decide where to attach the id
    if (this.shouldStoreComponent() || this.listeners) {
      COMPONENT_STORE[this.id] = this;
    }
  }

  getUIElement() {
    return document.getElementById(this.id);
  }

  shouldStoreComponent() {
    return false;
  }

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
    super({});
    this.sections = sections;
  }

  getHTML() {
    return `
    <div class="cs-panel cs-col cs-padding-v">
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
    super({});
    this.divider = divider;
    this.entries = entries;
  }

  getHTML() {
    return `
    <div class="cs-col cs-section">
        ${this.divider == null ? "" : this.divider.getHTML()}
        <div class="cs-col">
            ${this.entries.map((entry) => entry.getHTML()).join("")}
        </div>
    </div>
    `;
  }
}

class FormSection extends HTMLComponent {
  /**
   * TODO
   */
  constructor({
    formName = null,
    divider = null,
    entries = [],
    isFirstPhase = false,
    hasNext = False,
  }) {
    super({});
    this.divider = divider;
    this.entries = entries;
    this.isFirstPhase = isFirstPhase;
    if (hasNext) {
      this.entries.push(new SectionEntry({
        editButton: new NextButton(),
      }));
    } else {
      this.entries.push(new SectionEntry({
        editButton: new FinishButton(formName, EMPTY_CHARACTER_MODEL, ATTRIBUTES),
      }));
    }
  }

  getHTML() {
    return `
    <div class="cs-col cs-section ${this.isFirstPhase ? "" : "hidden"}">
        ${this.divider == null ? "" : this.divider.getHTML()}
        <div class="cs-col">
            ${this.entries.map((entry) => entry.getHTML()).join("")}
        </div>
    </div>
    `;
  }
}

class FormSectionInputEntry extends HTMLComponent {
  constructor({
    formName = null,
    mainKeyText = "",
    attribute = null,
    numerical = false,
  }) {
    super({});
    this.mainKeyText = mainKeyText;
    this.formName = formName;
    this.attribute = attribute;
    this.numerical = numerical;
  }

  getHTML() {
    return `
    <div class="cs-col cs-padding-h cs-section-entry">
       <div class="cs-row">
          <div class="cs-elem">${this.mainKeyText}</div>
          <div class="cs-elem"><input class="${this.formName} ${this.numerical ? "numerical" : ""}" type="text" id="${this.formName}-attribute-${this.attribute}"></div>
       </div>
    </div>`;
  }
}

class SectionDivider extends HTMLComponent {
  /**
   * Optional title of a section
   * @param {string} heading Title text of the section, flanked by horizontal lines
   */
  constructor(heading) {
    super({});
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
   * Either provide (characterModel, attribute) or (value, tooltip).
   *
   * @param {string} shortKeyText Optional short key of fixed width on the far left of the main row
   * @param {DiceButton} diceButton Optional button to roll dice associated with this entry
   * @param {string} mainKeyText Optional text for the left side of the main row in a key-value pair
   * @param {object} characterModel Character Model to use for data
   * @param {string} attribute Attribute to fetch from characterModel
   * @param {string} value to be displayed
   * @param {string} tooltip Optional HTML for the tooltip of this entry
   * @param {EditButton} editButton Optional button to edit this entry on the far right of the main row
   * @param {SectionSubEntry[]} subEntries Optional vertical list of small-text descriptors beneath the main row
   */
  constructor({
                shortKeyText = "",
                diceButton = null,
                mainKeyText = "",

                characterModel = null,
                attribute = null,
                value = null,
                tooltip = null,

                editButton = null,
                subEntries = []
              }) {
    super({});
    this.shortKeyText = shortKeyText;
    this.diceButton = diceButton;
    this.mainKeyText = mainKeyText;
    this.editButton = editButton;
    this.subEntries = subEntries;

    if (value != null) {
      this.value = value;
      this.tooltip = tooltip;
    } else if (attribute != null) {
      this.value = ATTRIBUTES[attribute].getDisplayString(characterModel);
      this.tooltip = ATTRIBUTES[attribute].getTooltip(characterModel);
    } else {
      this.value = "";
      this.tooltip = "";
    }
  }

  getHTML() {
    return `
    <div class="cs-col cs-padding-h cs-section-entry">
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
          ${this.value === "" ? `
            ${this.editButton == null ? "" : this.editButton.getHTML()}
          ` : `
            <div class="cs-row">
              ${this.value === "" ? "" : `
              <div class="cs-elem cs-width-full ${this.tooltip ? "cs-has-tooltip" : ""}">
                ${this.value}
                ${this.tooltip ? `<div class="cs-tooltiptext">${this.tooltip}</div>` : ""}
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
                button = null,
                text = ""
              }) {
    super({});
    this.button = button;
    this.text = text;
  }

  getHTML() {
    return `
    <div class="cs-row">
        ${this.button == null ? "" : this.button.getHTML()}
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
  constructor(text, formula) {
    super({
      listeners: {
        "click": function() {
          const result = rollFormula(formula);
          logDieRoll(text, result);
        },
      },
    });
    this.text = text;
    this.formula = formula;
  }

  getHTML() {
    return `
    <div id="${this.id}" class="cs-btn cs-font-size-sm cs-font-color-character cs-padding-h cs-line-height-btn cs-width-fill cs-color-character-bg ${getDisplayMode().show_dice_buttons ? "" : "hidden"}">
        ⚅ ${this.text}
    </div>
    `;
  }
}

class NextButton extends HTMLComponent {
  /**
   * Button that goes to the next step in the current flow
   */
  constructor() {
    super({
      listeners: {
        "click": function(event) {
          const currentSection = event.target.closest(".cs-section");
          let nextSection = currentSection.nextElementSibling;
          if (!nextSection) {
            // bottom of panel, go to next
            nextSection = currentSection.closest(".cs-panel").nextElementSibling.children[0];
          }
          nextSection.classList.remove("hidden");
        },
      },
    });
  }

  getHTML() {
    return `
    <div id="${this.id}" class="cs-btn cs-font-size-sm cs-font-color-character cs-padding-h cs-line-height-btn cs-width-fill cs-color-character-bg">
        Next
    </div>
    `;
  }
}

class FinishButton extends HTMLComponent {
  /**
   * Button that completes a form by collecting all the data from it
   * The class of the input elements should be ${formName}, their ids should be
   *  ${formName}-${attributePath}, where ${attributePath} defines how they get
   *  populated into the resulting json
   */
  constructor(formName, baseModel, attributeDataBase) {
    super({
      listeners: {
        "click": function(event) {
          const inputs = event.target.closest(".cs-panels").getElementsByClassName(formName);
          const model = structuredClone(baseModel);
          for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const attribute = input.id.substr(formName.length + "-attribute-".length);
            const value = input.classList.contains("numerical") ? parseInt(input.value) : input.value;
            attributeDataBase[attribute].setValue(model, value);
          }
          addCharacterModel(model);
          renderPage();
        },
      },
    });
  }

  getHTML() {
    return `
    <div id="${this.id}" class="cs-btn cs-font-size-sm cs-font-color-character cs-padding-h cs-line-height-btn cs-width-fill cs-color-character-bg">
        Finish
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
    super({});
    this.text = text;
  }

  getHTML() {
    return `
    <div id="${this.id}" class="cs-btn cs-font-size-sm cs-padding-h cs-line-height-btn cs-width-fill cs-color-btn">
        ${this.text}
    </div>
    `;
  }
}

class CharacterListing extends HTMLComponent {
  /**
   * Single listing of a character on the navigation pane
   * @param {string} characterName Name of character
   */
  constructor(characterName, isCurrentCharacter) {
    super({
      listeners: {
        "click": function(event) {
        renderPage(characterName);
      }},
    });
    this.characterName = characterName;
    this.isCurrentCharacter = isCurrentCharacter;
  }

  _getCharacterIdentifier(characterName) {
    const baseCharacterModel = getCharacterModel(characterName);
    const totalCharacterLevel = CHARACTER_LEVEL_ATTRIBUTE.calculate(baseCharacterModel).value;
    return `${characterName} - Level ${totalCharacterLevel} ${baseCharacterModel.title}`;
  }

  getHTML() {
    return `<div id="${this.id}" class="cs-left-pane-listing ${this.isCurrentCharacter ? "cs-character-listing-current" : ""}">${this._getCharacterIdentifier(this.characterName)}</div>`;
  }
}


class CharacterListings extends HTMLComponent {
  /**
   * Listing of known characters to be shown on the left navigation pane
   * @param {string} characterNames List of character identifiers
   */
  constructor(characterNames, currentCharacterName) {
    super({});
    this.characterNames = characterNames;
    this.currentCharacterName = currentCharacterName;
  }

  getHTML() {
    return `
    ${this.characterNames.map(characterName => new CharacterListing(characterName, this.currentCharacterName === characterName).getHTML()).join("")}
    `;
  }
}

class DieLogEntry extends HTMLComponent {
  /**
   * Single entry in the die log
   * @param {string} tag Name of the roll (check, save vs, etc)
   * @param {number} result Result of the roll
   */
  constructor(tag, result) {
    super({});
    this.tag = tag;
    this.result = result;
    this.time = new Date();
  }

  getHTML() {
    return `<div class="cs-die-log-entry">${this.time.toTimeString().substr(0, 8)} - ${this.tag} for ${this.result}</div>`;
  }
}

class SettingDropDown extends HTMLComponent {
  /**
   * A label and a dropdown next to it
   * @param {string} label The label to be displayed
   * @param {map} setting The setting this modifies
   * @param {function} callback Callback on option selection
   */
  constructor(label, setting, initialValue, callback) {
    super({
      "listeners": {
        "change": function() {
          if (callback) {
            callback(this.value);
          }
        },
      },
      "initializer": function() {
        this.getUIElement().value = initialValue;
      },
    });
    this.label = label;
    this.setting = setting;
    this.callback = callback;
  }

  getHTML() {
    return `
<div class="cs-setting-dropdown">
  <div class="cs-label">${this.label}</div>
  <div class="cs-filler-h"></div>
  <select id="${this.id}">
    ${Object.keys(this.setting).map(entry => `<option value="${entry}">${entry}</option>`).join("")}
  </select>
</div>
    `;
  }
}

class SettingsPanel extends HTMLComponent {
  constructor() {
    super({});
  }

  setColorTheme(colorMode) {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
    setAppearance();
  }

  setTheme(theme) {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    setAppearance();
  }

  setDisplayMode(displayMode) {
    window.localStorage.setItem(DISPLAY_MODE_STORAGE_KEY, displayMode);
    renderPage();
  }

  getHTML() {
    return `
${new SettingDropDown("Color Mode", COLOR_MODES, window.localStorage.getItem(COLOR_MODE_STORAGE_KEY), this.setColorTheme).getHTML()}
${new SettingDropDown("Display Mode", DISPLAY_MODES, window.localStorage.getItem(DISPLAY_MODE_STORAGE_KEY), this.setDisplayMode).getHTML()}
${new SettingDropDown("Theme", THEMES, window.localStorage.getItem(THEME_STORAGE_KEY), this.setTheme).getHTML()}`;
  }
}

/*******************************************************************
 *********************** COMPOSITE COMPONENTS **********************
 *******************************************************************/

/**
 * Entry with dice button, key, and value.
 *
 * Used for: Ability Scores, Save Throws, Skill Check
 *
 * @param {string} action
 * @param {string} key
 * @param {object} characterModel
 * @param {string} attribute
 * @param {string} description
 */
function actionKeyValue(action, key, characterModel, attribute, description = "", diceFormula = "") {
  return new SectionEntry({
    diceButton: new DiceButton(action, diceFormula),
    mainKeyText: key,
    characterModel: characterModel,
    attribute: attribute,
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
      button: new DiceButton(attack.verb, attack.damageFormula),
      text: attack.description()
    }))
  });
}

function spellSlots(key, characterModel, classType) {
  const classInfo = characterModel[classType];
  const tooltipsInfo = characterModel.tooltips[classType];
  const spellSlots = [];
  const tooltips = [];
  for (let i = 1; i <= 5; i++) {
    spellSlots.push(classInfo[`l${i}_spell_slots`]);
    tooltips.push(`Level ${i}: ` + tooltipsInfo[`l${i}_spell_slots`]);
  }
  return new SectionEntry({
    mainKeyText: key,
    value: spellSlots.join(" / "),
    tooltip: tooltips.join("</br>"),
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
 * @param {object} characterModel
 * @param {string} attribute
 */
function armor(part, characterModel, attribute) {
  const item = ATTRIBUTES[attribute].getValue(characterModel);
  if (!item || item === undefined || item === {} || !item.equipped) {
    return new SectionEntry({
      shortKeyText: part,
      editButton: new EditButton("Equip")
    });
  } else {
    return new SectionEntry({
      shortKeyText: part,
      mainKeyText: item.name,
      editButton: new EditButton("Edit / Remove"),
      subEntries: item.description ? [new SectionSubEntry({text: item.description})] : [],
    });
  }
}

/**
 * An entry displaying a (typically temporary) effect on the character such as a spell buff
 *
 * @param {string} source name of these effects
 * @param {list[object]} effects list of effects from this source
 */
function effectEntry(source, effects) {
  const subEntries = [];
  let isExternal = false;
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    if (effect.is_external) {
      isExternal = true;
    }
    let description = effect.description;
    if (!description) {
      if (effect.operation === "add") {
        description = `Adds ${effect.adjustment} to ${ATTRIBUTES[effect.attribute].name}`;
      } else if (effect.operation === "override") {
        description = `Overrides ${ATTRIBUTES[effect.attribute].name} to ${effect.adjustment}`;
      }
    }
    subEntries.push(new SectionSubEntry({text: `${description} | Duration: ${effect.duration}`}));
    // subEntries.push(new SectionSubEntry({text: `Duration: ${effect.duration}`}));
  }

  return new SectionEntry({
    mainKeyText: source,
    editButton: isExternal ? new EditButton("Edit / Remove") : null,
    subEntries: subEntries,
  });
}

function effectsEntries(characterModel) {
  const activeEffects = characterModel.active_effects;
  const effectsBySource = {};
  for (let i = 0; i < activeEffects.length; i++) {
    const effect = activeEffects[i];
    if (effectsBySource.hasOwnProperty(effect.source)) {
      effectsBySource[effect.source].push(effect);
    } else {
      effectsBySource[effect.source] = [effect];
    }
  }

  const effectsEntries = [];
  for (let effectSource in effectsBySource) {
    // hide from the list only if all effects from this source should be hidden
    let hideFromList = true;
    for (let i = 0; i < effectsBySource[effectSource].length; i++) {
      if (!effectsBySource[effectSource][i].hide_from_list) {
        hideFromList = false;
      }
    }

    if (!getDisplayMode().show_debug && hideFromList) {
      continue ;
    }

    console.log(effectSource, effectsBySource[effectSource])
    effectsEntries.push(effectEntry(effectSource, effectsBySource[effectSource]));
  }
  return effectsEntries;
}

/**
 * Entry about class data containing simple key-value pairs and optional notes
 *
 * @param {string} key
 * @param {object} characterModel
 * @param {string} attribute
 * @param {string[]} notes
 */
function classKeyValue(key, characterModel, attribute, notes = []) {
  return new SectionEntry({
    mainKeyText: key,
    characterModel: characterModel,
    attribute: attribute,
    subEntries: notes.map(note => new SectionSubEntry({text: note}))
  });
}

/*******************************************************************
 **************************** UTILITIES ****************************
 *******************************************************************/

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
   * @param {string} damageFormula
   * @param {string} condition free-form string of conditions this class requires e.g. "opponent is heavily armored"
   */
  constructor(verb, numberOfAttacks, isFast, range, bonusToHit, damageFormula, condition) {
    this.verb = verb;
    this.numberOfAttacks = numberOfAttacks;
    this.isFast = isFast;
    this.range = range;
    this.bonusToHit = bonusToHit;
    this.damageFormula = damageFormula;
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
      dealing ${this.damageFormula} damage${this.condition === "" ? "" : ` if ${this.condition}`}`;
  }
}

function logDieRoll(tag, result) {
  document.getElementById("cs-die-log").innerHTML = new DieLogEntry(tag, result).getHTML() + document.getElementById("cs-die-log").innerHTML;
}

function rollDice(numDie, die) {
  let result = 0;
  for (let i = 0; i < numDie; i++) {
    result += Math.floor(Math.random() * parseInt(die)) + 1;
  }
  return result;
}

/**
 * Roll a formula - expects a series of ((\d+d\d+)|\d+)(( \+ ((\d+d\d+)|\d+))*)?
 * Essentially, each component of a formula joined by " + "
 * Each component is either:
 * * (\d+d\d+): <number>d<number>, aka, a die roll, or
 * * \d+: a constant
 * Currently only allows for adding roll components
 */
function rollFormula(formula) {
  const formulaComponents = formula.split(" + ");
  let result = 0;
  for (let i = 0; i < formulaComponents.length; i++) {
    const formulaComponent = formulaComponents[i];
    if (formulaComponent.search("d") != -1) {
      [numDie, die] = formulaComponent.split("d");
      result += rollDice(parseInt(numDie), parseInt(die));
    } else {
      result += parseInt(formulaComponent);
    }
  }
  return result;
}

/*******************************************************************
 **************************** RENDERING ****************************
 *******************************************************************/

/**
 * Attach expected listeners to each div - after divs have been created by manipulating document HTML
 */
function attachComponentListeners() {
  for (let componentId in COMPONENT_STORE) {
    const div = document.getElementById(componentId);
    for (let event in COMPONENT_STORE[componentId].listeners) {
      div.addEventListener(event, COMPONENT_STORE[componentId].listeners[event]);
    }
  }
}

function initializeComponents() {
  for (let componentId in COMPONENT_STORE) {
    const div = document.getElementById(componentId);
    if (COMPONENT_STORE[componentId].initializer) {
      COMPONENT_STORE[componentId].initializer();
    }
  }
}

/*
 * Event listener for mouseovers to show tooltips. `this` refers to the tooltip
 * parent, since that is what receives this event
 * This function positions the tooltip on the appropriate side (to avoid overflowing
 * outside the screen), and also positions the quote artifact on the appropriate side.
 */
function positionTooltip() {
  // The Div is the parent of the tooltop
  // get top, left coords of The Div
  const divRect = this.getBoundingClientRect();
  const tooltip = this.querySelector(".cs-tooltiptext");
  let tooltipRect = tooltip.getBoundingClientRect();

  // position tooltip right above and slightly to the right of the left of The Div
  let top = divRect.top - tooltipRect.height - 5;
  let left = divRect.left + 10;
  let quotePosition = "bottomleft";

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;

  // Get new tooltip coordinates and size
  tooltipRect = tooltip.getBoundingClientRect();

  // Window overflow detection
  if ((tooltipRect.x + tooltipRect.width) > window.innerWidth) {
    // exceeds window on right, move the tooltip to the left of The Div
    left -= tooltipRect.width + 5;
    quotePosition = quotePosition.replace("left", "right");
  }

  if (tooltipRect.y < 0) {
    // exceeds window on top, move the tooltip below The Div
    top += tooltipRect.height + divRect.height + 5;
    quotePosition = quotePosition.replace("bottom", "top");
  }

  // Apply corrected position
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;

  for (let i = 0; i < TOOLTIP_POSITIONS.length; i++) {
    tooltip.classList.remove(`cs-${TOOLTIP_POSITIONS[i]}`);
  }
  tooltip.classList.add(`cs-${quotePosition}`);
}

function positionTooltips() {
  const tooltipParents = document.querySelectorAll(".cs-has-tooltip");
  tooltipParents.forEach(function(tooltipParent, index) {
    tooltipParent.addEventListener("mouseover", positionTooltip);
  });
}

function renderNewCharacterForm() {
  renderPage();

  const phase1 = new FormSection({
    formName: "cs-new-character",
    hasNext: true,
    isFirstPhase: true,
    divider: new SectionDivider("Basics"),
    entries: [
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Name",
        attribute: "name",
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Title",
        attribute: "title",
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Race",
        attribute: "race",
      }),
    ]
  });

  const phase2 = new FormSection({
    formName: "cs-new-character",
    hasNext: true,
    divider: new SectionDivider("Abilities"),
    entries: [
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Strength",
        attribute: "ability_scores.strength",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Constitution",
        attribute: "ability_scores.constitution",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Dexterity",
        attribute: "ability_scores.dexterity",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Intelligence",
        attribute: "ability_scores.intelligence",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Wisdom",
        attribute: "ability_scores.wisdom",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Charisma",
        attribute: "ability_scores.charisma",
        numerical: true,
      }),
    ]
  });

  const phase3 = new FormSection({
    formName: "cs-new-character",
    hasNext: false,
    divider: new SectionDivider("Initial Levels, Hit Points, Experience"),
    entries: [
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Experience",
        attribute: "experience",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Fighter Level",
        attribute: "fighter.level",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Rogue Level",
        attribute: "rogue.level",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Mage Level",
        attribute: "mage.level",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Warlock Level",
        attribute: "warlock.level",
        numerical: true,
      }),
      new FormSectionInputEntry({
        formName: "cs-new-character",
        mainKeyText: "Total Hit Points",
        attribute: "hit_points.total",
        numerical: true,
      }),
    ]
  });

  const panes = [
    new Pane(
      [phase1, phase2, phase3]
    )
  ];

  document.getElementById("cs-new-character-button").classList.add("cs-character-listing-current");

  document.documentElement.style.setProperty("--cs-color-character-bg", "#8386cc");
  document.documentElement.style.setProperty("--cs-color-character-text", "#000000");

  document.getElementById("cs-right-pane").innerHTML = `
      <div id="cs-current-character">
        <div class="cs-panels">${panes.map(pane => pane.getHTML()).join("")}</div>
      </div>
    `;

  postRender();
}

/**
 * Convert base character model to fully populated character model,
 * and re-render the entire character pane
 */
function renderPage(characterName) {
  // Clear out component store
  COMPONENT_STORE = {};

  const characterListingsDiv = document.getElementById("cs-character-listings");
  const navHTML = new CharacterListings(listCharacters(), characterName).getHTML();
  characterListingsDiv.innerHTML = navHTML;

  document.getElementById("cs-settings").innerHTML = new SettingsPanel().getHTML();

  if (characterName == null) {
    document.getElementById("cs-right-pane").innerHTML = "";
    postRender();
    return ;
  }

  document.getElementById("cs-new-character-button").classList.remove("cs-character-listing-current");

  const displayMode = getDisplayMode();
  const baseCharacterModel = getCharacterModel(characterName);
  const characterModel = buildFinalizedCharacterModel(baseCharacterModel);
  let html = "";

  const classesSections = [];
  if (characterModel.fighter.level > 0) {
    classesSections.push(
      new PaneSection({
        divider: new SectionDivider("Fighter"),
        entries: [
          classKeyValue("Fighter Level", characterModel, "fighter.level"),
          classKeyValue("Additional Attacks", characterModel, "fighter.additional_attacks"),
          classKeyValue("Weapon Specializations", characterModel, "fighter.weapon_specializations", [
            "Dagger & Sword I - +1 to Hit and Damage",
            "Dagger & Sword II - Critical hits on 19",
          ])
        ]
      })
    );
  }
  if (characterModel.rogue.level > 0) {
    classesSections.push(
      new PaneSection({
        divider: new SectionDivider("Rogue"),
        entries: [
          classKeyValue("Rogue Level", characterModel, "rogue.level"),
          classKeyValue("Skill Specializations", characterModel, "rogue.skill_specializations", [
            "Mercantile - Journeyman Merchant",
          ])
        ]
      })
    );
  }
  if (characterModel.mage.level > 0) {
    classesSections.push(
      new PaneSection({
        divider: new SectionDivider("Mage"),
        entries: [
          classKeyValue("Mage Level", characterModel, "mage.level"),
          spellSlots("Arcane Spell Slots", characterModel, "mage"),
          classKeyValue("Max Spells per Degree", characterModel, "mage.max_spells_learnable_per_degree"),
          classKeyValue("Arcane Casting in Armor", characterModel, "mage.arcane_casting_in_armor"),
        ]
      })
    );
  }
  if (characterModel.warlock.level > 0) {
    classesSections.push(
      new PaneSection({
        divider: new SectionDivider("Warlock"),
        entries: [
          classKeyValue("Warlock Level", characterModel, "warlock.level"),
          spellSlots("Occult Spell Slots", characterModel, "warlock"),
          classKeyValue("Domain", characterModel, "warlock.domain"),
          classKeyValue("Major Patron", characterModel, "warlock.major_patron"),
          classKeyValue("Minor Patrons", characterModel, "warlock.max_minor_patrons"),
        ]
      })
    );
  }

  const panes = [

    // Pane 1 of 3 Core gameplay info and Actions
    new Pane([
      new PaneSection({
          entries: [
            // TODO - add editable HP field... though it'll be a unique case :/
            new SectionEntry({
              mainKeyText: "Name",
              characterModel: characterModel,
              attribute: "name",
            }),
            new SectionEntry({
              mainKeyText: "Title",
              characterModel: characterModel,
              attribute: "title",
            }),
            new SectionEntry({
              mainKeyText: "Race",
              characterModel: characterModel,
              attribute: "race",
            }),
            new SectionEntry({
              mainKeyText: "Hit Points",
              characterModel: characterModel,
              attribute: "hit_points.total",
            }),
            new SectionEntry({
              mainKeyText: "Armor Class",
              characterModel: characterModel,
              attribute: "armor_class",
            }),
          ]
        }
      ),
      new PaneSection({
        divider: new SectionDivider("Abilities"),
        entries: [
          actionKeyValue("Check", "Strength", characterModel, "ability_scores.strength", "", "1d20"),
          actionKeyValue("Check", "Dexterity", characterModel, "ability_scores.dexterity", "", "1d20"),
          actionKeyValue("Check", "Constitution", characterModel, "ability_scores.constitution", "", "1d20"),
          actionKeyValue("Check", "Wisdom", characterModel, "ability_scores.wisdom", "", "1d20"),
          actionKeyValue("Check", "Intelligence", characterModel, "ability_scores.intelligence", "", "1d20"),
          actionKeyValue("Check", "Charisma", characterModel, "ability_scores.charisma", "", "1d20"),
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Save Throws"),
        entries: [
          actionKeyValue("Save vs", "Reflex", characterModel, "save_throws.dexterity", "", "1d20"),
          actionKeyValue("Save vs", "Fortitude", characterModel, "save_throws.constitution", "", "1d20"),
          actionKeyValue("Save vs", "Will", characterModel, "save_throws.wisdom", "", "1d20"),
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Skills & Special Abilities"),
        entries: [
          actionKeyValue("Perform", "Skill Check", characterModel, "skills.skill_check_bonus", "When attempting: TODO - List of Skills", "1d100"),
          new SectionEntry({mainKeyText: "TODO - Derive from list of special abilities"}),
          ...[] // TODO, pull Special Ability info from model
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Weapons & Attacks"),
        entries: [
          new SectionEntry({editButton: new EditButton("+ Equip a Weapon")}),
          weaponAndActions("Pipe Wrench", [
            new WeaponAttack("Crazy Strike wtf", 1, false, "melee", 1, "1d4 + 3d8 + 5 + 2 + 6d1", ""),
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
          armor("Chest", characterModel, "equipment.armor.chest"),
          armor("Shield", characterModel, "equipment.armor.shield"),
          armor("Gloves", characterModel, "equipment.armor.gloves"),
          armor("Head", characterModel, "equipment.armor.head"),
          armor("Cloak", characterModel, "equipment.armor.cloak"),
          armor("Boots", characterModel, "equipment.armor.boots"),
          armor("Neck", characterModel, "equipment.armor.neck"),
          armor("Ring 1", characterModel, "equipment.armor.ring1"),
          armor("Ring 2", characterModel, "equipment.armor.ring2"),
          armor("Other", characterModel, "equipment.armor.other"),
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Effects"),
        entries: [
          new SectionEntry({editButton: new EditButton("+ Add an Effect")}),
        ].concat(effectsEntries(characterModel)),
      })
    ]),

    // Pane 3 of 3 Character Bio and Class Details
    new Pane([
      new PaneSection({
        entries: [
          new SectionEntry({
            mainKeyText: "Total Character Level",
            characterModel: characterModel,
            attribute: "total_character_level",
            editButton: new EditButton("Level Up / Edit Levels")
          }), new SectionEntry({
            mainKeyText: "Base Attack Bonus",
            characterModel: characterModel,
            attribute: "attacks.base_bonus",
          }),
          new SectionEntry({
            mainKeyText: "Allowed Weapons",
            characterModel: characterModel,
            attribute: "equipment.allowed_weapons",
          }),
          new SectionEntry({
            mainKeyText: "Allowed Armor",
            characterModel: characterModel,
            attribute: "equipment.allowed_armor",
          })
        ]
      }),
      ...classesSections,
    ]),
  ];

  document.documentElement.style.setProperty("--cs-color-character-bg", characterModel.meta.color);
  document.documentElement.style.setProperty("--cs-color-character-text", getContrastColor(characterModel.meta.color));

  document.getElementById("cs-right-pane").innerHTML = `
      <div id="cs-current-character">
        <div class="cs-panels">${panes.map(pane => pane.getHTML()).join("")}</div>
      </div>
    `;

  postRender();
}

function postRender() {
  // all logic that needs to be done after rendering is done - such as attaching listeners
  attachComponentListeners();
  initializeComponents();
  positionTooltips();
}

window.onload = function () {
  // only for the demo
  const existingData = JSON.parse(window.localStorage.getItem(CHARACTER_SHEET_STORAGE_KEY));
  window.localStorage.setItem(CHARACTER_SHEET_STORAGE_KEY, JSON.stringify({...existingData, ...CHARACTER_MODELS}));

  document.getElementById("cs-new-character-button").addEventListener("click", renderNewCharacterForm);

  setAppearance();
  renderPage(null);
};
