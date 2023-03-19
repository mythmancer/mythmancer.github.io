COLLECTIONS = [
  "cs-inventory",
  "cs-misc",
  "cs-weapon-bonus-to-hit",
  "cs-weapon-damage",
  "cs-weapon-features",
  "cs-weapon-name",

  "cs-spell-name",
  "cs-spell-qty",
];

CHARACTERISTICS = [
  // populate cs-name first, since that's what's used to identify the current state
  // so even if anything goes wrong in later rendering, we have something to go to
  // TODO: store current character in localStorage so that we don't need this?
  "cs-name",

  "cs-experience",
  "cs-hit-points",
  "cs-hit-points-current",
  "cs-race",

  "cs-level-fighter",
  "cs-level-mage",
  "cs-level-rogue",
  "cs-level-warlock",

  "cs-charisma",
  "cs-constitution",
  "cs-dexterity",
  "cs-intelligence",
  "cs-strength",
  "cs-wisdom",

  "cs-equipment-armor",
  "cs-equipment-boots",
  "cs-equipment-cloak",
  "cs-equipment-gloves",
  "cs-equipment-neck",
  "cs-equipment-other-1",
  "cs-equipment-other-2",
  "cs-equipment-ring-1",
  "cs-equipment-ring-2",
  "cs-equipment-shield",

  "cs-silver",
];

CREATION_OPTION_TO_SHEET = {
  "opt-charisma": "cs-charisma",
  "opt-constitution": "cs-constitution",
  "opt-dexterity": "cs-dexterity",
  "opt-intelligence": "cs-intelligence",
  "opt-strength": "cs-strength",
  "opt-wisdom": "cs-wisdom",
};

CLASSES = [
  "fighter",
  "mage",
  "rogue",
  "warlock",
];

POPULATED_NAMES = [];

VERSION = "0.2.1"

// example, "Chain Mail (+2)"
EQUIPMENT_RE = /(?<armorType>[a-zA-Z ]*)(\(\+(?<acMod>\d+)\))?/;

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
  },
  1: {
    "rogue": 3,
    "mage": 1,
  },
  2: {
    "rogue": 5,
    "mage": 1,
  },
  3: {
    "rogue": 5,
    "mage": 1,
  },
  4: {
    "rogue": 6,
    "mage": 2,
  },
  5: {
    "rogue": 7,
    "mage": 2,
  },
  6: {
    "rogue": 8,
    "mage": 2,
  },
  7: {
    "rogue": 8,
    "mage": 2,
  },
  8: {
    "rogue": 9,
    "mage": 3,
  },
  9: {
    "rogue": 10,
    "mage": 3,
  },
};

DERIVED_CHARACTERISTICS = {
  // save throws and attribute modifiers
  "cs-charisma-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-charisma"])];
  },
  "cs-constitution-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-constitution"])];
  },
  "cs-constitution-save-throw": function(characterData) {
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-constitution"])]
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 2)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 4)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 4)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 3);
  },
  "cs-dexterity-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-dexterity"])];
  },
  "cs-dexterity-save-throw": function(characterData) {
    // DEX + FGT/3 + MAG/3 + ROG/2 + WAR/4
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-dexterity"])]
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 3)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 3)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 2)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 4);
  },
  "cs-intelligence-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-intelligence"])];
  },
  "cs-strength-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-strength"])];
  },
  "cs-wisdom-modifier": function(characterData) {
    // table
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-wisdom"])];
  },
  "cs-wisdom-save-throw": function(characterData) {
    // WIS + FGT/4 + MAG/2 + ROG/3 + WAR/2
    return ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-wisdom"])]
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-fighter"]) / 4)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 2)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 3)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 2);
  },

  // class-based calculations
  "cs-total-hit-die": function(characterData) {
    // FGT + MAG + ROG + WAR
    return getNumericalCharacteristic(characterData["cs-level-fighter"])
      + getNumericalCharacteristic(characterData["cs-level-mage"])
      + getNumericalCharacteristic(characterData["cs-level-rogue"])
      + getNumericalCharacteristic(characterData["cs-level-warlock"]);
  },

  "cs-base-attack-bonus": function(characterData) {
    // FGT + MAG/4 + ROG/2 + WAR/2
    return getNumericalCharacteristic(characterData["cs-level-fighter"])
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 4)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-rogue"]) / 2)
      + Math.floor(getNumericalCharacteristic(characterData["cs-level-warlock"]) / 2);
  },
  "cs-number-of-attacks": function(characterData) {
    // max(1 + (FGT-1)/4, 1)
    return Math.max(
      Math.floor(1 + (getNumericalCharacteristic(characterData["cs-level-fighter"]) - 1) / 4),
      1,
    );
  },
  "cs-allowed-armor": function(characterData) {
    // if(FGT > 0, "Heavy + Shields", if(WAR > 0, "Medium", if(ROG > 0, "Light", "None")))
    if (getNumericalCharacteristic(characterData["cs-level-fighter"]) > 0) {
      return "Heavy + Shields";
    } else if (getNumericalCharacteristic(characterData["cs-level-warlock"]) > 0) {
      return "Medium";
    } else if (getNumericalCharacteristic(characterData["cs-level-rogue"]) > 0) {
      return "Light";
    } else {
      return "None";
    }
  },
  "cs-allowed-weapons": function(characterData) {
    // if(FGT > 0, "Martial", if(ROG+WAR > 0, "Standard", "Simple"))
    if (getNumericalCharacteristic(characterData["cs-level-fighter"]) > 0) {
      return "Martial";
    } else if (getNumericalCharacteristic(characterData["cs-level-warlock"]) > 0) {
      return "Standard";
    } else if (getNumericalCharacteristic(characterData["cs-level-rogue"]) > 0) {
      return "Standard";
    } else {
      return "Simple";
    }
  },
  "cs-skill-check-bonus": function(characterData) {
    // ROG + MAG/2
    return Math.floor(getNumericalCharacteristic(characterData["cs-level-mage"]) / 2)
      + getNumericalCharacteristic(characterData["cs-level-rogue"]);
  },
  "cs-skill-proficiencies": function(characterData) {
    // table
    return SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-mage"])]["mage"]
      + SKILL_PROFICIENCY_TABLE[getNumericalCharacteristic(characterData["cs-level-rogue"])]["rogue"];
  },

  // spell casters
  "cs-max-spells-learnable-per-degree": function(characterData) {
    // 5 + INT
    return 5 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-intelligence"])];
  },
  "cs-max-minor-patrons": function(characterData) {
    // min(1 + CHA, (WAR+1)/2)
    return Math.min(
      1 + ATTRIBUTE_MODIFIER_TABLE[getNumericalCharacteristic(characterData["cs-charisma"])],
      Math.floor((getNumericalCharacteristic(characterData["cs-level-warlock"]) + 1) / 2)
    );
  },

  // AC
  "cs-armor-class": function(characterData) {
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

      if (typeof ARMOR[armorType]["ac"] === 'function') {
        equipmentAC += ARMOR[armorType]["ac"](characterData);
      } else {
        equipmentAC += ARMOR[armorType]["ac"];
      }
    }

    return 10 + dexMod + equipmentAC;
  },

  // spell slots
  "cs-slots-w1": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][1];
  },
  "cs-slots-w2": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][2];
  },
  "cs-slots-w3": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][3];
  },
  "cs-slots-w4": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][4];
  },
  "cs-slots-w5": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-warlock"])][5];
  },
  "cs-slots-m1": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][1];
  },
  "cs-slots-m2": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][2];
  },
  "cs-slots-m3": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][3];
  },
  "cs-slots-m4": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][4];
  },
  "cs-slots-m5": function(characterData) {
    return SPELL_SLOTS[getNumericalCharacteristic(characterData["cs-level-mage"])][5];
  },
};

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

// autocalculate and populate derived characteristics
function populateDerivedCharacteristics(characterData) {
  for (let prop in DERIVED_CHARACTERISTICS) {
    document.getElementById(prop).value = DERIVED_CHARACTERISTICS[prop](characterData);
  }
}

function clearSheet() {
  document.getElementById("cs-name-heading").textContent = "";
  document.getElementById("character-sheet").reset();
}

// update UI from a name
function loadFromName(name) {
  console.log(name);

  const characterDataStr = window.localStorage.getItem(name);

  lockSensitiveFields();
  hideCharacterSwitcher();
  clearSheet();

  // new character form. keep fields unlocked in this view for ease of use
  if (characterDataStr == null) {
    document.getElementById("cs-delete-sheet").classList.add("hidden");
    unlockSensitiveFields();
    return;
  }

  const characterData = JSON.parse(characterDataStr);

  // populate page
  document.getElementById("cs-name-heading").textContent = name;

  for (let i = 0; i < CHARACTERISTICS.length; i++) {
    document.getElementById(CHARACTERISTICS[i]).value = characterData[CHARACTERISTICS[i]];
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const elementDatas = characterData[COLLECTIONS[i]] || [];
    const elements = document.getElementsByClassName(COLLECTIONS[i]);
    for (let j = 0; j < elementDatas.length; j++) {
      elements[j].value = elementDatas[j];
    }
  }

  populateDerivedCharacteristics(characterData);
  showAppropriateSpecifics(characterData);
  document.getElementById("cs-delete-sheet").classList.remove("hidden");
}

function rollDice(event) {
  const max = parseInt(event.target.title.substr(1));
  const result = Math.floor(Math.random() * max) + 1;
  document.getElementById("die-result").textContent = result;
}

// download-related functions - downloads all character sheets as a single json to disk
function exportData() {
  const characterData = {};

  for (let i = 0; i < CHARACTERISTICS.length; i++) {
    const data = document.getElementById(CHARACTERISTICS[i]).value;
    characterData[CHARACTERISTICS[i]] = data;
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    characterData[COLLECTIONS[i]] = [];
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const elements = document.getElementsByClassName(COLLECTIONS[i]);
    const arr = [];
    for (let j = 0; j < elements.length; j++) {
      const data = elements[j].value;
      arr.push(data);
    }
    characterData[COLLECTIONS[i]] = arr;
  }

  console.log(characterData);
  return characterData;
}

function exportToFile() {
  // fake a download request
  const text = JSON.stringify(window.localStorage);
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
  console.log(mapString);
  if (mapString == null || mapString == "") {
    return names;
  }
  const map = JSON.parse(mapString);
  for (let prop in map) {
    names.push(prop);
    if (Object.prototype.hasOwnProperty.call(map, prop)) {
      window.localStorage.setItem(prop, map[prop]);
    }
  }
  return names;
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
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

  console.log(files[0]);
  importData(files[0]);
}

function handleFileUpload(e) {
  e.stopPropagation();
  e.preventDefault();

  console.log(e.target.files[0]);
  importData(e.target.files[0]);
}

// save to localStorage
function save() {
  const map = exportData();
  if (map["cs-name"] == "") {
    return;
  }
  window.localStorage.setItem(map["cs-name"], JSON.stringify(map));

  try {
    showAppropriateSpecifics(map);
    populateDerivedCharacteristics(map);
  } catch(err) {
    console.log("error");
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
  let d = document.createElement('div');
  d.classList.add("character-card");

  let letterD = document.createElement('div');
  letterD.classList.add("character-letter");
  letterD.textContent = name[0].toUpperCase();
  let nameD = document.createElement('div');
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
  const availableNames = Object.keys(window.localStorage);
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

// main initializer
window.onload = function() {
  // save to localStorage whenever a field is changed
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", save);
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
  document.body.addEventListener('mouseup', function() {
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
    window.localStorage.removeItem(name);
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

  // make derived fields readonly
  for (let prop in DERIVED_CHARACTERISTICS) {
    document.getElementById(prop).readOnly = true;
  }

  showCharacterSwitcher();
  hideSpecifics();
};
