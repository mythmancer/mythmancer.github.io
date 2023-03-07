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

function exportData() {
  const characterData = {};

  for (let i = 0; i < CHARACTERISTICS.length; i++) {
    console.log(CHARACTERISTICS[i]);
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
  const text = JSON.stringify(window.localStorage);
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", `mythmancer-character-sheets-${new Date().toISOString().replaceAll(":", "-")}.json`);

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function loadFromJsonString(mapString) {
  let name = "";
  console.log(mapString);
  if (mapString == null || mapString == "") {
    return;
  }
  const map = JSON.parse(mapString);
  for (var prop in map) {
    if (Object.prototype.hasOwnProperty.call(map, prop)) {
      window.localStorage.setItem(prop, map[prop]);
    }
  }
}

function hideClassDivs(className) {
  console.log(`hiding ${className}`);
  const divs = document.getElementsByClassName(className);
  for(let i = 0; i < divs.length; i++) {
    divs[i].classList.add("hidden");
  }
}

function showClassDivs(className) {
  console.log(`showing ${className}`);
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

function showAppropriateSpecifics(characterData) {
  hideSpecifics();

  showClassDivs(`for-${characterData["cs-race"].toLowerCase()}`)
  for (let i = 0; i < CLASSES.length; i++) {
    console.log(CLASSES[i])
    const classLevel = characterData[`cs-level-${CLASSES[i]}`];
    if (classLevel && parseInt(classLevel) > 0) {
      showClassDivs(`for-${CLASSES[i]}`);
    }
  }
}

function loadFromName() {
  const name = document.getElementById("cs-saved-names").value;

  console.log(name);

  const characterDataStr = window.localStorage.getItem(name);

  if (characterDataStr == null) {
    document.getElementById("character-sheet").reset();
    return;
  }

  const characterData = JSON.parse(characterDataStr);

  for (let i = 0; i < CHARACTERISTICS.length; i++) {
    console.log(CHARACTERISTICS[i]);
    document.getElementById(CHARACTERISTICS[i]).value = characterData[CHARACTERISTICS[i]];
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const elementDatas = characterData[COLLECTIONS[i]] || [];
    const elements = document.getElementsByClassName(COLLECTIONS[i]);
    console.log(COLLECTIONS[i])
    for (let j = 0; j < elementDatas.length; j++) {
      console.log(j);
      elements[j].value = elementDatas[j];
    }
  }

  showAppropriateSpecifics(characterData);
}

function save() {
  const map = exportData();
  if (map["cs-name"] == "") {
    return;
  }
  window.localStorage.setItem(map["cs-name"], JSON.stringify(map));

  populateNameSelector();
  showAppropriateSpecifics(map);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
    loadFromJsonString(e.target.result);
    populateNameSelector();
  };
  reader.readAsText(file);
}

function populateNameSelector() {
  const availableNames = Object.keys(window.localStorage);
  const nameSelector = document.getElementById("cs-saved-names");
  for (var i = 0; i < availableNames.length; i++){
    if (POPULATED_NAMES.includes(availableNames[i])) {
      continue;
    }
    var opt = document.createElement("option");
    opt.value = availableNames[i];
    opt.innerHTML = availableNames[i];
    nameSelector.appendChild(opt);
    POPULATED_NAMES.push(availableNames[i]);
  }
}

function rollDice(event) {
  console.log(event.target);
  const max = parseInt(event.target.title.substr(1));
  const result = Math.floor(Math.random() * max) + 1;
  document.getElementById("die-result").textContent = result;
}

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
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


window.onload = function() {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", save);
  }

  const dropbox = document;
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", handleDropUpload, false);

  const uploader = document.getElementById("uploader");
  uploader.addEventListener("change", handleFileUpload, false);

  document.getElementById("cs-export").addEventListener("click", exportToFile);
  document.getElementById("cs-name").addEventListener("change", function() {
    document.getElementById("cs-saved-names").value = document.getElementById("cs-name").value;
  });

  const dice = document.getElementsByClassName("die");
  for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener("click", rollDice);
  }

  populateNameSelector();
  hideSpecifics();

  const nameSelector = document.getElementById("cs-saved-names");
  nameSelector.addEventListener("change", loadFromName);
};
