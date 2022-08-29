COLLECTIONS = [
  "cs-bonus-to-hit",
  "cs-damage",
  "cs-rate-of-fire",
  "cs-weapon",
  "cs-weapon-proficiency",
  "inventory",
  "notes",
]

CHARACTERISTICS = [
  "cs-armor",
  "cs-armor-class",
  "cs-armor-other-1",
  "cs-armor-other-2",
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
]

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

function loadFromMap(map) {
  let name = "";
  console.log(map);
  if (map != null) {
    window.localStorage.setItem(map["cs-name"], JSON.stringify(map));
    name = map["cs-name"];
  }
  loadFromName(name);
}

function loadFromName(name) {
    console.log(name);

  const characterDataStr = window.localStorage.getItem(name);

  if (characterDataStr == null) {
    return;
  }

  const characterData = JSON.parse(characterDataStr);

  console.log(characterData);
  console.log(characterData["cs-hit-points"])

  for (let i = 0; i < CHARACTERISTICS.length; i++) {
    console.log(i);
    console.log(CHARACTERISTICS[i]);
    console.log(characterData[CHARACTERISTICS[i]]);
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
  window.localStorage.setItem(map["cs-name"], JSON.stringify(map));
}

function importData(jsonStr) {
  load(jsonStr);
}

window.onload = function() {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', save);
  }
}
