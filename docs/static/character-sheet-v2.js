/* character models - just for demo */
const CHARACTER_MODELS = {
  "Pal Bonwater - Level 6 Elementalist": {
    "total_hit_points": 17,
    "current_hit_points": 16,
    "ability_scores": {
      "strength": "16/+2",
      "dexterity": "13/+1",
      "constitution": "9/0",
      "wisdom": "17/+2",
      "intelligence": "16/+2",
      "charisma": "16/+2",
    },
    "armor_class": 14,
    "armor": {
      "Chest": "Wet Suit",
      "Gloves": "Bracers of Armor +3",
    },
    "fighter": {
      "level": 5,
      "additional_attacks": 5,
      "weapon_specializations": 2,
    },
    "rogue": {
      "level": 5,
      "skill_specializations": 1,
    },
    "mage": {
      "level": 5,
      "arcane_spell_slots": "4/2/1",
      "max_spells_per_degree": 7,
      "arcane_casting_in_armor": 3,
    },
    "warlock": {
      "level": 5,
      "occult_spell_slots": "4/2/1",
      "domain": "Elemental - Water",
      "major_patron": "Rath - Water Aspect",
      "minor_patrons": 2,
    },
  },
  "Herakles - Level 5 Grinner": {
    "total_hit_points": 100000,
    "current_hit_points": 18,
    "armor_class": 20,
    "ability_scores": {
      "strength": "19/+5",
      "dexterity": "1/+1",
      "constitution": "2/+2",
      "wisdom": "3/+3",
      "intelligence": "4/+4",
      "charisma": "5/+5",
    },
    "armor": {
      "Chest": "Buff af",
      "Gloves": "Gloooooooves",
    },
    "fighter": {
      "level": 221,
      "additional_attacks": 19,
    },
    "rogue": {
      "level": 1,
      "skill_specializations": 0,
    },
    "mage": {
      "level": 2,
      "arcane_spell_slots": "2/1",
      "max_spells_per_degree": 3,
      "arcane_casting_in_armor": 1,
    },
    "warlock": {
      "level": 3,
      "occult_spell_slots": "3/1",
      "domain": "Elemental - Ice",
      "major_patron": "Belch",
      "minor_patrons": 12,
    },
  },
  "Noam Gnomesky - Level 20 Old Man": {
    "total_hit_points": 2,
    "current_hit_points": 1,
    "armor_class": 1,
    "ability_scores": {
      "strength": "0/-3",
      "dexterity": "0/-3",
      "constitution": "0/-3",
      "wisdom": "20/+5",
      "intelligence": "10/0",
      "charisma": "15/+2",
    },
    "armor": {
      "Chest": "Sunken",
      "Gloves": "Evening soiree gloves",
    },
    "fighter": {
      "level": -10,
      "additional_attacks": -1,
    },
    "rogue": {
      "level": 13,
      "skill_specializations": 14,
    },
    "mage": {
      "level": 16,
      "arcane_spell_slots": "5/4/2/1",
      "max_spells_per_degree": 10,
      "arcane_casting_in_armor": 19,
    },
    "warlock": {
      "level": 2,
      "occult_spell_slots": "0/0/0/0",
      "domain": "Arcana",
      "major_patron": "Some old dead thing",
      "minor_patrons": 100,
    },
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
            new CharacterSheetEntry("Strength", `${characterModel.ability_scores.strength}`, rollCheck=new RollCheck("Check", 20)),
            new CharacterSheetEntry("Dexterity", `${characterModel.ability_scores.dexterity}`, rollCheck=new RollCheck("Check", 20)),
            new CharacterSheetEntry("Consitution", `${characterModel.ability_scores.constitution}`, rollCheck=new RollCheck("Check", 20)),
            new CharacterSheetEntry("Wisdom", `${characterModel.ability_scores.wisdom}`, rollCheck=new RollCheck("Check", 20)),
            new CharacterSheetEntry("Intelligence", `${characterModel.ability_scores.intelligence}`, rollCheck=new RollCheck("Check", 20)),
            new CharacterSheetEntry("Charisma", `${characterModel.ability_scores.charisma}`, rollCheck=new RollCheck("Check", 20)),
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
            new CharacterSheetEntry("Fighter Level", characterModel.fighter.level),
            new CharacterSheetEntry("Additional Attacks", characterModel.fighter.additional_attacks),
            new CharacterSheetEntry("Weapon Specializations", characterModel.fighter.weapon_specializations),
          ]
         ),
        new CharacterSheetSection(
          "Rogue",
          [
            new CharacterSheetEntry("Rogue Level", characterModel.rogue.level),
            new CharacterSheetEntry("Skill Specializations", characterModel.rogue.skill_specializations),
          ],
        ),
        new CharacterSheetSection(
          "Mage",
          [
            new CharacterSheetEntry("Mage Level", characterModel.mage.level),
            new CharacterSheetEntry("Arcane Spell Slots", characterModel.mage.arcane_spell_slots),
            new CharacterSheetEntry("Max Spells Per Degree", characterModel.mage.max_spells_per_degree),
            new CharacterSheetEntry("Arcane Casting in Armor", `Up to ${characterModel.mage.max_spells_per_degree}rd degree`),
          ],
        ),
        new CharacterSheetSection(
          "Warlock",
          [
            new CharacterSheetEntry("Warlock Level", characterModel.warlock.level),
            new CharacterSheetEntry("Occult Spell Slots", characterModel.warlock.occult_spells_slots),
            new CharacterSheetEntry("Domain", characterModel.warlock.domain),
            new CharacterSheetEntry("Major Patron", characterModel.warlock.major_patron),
            new CharacterSheetEntry("Minor Patron", `Up to ${characterModel.warlock.major_patron}`),
          ],
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

function loadCharacter(event) {
  renderCharacter(event.target.textContent);
  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    if (characterListings[i] == event.target) {
      characterListings[i].classList.add("cs-character-listing-current");
    } else {
      characterListings[i].classList.remove("cs-character-listing-current");
    }
  }
}

window.onload = function() {
  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    characterListings[i].addEventListener("click", loadCharacter);
  }
};
