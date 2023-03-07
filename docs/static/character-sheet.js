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
  "cs-armor-class",
  "cs-experience",
  "cs-hit-points",
  "cs-hit-points-current",
  "cs-name",
  "cs-race",
  "cs-total-hit-die",

  "cs-level-fighter",
  "cs-level-mage",
  "cs-level-rogue",
  "cs-level-warlock",

  "cs-charisma",
  "cs-charisma-modifier",
  "cs-constitution",
  "cs-constitution-modifier",
  "cs-constitution-save-throw",
  "cs-dexterity",
  "cs-dexterity-modifier",
  "cs-dexterity-save-throw",
  "cs-intelligence",
  "cs-intelligence-modifier",
  "cs-strength",
  "cs-strength-modifier",
  "cs-wisdom",
  "cs-wisdom-modifier",
  "cs-wisdom-save-throw",

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

  "cs-base-attack-bonus",
  "cs-number-of-attacks",

  "cs-allowed-armor",
  "cs-allowed-weapons",
  "cs-skill-check-bonus",
  "cs-skill-proficiencies",

  "cs-silver",

  "cs-max-spells-learnable-per-degree",
  "cs-max-minor-patrons",
];

DERIVED_CHARACTERISTICS = [
  "cs-total-hit-die",

  "cs-charisma-modifier",
  "cs-constitution-modifier",
  "cs-constitution-save-throw",
  "cs-dexterity-modifier",
  "cs-dexterity-save-throw",
  "cs-intelligence-modifier",
  "cs-strength-modifier",
  "cs-wisdom-modifier",
  "cs-wisdom-save-throw",

  "cs-base-attack-bonus",
  "cs-number-of-attacks",

  "cs-allowed-armor",
  "cs-allowed-weapons",
  "cs-skill-check-bonus",
  "cs-skill-proficiencies",

  "cs-max-spells-learnable-per-degree",
  "cs-max-minor-patrons",
];

CLASSES = [
  "fighter",
  "mage",
  "rogue",
  "warlock",
]

POPULATED_NAMES = [];

VERSION = "0.2.1"

// lock/unlock sensitive fields, which are fields that don't change day-to-day
// sheet can be unlocked to make changes. page always loads with these locked
// prevents accidental mess-ups
function lockSensitiveFields() {
  const divs = document.getElementsByClassName("sensitive-field");
  for(let i = 0; i < divs.length; i++) {
    divs[i].readOnly = true;
  }
  document.getElementById("cs-unlock-sheet").classList.remove("hidden");
  document.getElementById("cs-lock-sheet").classList.add("hidden");
}

function unlockSensitiveFields() {
  const divs = document.getElementsByClassName("sensitive-field");
  for(let i = 0; i < divs.length; i++) {
    divs[i].readOnly = false;
  }
  document.getElementById("cs-unlock-sheet").classList.add("hidden");
  document.getElementById("cs-lock-sheet").classList.remove("hidden");
}

// utilities for hiding/showing race- and class-specific sections
function hideClassDivs(className) {
  const divs = document.getElementsByClassName(className);
  for(let i = 0; i < divs.length; i++) {
    divs[i].classList.add("hidden");
  }
}

function showClassDivs(className) {
  const divs = document.getElementsByClassName(className);
  for(let i = 0; i < divs.length; i++) {
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

  showClassDivs(`for-${characterData["cs-race"].toLowerCase()}`)
  for (let i = 0; i < CLASSES.length; i++) {
    const classLevel = characterData[`cs-level-${CLASSES[i]}`];
    if (classLevel && parseInt(classLevel) > 0) {
      showClassDivs(`for-${CLASSES[i]}`);
    }
  }
}

// update UI from a name
function loadFromName(name) {
  console.log(name);

  const characterDataStr = window.localStorage.getItem(name);

  lockSensitiveFields();
  document.getElementById("character-sheet").classList.remove("blurred");
  document.getElementById("character-switcher").classList.add("hidden");

  // new character form. keep fields unlocked in this view for ease of use
  if (characterDataStr == null) {
    document.getElementById("cs-name-heading").textContent = "";
    document.getElementById("character-sheet").reset();
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

  showAppropriateSpecifics(characterData);
}

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

  d.addEventListener("click", function() {
    loadFromName(name);
  });

  return d;
}

// check if any new character sheets are present in localStorage, and add them
// to the character switcher
function populateCharacterSwitcher() {
  const availableNames = Object.keys(window.localStorage);
  const newCharacterIcon = document.getElementById("cs-new-character");
  const characterCards = document.getElementById("character-cards");
  for (var i = 0; i < availableNames.length; i++){
    if (POPULATED_NAMES.includes(availableNames[i])) {
      continue;
    }
    const switcherElement = createSwitcherElement(availableNames[i]);
    characterCards.insertBefore(switcherElement, newCharacterIcon);
    POPULATED_NAMES.push(availableNames[i]);
  }
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
  var element = document.createElement("a");
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
  for (var prop in map) {
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
    populateCharacterSwitcher();
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

  populateCharacterSwitcher();
  showAppropriateSpecifics(map);
}

// main initializer
window.onload = function() {
  // save to localStorage whenever a field is changed
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", save);
  }

  // control panel on character switcher
  document.getElementById("cs-export").addEventListener("click", exportToFile);
  document.getElementById("cs-lock-sheet").addEventListener("click", lockSensitiveFields);

  // uploader
  const dropbox = document;
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", handleDropUpload, false);
  const uploader = document.getElementById("uploader");
  uploader.addEventListener("change", handleFileUpload, false);

  // control panel on character sheet
  const newCharacterIcon = document.getElementById("cs-new-character");
  newCharacterIcon.addEventListener("click", function() {
    loadFromName(null);
  });
  document.getElementById("cs-unlock-sheet").addEventListener("click", unlockSensitiveFields);
  document.getElementById("cs-switch-character").addEventListener("click", function() {
    document.getElementById("character-sheet").classList.add("blurred");
    document.getElementById("character-switcher").classList.remove("hidden");
  });

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

  // update sheet heading when name is updated
  document.getElementById("cs-name").addEventListener("change", function() {
    document.getElementById("cs-name-heading").textContent = document.getElementById("cs-name").value;
  });

  // listeners for die rolls
  const dice = document.getElementsByClassName("die");
  for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener("click", rollDice);
  }

  populateCharacterSwitcher();
  hideSpecifics();
};
