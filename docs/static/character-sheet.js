// This JS controls the entire character sheets.
// It is divided into a few sections:
// * Databases - about armor, spells, etc
// * Fundamental "infra" - base classes, basic structure of the data model
// * UI helper functions

// Some basic constants
VERSION = "0.2.2";
STORAGE_NAME = "character_sheets";
POPULATED_NAMES = [];  // names currently in storage

CLASSES = [
  "fighter",
  "mage",
  "rogue",
  "warlock",
];

// example, "Chain Mail (+2)"
EQUIPMENT_RE = /(?<armorType>[a-zA-Z ]*)(\(\+(?<acMod>\d+)\))?/;

CREATION_OPTION_TO_SHEET = {
  "opt-charisma": "cs-charisma",
  "opt-constitution": "cs-constitution",
  "opt-dexterity": "cs-dexterity",
  "opt-intelligence": "cs-intelligence",
  "opt-strength": "cs-strength",
  "opt-wisdom": "cs-wisdom",
};

/*****************************************************************
 *************************** DATABASES ***************************
 *****************************************************************/

// populated by load...Spellbook
MAGE_SPELLS = {};
WARLOCK_SPELLS = {};

// Databases
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
 *************************** DATA MODELS ***************************
 *******************************************************************/

ALL_ATTRIBUTES = [];
SAVED_ATTRIBUTES = [];

function setDivValue(div, text) {
  div.value = text;
  if (div.tagName == "SELECT" && text != "") {
    div.parentElement.getElementsByClassName("select-selected")[0].innerHTML = text;
  }
}

function setTooltip(div, innerHTML) {
  // remove old tooltip
  const oldTooltipDiv = div.parentElement.getElementsByClassName("tooltiptext")[0];
  div.parentElement.classList.remove("has-tooltip");
  if (oldTooltipDiv) {
    oldTooltipDiv.parentElement.removeChild(oldTooltipDiv);
  }

  if (!innerHTML) {
    return ;
  }

  const tooltipDiv = document.createElement("div");
  tooltipDiv.classList.add("tooltiptext");
  tooltipDiv.innerHTML = innerHTML;

  div.parentElement.classList.add("has-tooltip");
  div.parentElement.appendChild(tooltipDiv);
}

class Attribute {
  constructor(divName, isCollection=false) {
    this.divName = divName;
    this.isCollection = isCollection;
    ALL_ATTRIBUTES.push(this);
  }

  shouldBeSaved() {
    SAVED_ATTRIBUTES.push(this);
    return this;
  }

  setSensitive() {
    if (this.isCollection) {
      const divs = document.getElementsByClassName(this.divName);
      for (let i = 0; i < divs.length; i++) {
        divs[i].classList.add("sensitive-field");
      }
    } else {
      const div = document.getElementById(this.divName);
      div.classList.add("sensitive-field");
    }
    return this;
  }

  setReadOnly() {
    if (this.isCollection) {
      const divs = document.getElementsByClassName(this.divName);
      for (let i = 0; i < divs.length; i++) {
        divs[i].readOnly = true;
      }
    } else {
      const div = document.getElementById(this.divName);
      div.readOnly = true;
    }
    return this;
  }

  populateField(finalizedCharacterModel) {
    const displayText = finalizedCharacterModel[this.divName]["display"];
    const tooltipHTML = finalizedCharacterModel[this.divName]["tooltip"];
    if (this.isCollection) {
      const divs = document.getElementsByClassName(this.divName);
      for (let i = 0; i < displayText.length; i++) {
        setDivValue(divs[i], displayText[i]);
        setTooltip(divs[i], tooltipHTML[i]);
      }
    } else {
      const div = document.getElementById(this.divName);
      setDivValue(div, displayText);
      setTooltip(div, tooltipHTML);
    }
  }

  getCurrentData() {
    if (this.isCollection) {
      const data = [];
      const divs = document.getElementsByClassName(this.divName);
      for (let i = 0; i < divs.length; i++) {
        data.push(divs[i].value);
      }
      return data;
    } else {
      const div = document.getElementById(this.divName);
      return div.value;
    }
  }
};

/*******************************************************************
 ********************* INDIVIDUAL UI ATTRIBUTES ********************
 *******************************************************************/

NAME_ATTRIBUTE = new Attribute("cs-name").shouldBeSaved().setSensitive();

EXPERIENCE_ATTRIBUTE = new Attribute("cs-experience").shouldBeSaved().setSensitive();

HIT_POINTS_ATTRIBUTE = new Attribute("cs-hit-points").shouldBeSaved().setSensitive();

HIT_POINTS_CURRENT_ATTRIBUTE = new Attribute("cs-hit-points-current").shouldBeSaved();

RACE_ATTRIBUTE = new Attribute("cs-race").shouldBeSaved().setSensitive();

LEVEL_FIGHTER_ATTRIBUTE = new Attribute("cs-level-fighter").shouldBeSaved().setSensitive();

LEVEL_MAGE_ATTRIBUTE = new Attribute("cs-level-mage").shouldBeSaved().setSensitive();

LEVEL_ROGUE_ATTRIBUTE = new Attribute("cs-level-rogue").shouldBeSaved().setSensitive();

LEVEL_WARLOCK_ATTRIBUTE = new Attribute("cs-level-warlock").shouldBeSaved().setSensitive();

CHARISMA_ATTRIBUTE = new Attribute("cs-charisma").shouldBeSaved().setSensitive();

CONSTITUTION_ATTRIBUTE = new Attribute("cs-constitution").shouldBeSaved().setSensitive();

DEXTERITY_ATTRIBUTE = new Attribute("cs-dexterity").shouldBeSaved().setSensitive();

INTELLIGENCE_ATTRIBUTE = new Attribute("cs-intelligence").shouldBeSaved().setSensitive();

STRENGTH_ATTRIBUTE = new Attribute("cs-strength").shouldBeSaved().setSensitive();

WISDOM_ATTRIBUTE = new Attribute("cs-wisdom").shouldBeSaved().setSensitive();

EQUIPMENT_ARMOR_ATTRIBUTE = new Attribute("cs-equipment-armor").shouldBeSaved();

EQUIPMENT_BOOTS_ATTRIBUTE = new Attribute("cs-equipment-boots").shouldBeSaved();

EQUIPMENT_CLOAK_ATTRIBUTE = new Attribute("cs-equipment-cloak").shouldBeSaved();

EQUIPMENT_GLOVES_ATTRIBUTE = new Attribute("cs-equipment-gloves").shouldBeSaved();

EQUIPMENT_NECK_ATTRIBUTE = new Attribute("cs-equipment-neck").shouldBeSaved();

EQUIPMENT_OTHER_1_ATTRIBUTE = new Attribute("cs-equipment-other-1").shouldBeSaved();

EQUIPMENT_OTHER_2_ATTRIBUTE = new Attribute("cs-equipment-other-2").shouldBeSaved();

EQUIPMENT_RING_1_ATTRIBUTE = new Attribute("cs-equipment-ring-1").shouldBeSaved();

EQUIPMENT_RING_2_ATTRIBUTE = new Attribute("cs-equipment-ring-2").shouldBeSaved();

EQUIPMENT_SHIELD_ATTRIBUTE = new Attribute("cs-equipment-shield").shouldBeSaved();

SILVER_ATTRIBUTE = new Attribute("cs-silver").shouldBeSaved();

GAME_DETAILS_ATTRIBUTE = new Attribute("cs-game-details").shouldBeSaved();

INVENTORY_ATTRIBUTE = new Attribute("cs-inventory", true).shouldBeSaved();

MISC_ATTRIBUTE = new Attribute("cs-misc", true).shouldBeSaved();

WEAPON_BONUS_TO_HIT_ATTRIBUTE = new Attribute("cs-weapon-bonus-to-hit", true).shouldBeSaved();

WEAPON_DAMAGE_ATTRIBUTE = new Attribute("cs-weapon-damage", true).shouldBeSaved();

WEAPON_FEATURES_ATTRIBUTE = new Attribute("cs-weapon-features", true).shouldBeSaved();

WEAPON_NAME_ATTRIBUTE = new Attribute("cs-weapon-name", true).shouldBeSaved();

SPELL_QTY_ATTRIBUTE = new Attribute("cs-spell-qty", true).shouldBeSaved();

MAGE_SPELL_NAME_ATTRIBUTE = new Attribute("cs-mage-spell-name", true).shouldBeSaved();

WARLOCK_SPELL_NAME_ATTRIBUTE = new Attribute("cs-warlock-spell-name", true).shouldBeSaved();

CHARISMA_MODIFIER_ATTRIBUTE = new Attribute("cs-charisma-modifier", false).setReadOnly();

CONSTITUTION_MODIFIER_ATTRIBUTE = new Attribute("cs-constitution-modifier", false).setReadOnly();

CONSTITUTION_SAVE_THROW_ATTRIBUTE = new Attribute("cs-constitution-save-throw", false).setReadOnly();

DEXTERITY_MODIFIER_ATTRIBUTE = new Attribute("cs-dexterity-modifier", false).setReadOnly();

DEXTERITY_SAVE_THROW_ATTRIBUTE = new Attribute("cs-dexterity-save-throw", false).setReadOnly();

INTELLIGENCE_MODIFIER_ATTRIBUTE = new Attribute("cs-intelligence-modifier", false).setReadOnly();

STRENGTH_MODIFIER_ATTRIBUTE = new Attribute("cs-strength-modifier", false).setReadOnly();

WISDOM_MODIFIER_ATTRIBUTE = new Attribute("cs-wisdom-modifier", false).setReadOnly();

WISDOW_SAVE_THROW_ATTRIBUTE = new Attribute("cs-wisdom-save-throw", false).setReadOnly();

TOTAL_HIT_DIE_ATTRIBUTE = new Attribute("cs-total-hit-die", false).setReadOnly();

BASE_ATTACK_BONUS_ATTRIBUTE = new Attribute("cs-base-attack-bonus", false).setReadOnly();

NUMBER_OF_ATTACKS_ATTRIBUTE = new Attribute("cs-number-of-attacks", false).setReadOnly();

ALLOWED_ARMOR_ATTRIBUTE = new Attribute("cs-allowed-armor", false).setReadOnly();

ALLOWED_WEAPONS_ATTRIBUTE = new Attribute("cs-allowed-weapons", false).setReadOnly();

SKILL_CHECK_BONUS_ATTRIBUTE = new Attribute("cs-skill-check-bonus", false).setReadOnly();

SKILL_PROFICIENCIES_ATTRIBUTE = new Attribute("cs-skill-proficiencies", false).setReadOnly();

SPELLS_LEARNABLE_PER_DEGREE_ATTRIBUTE = new Attribute("cs-max-spells-learnable-per-degree", false).setReadOnly();

MAX_MINOR_PATRONS_ATTRIBUTE = new Attribute("cs-max-minor-patrons", false).setReadOnly();

SLOTS_W1_ATTRIBUTE = new Attribute("cs-slots-w1", false).setReadOnly();

SLOTS_W2_ATTRIBUTE = new Attribute("cs-slots-w2", false).setReadOnly();

SLOTS_W3_ATTRIBUTE = new Attribute("cs-slots-w3", false).setReadOnly();

SLOTS_W4_ATTRIBUTE = new Attribute("cs-slots-w4", false).setReadOnly();

SLOTS_W5_ATTRIBUTE = new Attribute("cs-slots-w5", false).setReadOnly();

SLOTS_M1_ATTRIBUTE = new Attribute("cs-slots-m1", false).setReadOnly();

SLOTS_M2_ATTRIBUTE = new Attribute("cs-slots-m2", false).setReadOnly();

SLOTS_M3_ATTRIBUTE = new Attribute("cs-slots-m3", false).setReadOnly();

SLOTS_M4_ATTRIBUTE = new Attribute("cs-slots-m4", false).setReadOnly();

SLOTS_M5_ATTRIBUTE = new Attribute("cs-slots-m5", false).setReadOnly();

ARMOR_CLASS_ATTRIBUTE = new Attribute("cs-armor-class", false).setReadOnly();

/*******************************************************************
 *************** EVALUATING A CHARACTER TO COMPLETION **************
 *******************************************************************/

BUILDER_FUNCTIONS = {
  "cs-mage-spell-name": characterData => {
    const tooltips = [];

    for (let i = 0; i < characterData["cs-mage-spell-name"].length; i++) {
      const spellName = characterData["cs-mage-spell-name"][i];
      tooltips.push(spellName ? getTooltipHtml(spellName, MAGE_SPELLS) : "");
    }

    return {
      "display": characterData["cs-mage-spell-name"],
      "tooltip": tooltips,
    };
  },

  "cs-warlock-spell-name": characterData => {
      const tooltips = [];

      for (let i = 0; i < characterData["cs-warlock-spell-name"].length; i++) {
        const spellName = characterData["cs-warlock-spell-name"][i];
        tooltips.push(spellName ? getTooltipHtml(spellName, WARLOCK_SPELLS) : "");
      }

      return {
        "display": characterData["cs-warlock-spell-name"],
        "tooltip": tooltips,
      };
  },
  

  "cs-charisma-modifier": characterData =>  {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-charisma"])],
        "tooltip": "",
      };
  },

  "cs-constitution-modifier": characterData =>  {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-constitution"])],
        "tooltip": "",
      };
  },

  "cs-constitution-save-throw": characterData => {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-constitution"])]
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 2)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 4)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 4)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 3),
        "tooltip": "",
      };
  },

  "cs-dexterity-modifier": characterData =>  {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-dexterity"])],
        "tooltip": "",
      };
  },

  "cs-dexterity-save-throw": characterData => {
      // DEX + FGT/3 + MAG/3 + ROG/2 + WAR/4
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-dexterity"])]
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 3)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 3)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 2)
          + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 4),
        "tooltip": "",
      };
  },

  "cs-intelligence-modifier": characterData =>  {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-intelligence"])],
        "tooltip": "",
      };
  },

  "cs-strength-modifier": characterData =>  {
      return {
        "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-strength"])],
        "tooltip": "",
      };
  },

  "cs-wisdom-modifier": characterData =>  {
    // table
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-wisdom"])],
      "tooltip": "",
    };
  },

  "cs-wisdom-save-throw": characterData => {
    // WIS + FGT/4 + MAG/2 + ROG/3 + WAR/2
    return {
      "display": ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-wisdom"])]
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 3)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 2),
      "tooltip": "",
    };
  },

  "cs-total-hit-die": characterData => {
    // FGT + MAG + ROG + WAR
    return {
      "display": getNumericalCharacteristic(characterData["cs-level-fighter"])
        + getNumericalCharacteristic(characterData["cs-level-mage"])
        + getNumericalCharacteristic(characterData["cs-level-rogue"])
        + getNumericalCharacteristic(characterData["cs-level-warlock"]),
      "tooltip": "",
    };
  },

  "cs-base-attack-bonus": characterData => {
    // FGT + MAG/4 + ROG/2 + WAR/2
    return {
      "display": getNumericalCharacteristic(characterData["cs-level-fighter"])
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 2)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 2),
      "tooltip": "",
    };
  },

  "cs-number-of-attacks": characterData => {
    // max(1 + (FGT-1)/4, 1)
    return {
      "display": Math.max(
        Math.floor(1 + (getNumericalCharacteristic(characterData["cs-level-fighter"]) - 1) / 4),
        1,
      ),
      "tooltip": "",
    };
  },

  "cs-allowed-armor": characterData => {
    // if(FGT > 0, "Heavy + Shields", if(WAR > 0, "Medium", if(ROG > 0, "Light", "None")))
    let allowedArmor;

    if (getNumericalCharacteristic(characterData["cs-level-fighter"]) > 0) {
      allowedArmor = "Heavy + Shields";
    } else if (getNumericalCharacteristic(characterData["cs-level-warlock"]) > 0) {
      allowedArmor = "Medium";
    } else if (getNumericalCharacteristic(characterData["cs-level-rogue"]) > 0) {
      allowedArmor = "Light";
    } else {
      allowedArmor = "None";
    }

    return {
      "display": allowedArmor,
      "tooltip": "",
    };
  },

  "cs-allowed-weapons": characterData => {
    // if(FGT > 0, "Martial", if(ROG+WAR > 0, "Standard", "Simple"))
    let allowedWeapons;

    if (getNumericalCharacteristic(characterData["cs-level-fighter"]) > 0) {
      allowedWeapons = "Martial";
    } else if (getNumericalCharacteristic(characterData["cs-level-warlock"]) > 0) {
      allowedWeapons = "Standard";
    } else if (getNumericalCharacteristic(characterData["cs-level-rogue"]) > 0) {
      allowedWeapons = "Standard";
    } else {
      allowedWeapons = "Simple";
    }

    return {
      "display": allowedWeapons,
      "tooltip": "",
    };
  },

  "cs-skill-check-bonus": characterData => {
    // ROG + MAG/2 + FGT/4 + WAR/4
    return {
      "display": Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 2)
        + getNumericalCharacteristic(characterData["cs-level-rogue"])
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 4)
        + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 4),
      "tooltip": "",
    };
  },

  "cs-skill-proficiencies": characterData => {
    // table
    return {
      "display": SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-mage"])]["mage"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-rogue"])]["rogue"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-rogue"])]["fighter"]
        + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-rogue"])]["warlock"],
      "tooltip": "",
    };
  },

  "cs-max-spells-learnable-per-degree": characterData => {
    // 5 + INT
    return {
      "display": 5 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-intelligence"])],
      "tooltip": "",
    };
  },

  "cs-max-minor-patrons": characterData => {
    // min(1 + CHA, (WAR+1)/2)
    return {
      "display": Math.min(
        1 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-charisma"])],
        Math.floor((getNumericalCharacteristic(characterData["cs-level-warlock"]) + 1) / 2)
      ),
      "tooltip": "",
    };
  },


  "cs-slots-w1": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][1],
      "tooltip": "",
    };
  },

  "cs-slots-w2": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][2],
      "tooltip": "",
    };
  },

  "cs-slots-w3": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][3],
      "tooltip": "",
    };
  },

  "cs-slots-w4": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][4],
      "tooltip": "",
    };
  },

  "cs-slots-w5": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][5],
      "tooltip": "",
    };
  },

  "cs-slots-m1": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][1],
      "tooltip": "",
    };
  },

  "cs-slots-m2": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][2],
      "tooltip": "",
    };
  },

  "cs-slots-m3": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][3],
      "tooltip": "",
    };
  },

  "cs-slots-m4": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][4],
      "tooltip": "",
    };
  },

  "cs-slots-m5": characterData =>  {
    return {
      "display": SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][5],
      "tooltip": "",
    };
  },

  "cs-armor-class": characterData => {
      let equipmentAC = 0;
      let dexMod = ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-dexterity"])];
      for (let prop in characterData) {
        if (!prop.startsWith("cs-equipment-") || characterData[prop] === "") {
          continue;
        }

        const armor = characterData[prop].match(EQUIPMENT_RE).groups;
        const armorType = armor.armorType.trim().toLowerCase();
        equipmentAC += parseInt(armor.acMod || 0);

        if (!ARMOR.hasOwnProperty(armorType)) {
          continue;
        }

        if (ARMOR[armorType].hasOwnProperty("max_dex_mod")) {
          dexMod = Math.min(dexMod, ARMOR[armorType]["max_dex_mod"]);
        }

        if (typeof ARMOR[armorType]["ac"] === "function") {
          equipmentAC += ARMOR[armorType]["ac"](characterData);
        } else {
          equipmentAC += ARMOR[armorType]["ac"];
        }
      }

      return {
        "display": 10 + dexMod + equipmentAC,
        "tooltip": `<h1>Armor Class</h1>${dexMod} from dex<br/>${equipmentAC} from equipment`,
      };
  },
};

function buildFinalizedCharacterModel(baseCharacterModel) {
  const finalizedCharacterModel = {};

  for (let prop in baseCharacterModel) {
    finalizedCharacterModel[prop] = {
      "display": baseCharacterModel[prop],
      "tooltip": "",
    };
  }

  for (let prop in BUILDER_FUNCTIONS) {
    finalizedCharacterModel[prop] = BUILDER_FUNCTIONS[prop](baseCharacterModel);
  }

  return finalizedCharacterModel;
}

function reevaluateAndRepopulateCharacter(baseCharacterModel) {
  const finalizedCharacterModel = buildFinalizedCharacterModel(baseCharacterModel);
  for (let i = 0; i < ALL_ATTRIBUTES.length; i++) {
    ALL_ATTRIBUTES[i].populateField(finalizedCharacterModel);
  }
}

/*******************************************************************
 ******************* ACTUAL UI CONTROLS AND FLOW *******************
 *******************************************************************/

function getNumericalCharacteristic(val) {
  return parseInt(val || "0");
}

// lock/unlock sensitive fields, which are fields that don't change day-to-day
// sheet can be unlocked to make changes. page always loads with these locked
// prevents accidental mess-ups
function lockSensitiveFields() {
  const divs = document.getElementsByClassName("sensitive-field");
  for (let i = 0; i < divs.length; i++) {
    divs[i].readOnly = true;
  }
  document.getElementById("cs-unlock-sheet").classList.remove("hidden");
  document.getElementById("cs-lock-sheet").classList.add("hidden");
}

function unlockSensitiveFields() {
  const divs = document.getElementsByClassName("sensitive-field");
  for (let i = 0; i < divs.length; i++) {
    divs[i].readOnly = false;
  }
  document.getElementById("cs-unlock-sheet").classList.add("hidden");
  document.getElementById("cs-lock-sheet").classList.remove("hidden");
}

// utilities for interacting with localstorage
function getCharacterSheet(name) {
  const characterSheets = JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || {};
  return characterSheets[name];
}

function getCharacterSheetNames() {
  const characterSheets = JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || {};
  return Object.keys(characterSheets);
}

function updateCharacterSheet(name, sheet) {
  const characterSheets = JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || {};
  characterSheets[name] = sheet;
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(characterSheets));
}

function deleteCharacterSheet(name) {
  const characterSheets = JSON.parse(window.localStorage.getItem(STORAGE_NAME));
  delete characterSheets[name];
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(characterSheets));
}

// utilities for hiding/showing race- and class-specific sections
function hideClassDivs(className) {
  const divs = document.getElementsByClassName(className);
  for (let i = 0; i < divs.length; i++) {
    divs[i].classList.add("hidden");
  }
}

function showClassDivs(className) {
  const divs = document.getElementsByClassName(className);
  for (let i = 0; i < divs.length; i++) {
    divs[i].classList.remove("hidden");
  }
}

function hideSpecifics() {
  hideClassDivs("race-specific");
  hideClassDivs("class-specific");
  for (let i = 0; i < CLASSES.length; i++) {
    hideClassDivs(`for-${CLASSES[i]}`);
  }
}

// show class and race-specific sections based on character
function showAppropriateSpecifics(characterData) {
  hideSpecifics();

  showClassDivs(`for-${characterData["cs-race"].toLowerCase()}`);
  for (let i = 0; i < CLASSES.length; i++) {
    const classLevel = characterData[`cs-level-${CLASSES[i]}`];
    if (classLevel && parseInt(classLevel) > 0) {
      showClassDivs(`for-${CLASSES[i]}`);
    }
  }
}

function clearSheet() {
  document.getElementById("cs-name-heading").textContent = "";
  document.getElementById("character-sheet").reset();
}

// load character sheet from name
function loadFromName(name) {
  console.log("Switched to character:", name);

  const characterData = getCharacterSheet(name);

  lockSensitiveFields();
  hideCharacterSwitcher();
  clearSheet();

  // new character form. keep fields unlocked in this view for ease of use
  if (characterData == null) {
    document.getElementById("cs-delete-sheet").classList.add("hidden");
    unlockSensitiveFields();
    return;
  }

  // populate page
  document.getElementById("cs-name-heading").textContent = name;

  // upgrade character sheet
  const currentVersion = characterData["version"];
  if (currentVersion == "0.2.1") {
    characterData["cs-warlock-spell-name"] = characterData["cs-spell-name"].slice(0, 10);
    characterData["cs-mage-spell-name"] = characterData["cs-spell-name"].slice(10);
    characterData["cs-game-details"] = "";
    delete characterData["cs-spell-name"];
    characterData["VERSION"] = VERSION;
    console.log(`Upgraded ${name} from version ${currentVersion} to ${VERSION}`);
  } else if (currentVersion != VERSION) {
    console.log(`Can't upgrade ${name} from version ${currentVersion} to ${VERSION}`);
    alert(`Can't upgrade ${name} from version ${currentVersion} to ${VERSION}`);
    throw new Error(`Can't upgrade ${name} from version ${currentVersion} to ${VERSION}`);
  }

  reevaluateAndRepopulateCharacter(characterData);
  showAppropriateSpecifics(characterData);
  document.getElementById("cs-delete-sheet").classList.remove("hidden");
}

function rollDice(event) {
  const max = parseInt(event.target.title.substr(1));
  const result = Math.floor(Math.random() * max) + 1;
  document.getElementById("die-result").textContent = result;
}

// download-related functions - downloads all character sheets as a single json to disk
function exportToFile() {
  // fake a download request
  const text = window.localStorage.getItem(STORAGE_NAME);
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", `mythmancer-character-sheets-${new Date().toISOString().replaceAll(":", "-")}.json`);

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// upload-related functions - loading an uploaded json, allow for file drag-and-drop upload
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function loadFromJsonString(mapString) {
  let names = [];
  console.log("Importing from json string:", mapString);
  if (mapString == null || mapString == "") {
    return names;
  }
  const map = JSON.parse(mapString);
  for (let [key, value] of Object.entries(map)) {
    names.push(key);
    updateCharacterSheet(key, value);
  }
  return names;
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const names = loadFromJsonString(e.target.result);
    showCharacterSwitcher();
    alert(
      `Imported ${names.length} characters:`
        + "\n• " + names.join("\n• ")
        + "\nUse the selector the choose one"
    );
  };
  reader.readAsText(file);
}

function handleDropUpload(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  importData(files[0]);
}

function handleFileUpload(e) {
  e.stopPropagation();
  e.preventDefault();
  importData(e.target.files[0]);
}

// save to localStorage
function exportData() {
  const characterData = {
    "version": VERSION,
  };

  for (let i = 0; i < SAVED_ATTRIBUTES.length; i++) {
    characterData[SAVED_ATTRIBUTES[i].divName] = SAVED_ATTRIBUTES[i].getCurrentData();
  }

  console.log("Character updated:", characterData);
  return characterData;
}

function save() {
  const map = exportData();
  if (map["cs-name"] == "") {
    return;
  }
  updateCharacterSheet(map["cs-name"], map);

  try {
    showAppropriateSpecifics(map);
    reevaluateAndRepopulateCharacter(map);
  } catch(err) {
    console.log("Invalid input");
    console.log(err);
    alert("Fix the mistake in the most recently edited field");
  }
}

// character creation modal
function generateAttributeValue() {
  const max = 6;
  const rolls = [
    Math.floor(Math.random() * max) + 1,
    Math.floor(Math.random() * max) + 1,
    Math.floor(Math.random() * max) + 1,
    Math.floor(Math.random() * max) + 1,
  ];
  return rolls.reduce((a, b) => {return a + b;}) - Math.min(...rolls);
}

function populateSheetFromDiv(creationOptionDiv) {
  document.getElementById("cs-delete-sheet").classList.add("hidden");
  unlockSensitiveFields();
  clearSheet();
  if (creationOptionDiv.classList.contains("from-scratch")) {
    return ;
  }
  for (let [key, value] of Object.entries(CREATION_OPTION_TO_SHEET)) {
    document.getElementById(value).value = creationOptionDiv.getElementsByClassName(key)[0].textContent;
  }
}

function populateCharacterCreationOptions() {
  const creationOptionDivs = document.getElementsByClassName("character-creation-option");
  // ignore "from scratch" div
  for (let i = 0; i < creationOptionDivs.length - 1; i++) {
    for (let prop in CREATION_OPTION_TO_SHEET) {
      creationOptionDivs[i].getElementsByClassName(prop)[0].textContent = generateAttributeValue();
    }
  }
}

function hideCharacterCreation() {
  document.getElementById("character-sheet").classList.remove("blurred");
  document.getElementById("character-creation-modal").classList.add("hidden");
}

function showCharacterCreation() {
  document.getElementById("character-sheet").classList.add("blurred");
  document.getElementById("character-creation-modal").classList.remove("hidden");
  populateCharacterCreationOptions();
}

function startCharacterCreation() {
  showCharacterCreation();
}

// character switcher stuff
function createSwitcherElement(name) {
  let d = document.createElement("div");
  d.classList.add("character-card");

  let letterD = document.createElement("div");
  letterD.classList.add("character-letter");
  letterD.textContent = name[0].toUpperCase();
  let nameD = document.createElement("div");
  nameD.classList.add("character-name");
  nameD.textContent = name;

  d.appendChild(letterD);
  d.appendChild(nameD);

  d.addEventListener("click", function(event) {
    loadFromName(name);
    event.stopPropagation();
  });

  return d;
}

function populateCharacterSwitcher() {
  // TODO: sort local storage by created at? Alphabetical?
  // Insert any newly available names to the character switcher
  const availableNames = getCharacterSheetNames();
  const newCharacterIcon = document.getElementById("cs-new-character");
  const characterCardsDiv = document.getElementById("character-cards");
  for (let i = 0; i < availableNames.length; i++) {
    if (POPULATED_NAMES.includes(availableNames[i])) {
      continue;
    }
    const switcherElement = createSwitcherElement(availableNames[i]);
    characterCardsDiv.insertBefore(switcherElement, newCharacterIcon);
    POPULATED_NAMES.push(availableNames[i]);
  }

  // Remove any non-present names from the switcher
  const namesToRemove = POPULATED_NAMES.filter(name => !availableNames.includes(name));
  const characterNameDivs = characterCardsDiv.getElementsByClassName("character-name");
  for (let i = 0; i < characterNameDivs.length; i++) {
    if (namesToRemove.includes(characterNameDivs[i].textContent)) {
      characterNameDivs[i].parentElement.remove();
    }
  }

  POPULATED_NAMES = [...availableNames];
}

function hideCharacterSwitcher() {
  document.getElementById("character-sheet").classList.remove("blurred");
  document.getElementById("character-switcher-modal").classList.add("hidden");
}

function showCharacterSwitcher() {
  populateCharacterSwitcher();
  document.getElementById("character-sheet").classList.add("blurred");
  document.getElementById("character-switcher-modal").classList.remove("hidden");
}

// Spellbook wizard
function getTooltipHtml(spellName, spellDb) {
  const spellInfo = spellDb[spellName];
  if (spellInfo == null) {
    return "";
  }

  const isReversibleStr = spellInfo["Reversible"] ? " | Reversible" : "";

  return `
  <h1>${spellName}</h1>
<span class="smallfont">${spellInfo["Type"]}${isReversibleStr}</span></br></br>
Range: ${spellInfo["Range"]}</br>
Duration: ${spellInfo["Duration"]}</br>
Area of Effect: ${spellInfo["Area of Effect"]}</br>
Components: ${spellInfo["Components"]}</br>
Casting Time: ${spellInfo["Casting Time"]}</br>
Saving Throw: ${spellInfo["Saving Throw"]}</br>
Speed: ${spellInfo["Speed"]}</br></br>
${spellInfo["Details"]}
  `;
}

function loadWarlockSpellbookWizard(spellDb) {
  // add all tooltips for warlock spellbook

  WARLOCK_SPELLS = spellDb;

  const spellDivs = document
        .getElementById("page-spellbook")
        .getElementsByClassName("for-warlock")[0]
        .getElementsByClassName("spell-name");

  for (let i = 0; i < spellDivs.length; i++) {
    const spellName = spellDivs[i].firstChild.textContent;

    const element = document.createElement("div");
    element.classList.add("tooltiptext");

    element.innerHTML = getTooltipHtml(spellName, spellDb);
    spellDivs[i].appendChild(element);
  }
}

// custom dropdown stuff (for mages)
function populateSpellDropdown(selectDiv) {
  selectDiv.innerHTML = "";

  // Default option
  const option = document.createElement("option");
  option.value = "";
  option.text = "Select spell";
  selectDiv.appendChild(option);

  const selectSpellLevel = selectDiv.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("spell-level")[0].textContent[0];

  const spellsForLevel = [];
  for (let prop in MAGE_SPELLS) {
    if (selectSpellLevel != MAGE_SPELLS[prop]["Level"]) {
      continue;
    }
    spellsForLevel.push(prop);
  }

  spellsForLevel.sort();

  for (let i = 0; i < spellsForLevel.length; i++) {
    const option = document.createElement("option");
    option.value = spellsForLevel[i];
    option.text = spellsForLevel[i];
    selectDiv.appendChild(option);
  }
}

function generateCustomSelectList(options) {
  const customSelectList = document.createElement("div");
  customSelectList.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < options.length; j++) {
    const customSelectOption = document.createElement("div");
    customSelectOption.innerHTML = options[j].innerHTML;
    customSelectOption.addEventListener("click", function(e) {
      const s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      const h = this.parentNode.previousSibling;
      for (let i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML != this.innerHTML) {
          continue;
        }
        s.value = s.options[i].innerHTML;
        h.innerHTML = this.innerHTML;
        const y = this.parentNode.getElementsByClassName("same-as-selected");
        for (let k = 0; k < y.length; k++) {
          y[k].removeAttribute("class");
        }
        this.setAttribute("class", "same-as-selected");
        break;
      }
      // Send a click to close the select list, and a change to save the selection
      h.click();
      s.dispatchEvent(new Event("change"));
    });
    customSelectList.appendChild(customSelectOption);
  }
  return customSelectList;
}

function loadMageSpellbook(spellDb) {
  // since Mage spells are dynamic (chosen by player), we don't have a predefined
  // list we can populate on load. We need to know which spells the player chooses
  // to load appropriate tooltips.

  // So instead, this function will simply store the information into globals, and
  // we'll populate the tooltips when a character sheet is loaded, or when a mage
  // spell slot is changed.

  MAGE_SPELLS = spellDb;

  // Populate all spell dropdowns, and configure the custom ones
  const customSelectDivs = document.getElementsByClassName("custom-select");

  for (let i = 0; i < customSelectDivs.length; i++) {
    const selectDiv = customSelectDivs[i].getElementsByTagName("select")[0];
    populateSpellDropdown(selectDiv);

    // Create custom "selected item" display
    const customSelectedItem = document.createElement("div");
    customSelectedItem.setAttribute("class", "select-selected");
    customSelectedItem.innerHTML = selectDiv.options[0].innerHTML;

    const customSelectList = generateCustomSelectList(selectDiv.options);

    customSelectDivs[i].appendChild(customSelectedItem);
    customSelectDivs[i].appendChild(customSelectList);
    customSelectedItem.addEventListener("click", function(e) {
      e.stopPropagation();
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function updateCustomSpellTooltip(spellInputDiv) {
  const spellName = spellInputDiv.value;
  const parentTable = spellInputDiv.parentElement.parentElement.parentElement.parentElement.parentElement;
  const spellDb = parentTable.classList.contains("for-warlock") ? WARLOCK_SPELLS : MAGE_SPELLS;

  setTooltip(spellInputDiv, getTooltipHtml(spellName, spellDb));
}

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};


// main initializer
window.onload = function() {
  // save to localStorage whenever a field is changed
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", save);
  }
  const selects = document.getElementsByTagName("select");
  for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener("change", save);
  }
  const textareas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener("change", save);
  }


  // control panel on character switcher. Click shouldn't propagate so that clicking anywhere else closes the switcher
  document.getElementById("cs-export").addEventListener("click", function(event) {
    exportToFile();
    event.stopPropagation();
  });
  document.getElementById("cs-lock-sheet").addEventListener("click", function(event) {
    lockSensitiveFields();
    event.stopPropagation();
  });
  const newCharacterIcon = document.getElementById("cs-new-character");
  newCharacterIcon.addEventListener("click", function(event) {
    hideCharacterSwitcher();
    startCharacterCreation();
    event.stopPropagation();
  });
  document.body.addEventListener("mouseup", function() {
    if (document.getElementById("character-sheet").classList.contains("blurred")) {
      hideCharacterSwitcher();
    }
  });

  // uploader
  const dropbox = document;
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", handleDropUpload, false);
  const uploader = document.getElementById("uploader");
  uploader.addEventListener("change", handleFileUpload, false);


  // control panel on character sheet
  document.getElementById("cs-unlock-sheet").addEventListener("click", unlockSensitiveFields);
  document.getElementById("cs-delete-sheet").addEventListener("click", function() {
    const name = document.getElementById("cs-name").value;
    deleteCharacterSheet(name);
    clearSheet();
    // once deleted, open switcher
    showCharacterSwitcher();
  });
  document.getElementById("cs-switch-character").addEventListener("click", function() {
    showCharacterSwitcher();
  });

  // new character creation
  const creationOptionDivs = document.getElementsByClassName("character-creation-option");
  for (let i = 0; i < creationOptionDivs.length; i++) {
    const div = creationOptionDivs[i];
    div.addEventListener("click", function() {
      populateSheetFromDiv(div);
      hideCharacterCreation();
    });
  }

  // fullscreening, display appropriate button
  document.getElementById("cs-fullscreen").addEventListener("click", function() {
    document.documentElement.requestFullscreen();
  });
  document.getElementById("cs-exit-fullscreen").addEventListener("click", function() {
    document.exitFullscreen();
  });
  document.documentElement.addEventListener("fullscreenchange", function() {
    if (document.fullscreenElement) {
      document.getElementById("cs-exit-fullscreen").classList.remove("hidden");
      document.getElementById("cs-fullscreen").classList.add("hidden");
    } else {
      document.getElementById("cs-exit-fullscreen").classList.add("hidden");
      document.getElementById("cs-fullscreen").classList.remove("hidden");
    }
  });
  document.documentElement.addEventListener("keyup", function(event) {
    if (event.keyCode == 27 && document.getElementById("character-sheet").classList.contains("blurred")) {
      hideCharacterSwitcher();
    }
  });


  // update sheet heading when name is updated
  document.getElementById("cs-name").addEventListener("change", function() {
    document.getElementById("cs-name-heading").textContent = document.getElementById("cs-name").value;
  });


  // listeners for die rolls
  const dice = document.getElementsByClassName("die");
  for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener("click", rollDice);
  }

  showCharacterSwitcher();
  hideSpecifics();

  // Loading spellbooks, triggering tooltip generation, etc
  const customSpellDivs = document.getElementById("page-spellbook").querySelectorAll(".cs-warlock-spell-name,.cs-mage-spell-name");

  for (let i = 0; i < customSpellDivs.length; i++) {
    const div = customSpellDivs[i];
    div.addEventListener("change", function() {
      updateCustomSpellTooltip(div);
    });
  }

  getJSON("https://assets.mythmancer.com/warlock_spells.json", function(err, data) {
    if (err !== null) {
      console.log("Unable to load cleric spellbook wizard");
    } else {
      loadWarlockSpellbookWizard(data);
    }
  });
  getJSON("https://assets.mythmancer.com/mage_spells.json", function(err, data) {
    if (err !== null) {
      console.log("Unable to load mage spellbook wizard");
    } else {
      loadMageSpellbook(data);
    }
  });
};
