/* character models - just for demo */
const CHARACTER_MODELS = {
  "Pal Bonwater - Level 6 Elementalist": {
    "total_hit_points": 17,
    "current_hit_points": 16,
    "armor_class": 14,
    "strength": "16/+2",
    "armor": {
      "Chest": "Wet Suit",
      "Gloves": "Bracers of Armor +3",
    },
    "fighter": {
      "level": 5,
      "additional_attacks": 5,
    }
  },
  "Herakles - Level 5 Grinner": {
    "total_hit_points": 100000,
    "current_hit_points": 18,
    "armor_class": 20,
    "strength": "19/+5",
    "armor": {
      "Chest": "Buff af",
      "Gloves": "Gloooooooves",
    },
    "fighter": {
      "level": 221,
      "additional_attacks": 19,
    }    
  },
  "Noam Gnomesky - Level 20 Old Man": {
    "total_hit_points": 2,
    "current_hit_points": 1,
    "armor_class": 1,
    "strength": "0/-3",
    "armor": {
      "Chest": "Sunken",
      "Gloves": "Evening soiree gloves",
    },
    "fighter": {
      "level": -10,
      "additional_attacks": -1,
    }        
  }
};

function getCharacterModel(characterName) {
  return CHARACTER_MODELS[characterName];
}

/* real shit */
class HTMLComponent {
  getHTML() {
    console.log(`${this.constructor.name} does not have a defined HTML rendering function`);
    alert(`Could not render page`);
    throw new Error(`${this.constructor.name} does not have a defined HTML rendering function`);
  }
}

class RollCheck extends HTMLComponent {
  constructor(name, die) {
    super();
    this.name = name;
    this.die = parseInt(die);
  }

  roll() {
    return Math.floor(Math.random() * this.die) + 1;
  }

  getHTML() {
    return `
<div class="cs-die-roll">
⚅${this.name}
</div>
`;
  }
}

class CharacterSheetEntry extends HTMLComponent {
  constructor(name, value, rollCheck=null, notes=null, additionalActions=null) {
    super();
    this.name = name;
    this.value = value;
    this.rollCheck = rollCheck;
    this.notes = notes;
    this.additionalActions = additionalActions;
  }

  rollCheck() {
    return this.rollCheck.roll();
  }

  getHTML() {
    const rollCheckHTML = this.rollCheck ? this.rollCheck.getHTML(): "";
    const notesHTML = this.notes ? `<div class="cs-entry-row">${this.notes}</div>` : "";

    return `
<div class="cs-entry">
<div class="cs-entry-row">
${rollCheckHTML}<div class="content">${this.name} ${this.value}</div>
</div>
${notesHTML}
</div>
`;
  }
}

class CharacterSheetSection extends HTMLComponent {
  constructor(heading, entries) {
    super();
    this.heading = heading;
    this.entries = entries;
  }

  getHTML() {
    const headingHTML = this.heading ? `
<div class="cs-section-heading-row">
<div class="cs-section-heading-decor-left"><hr></div>${this.heading}<div class="cs-section-heading-decor-right"><hr></div>
</div>` : "";
    let entriesHTML = "";
    for (let i = 0; i < this.entries.length; i++) {
      entriesHTML += this.entries[i].getHTML();
    }
    return `
<div class="cs-section">
${headingHTML}${entriesHTML}
</div>
`;
  }
}

class CharacterSheetPanel extends HTMLComponent {
  constructor(sections) {
    super();
    this.sections = sections;
  }

  getHTML() {
    let html = "";
    for (let i = 0; i < this.sections.length; i++) {
      html += this.sections[i].getHTML();
    }
    return `
<div class="cs-panel">
${html}
</div>
`;
  }
}

function renderCharacter(characterName) {
  const characterModel = getCharacterModel(characterName);
  let html = "";
  const panels = [
    new CharacterSheetPanel(
      [
        new CharacterSheetSection(
          null,
          [
            new CharacterSheetEntry("Hit Points", `${characterModel.current_hit_points}/${characterModel.total_hit_points}`),
            new CharacterSheetEntry("Armor Class", `${characterModel.armor_class}`),
          ]
        ),
        new CharacterSheetSection(
          "Abilities",
          [
            new CharacterSheetEntry("Strength", `${characterModel.strength}`, rollCheck=new RollCheck("Check", 20)),
          ]
        ),
      ]
    ),
    new CharacterSheetPanel(
      [
        new CharacterSheetSection(
          "Armor",
          [
            new CharacterSheetEntry("Chest", "Wet Suit"),
            new CharacterSheetEntry("Shield", ""),
          ]
        ),
      ]
    ),
    new CharacterSheetPanel(
      [
        new CharacterSheetSection(
          "Fighter",
          [
            new CharacterSheetEntry("Fighter Level", `${characterModel.fighter.level}`),
            new CharacterSheetEntry("Additional Attacks", `${characterModel.fighter.additional_attacks}`),
          ]
        ),
      ]
    ),
  ];
  for (let i = 0; i < panels.length; i++) {
    html += panels[i].getHTML();
  }
  document.getElementById("cs-right-pane").innerHTML = `
<div id="cs-current-character">
<div id="cs-current-character-heading">${characterName}</div>
<div class="cs-panels">
${html}
</div>
</div>
`;

}

window.onload = function() {
  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    characterListings[i].addEventListener("click", function(e) {
      renderCharacter(e.target.textContent);
      const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
      for (let i = 0; i < characterListings.length; i++) {
        if (characterListings[i] == e.target) {
          characterListings[i].classList.add("cs-character-listing-current");
        } else {
          characterListings[i].classList.remove("cs-character-listing-current");
        }
      }
    });
  }
};
