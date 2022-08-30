COLLECTIONS = [
  "cs-bonus-to-hit",
  "cs-damage",
  "cs-rate-of-fire",
  "cs-weapon",
  "cs-weapon-proficiency",
  "inventory",
  "notes",
];

CHARACTERISTICS = [
  "cs-armor",
  "cs-armor-class",
  "cs-armor-other-1",
  "cs-armor-other-2",
  "cs-armor-proficiency",
  "cs-base-bonus-to-hit",
  "cs-boots",
  "cs-cha",
  "cs-charisma",
  "cs-cloak",
  "cs-con",
  "cs-constitution",
  "cs-dex",
  "cs-dexterity",
  "cs-experience",
  "cs-fighter-level",
  "cs-fortitude-save-bonus",
  "cs-gloves",
  "cs-hit-points",
  "cs-int",
  "cs-intelligence",
  "cs-mage-level",
  "cs-name",
  "cs-neck",
  "cs-non-proficient-penalty-to-hit",
  "cs-race",
  "cs-reflex-save-bonus",
  "cs-ring-1",
  "cs-ring-2",
  "cs-rogue-level",
  "cs-shield",
  "cs-str",
  "cs-strength",
  "cs-total-character-level",
  "cs-warlock-level",
  "cs-will-save-bonus",
  "cs-wis",
  "cs-wisdom",
];

POPULATED_NAMES = [];

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
    document.getElementById(CHARACTERISTICS[i]).value = characterData[CHARACTERISTICS[i]];
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const elementDatas = characterData[COLLECTIONS[i]];
    const elements = document.getElementsByClassName(COLLECTIONS[i]);
    for (let j = 0; j < elementDatas.length; j++) {
      elements[j].value = elementDatas[j];
    }
  }
}

function save() {
  const map = exportData();
  if (map["cs-name"] == "") {
    return;
  }
  window.localStorage.setItem(map["cs-name"], JSON.stringify(map));
  populateNameSelector();
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

function drop(e) {
  console.log("ASDF");
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  console.log(files);
  importData(files[0]);
}

window.onload = function() {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", save);
  }

  let dropbox = document.getElementById("cs-import");
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

  document.getElementById("cs-export").addEventListener("click", exportToFile);
  document.getElementById("cs-armor-proficiency").addEventListener("change", save);
  document.getElementById("cs-name").addEventListener("change", function() {
    document.getElementById("cs-saved-names").value = document.getElementById("cs-name").value;
  });

  const dice = document.getElementsByClassName("die");
  for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener("click", rollDice);
  }

  populateNameSelector();

  const nameSelector = document.getElementById("cs-saved-names");
  nameSelector.addEventListener("change", loadFromName);
};
