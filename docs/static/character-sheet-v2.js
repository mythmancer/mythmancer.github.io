/* character models - just for demo */
const CHARACTER_MODELS = {
  "Pal Bonwater - Level 6 Elementalist": {
    "total_hit_points": 17,
    "current_hit_points": 16,
    "ability_scores": {
      "strength": "16 / +2",
      "dexterity": "13 / +1",
      "constitution": "9 / 0",
      "wisdom": "17 / +2",
      "intelligence": "16 / +2",
      "charisma": "16 / +2",
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
    const attack = this.numberOfAttacks === 1 ? "Attack" : "Attacks"
    if (this.range === "melee") {
      return `Melee ${attack}`
    } else if (this.range === "reach") {
      return `Melee ${attack} with Reach`
    } else if (this.range === "short" || this.range === "medium" || this.range === "long") {
      return `${this.range.charAt(0).toUpperCase() + this.range.slice(1)}-Range ${attack}`
    } else {
      return "(UNKNOWN RANGE)"
    }
  }

  description() {
    // "1 Attack at +3 to hit dealing 1d6 damage if some condition is filled"
    return `${this.numberOfAttacks} ${this.isFast ? "Fast " : ""}${this._rangeDescription()} at 
      ${this.bonusToHit >= 0 ? `+${this.bonusToHit}` : this.bonusToHit} to hit 
      dealing ${this.damage} damage${this.condition === "" ? "" : ` if ${this.condition}`}`
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
    <div class="cs-col cs-border-right">
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
    <div class="cs-col cs-padding-v">
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
   * @param {DiceButton} mainKeyDiceButton Optional button to roll dice associated with this entry
   * @param {string} mainKeyText Optional text for the left side of the main row in a key-value pair
   * @param {string} valueText Optional text for the right side of the main row in a key-value pair
   * @param {EditButton} editButton Optional button to edit this entry on the far right of the main row
   * @param {SectionSubEntry[]} subEntries Optional vertical list of small-text descriptors beneath the main row
   */
  constructor({
                shortKeyText = "",
                mainKeyDiceButton = null,
                mainKeyText = "",
                valueText = "",
                editButton = null,
                subEntries = []
              }) {
    super();
    this.shortKeyText = shortKeyText;
    this.mainKeyDiceButton = mainKeyDiceButton;
    this.mainKeyText = mainKeyText;
    this.valueText = valueText;
    this.editButton = editButton;
    this.subEntries = subEntries;
  }

  getHTML() {
    return `
    <div class="cs-col cs-padding-h">
      <div class="cs-row">
          ${this.shortKeyText === "" && this.mainKeyDiceButton == null && this.mainKeyText === "" ? "" : `
            <div class="cs-row">
              ${this.shortKeyText === "" ? "" : `<div class="cs-elem cs-width-fixed-short-key">${this.shortKeyText}</div>`}
              ${this.mainKeyDiceButton == null ? "" : this.mainKeyDiceButton.getHTML()}
              <div class="cs-elem cs-width-fill">${this.mainKeyText}</div>
            </div>
          `}
          ${this.valueText === "" && this.editButton == null ? "" : `
            <div class="cs-row">
              ${this.valueText === "" ? "" : `<div class="cs-elem cs-width-full">${this.valueText}</div>`}
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
   * @param {string} text Text for the face of the button
   */
  constructor(text) {
    super();
    this.text = text
  }

  getHTML() {
    return `
    <div class="cs-btn cs-padding-h cs-line-height-btn cs-width-fill cs-color-btn-dice">
        ⚅ ${this.text}
    </div>
    `
  }
}

class EditButton extends HTMLComponent {
  /**
   * Button used for editing entries
   * @param {string} text Text for the face of the button
   */
  constructor(text) {
    super();
    this.text = text;
  }

  getHTML() {
    return `
    <div class="cs-btn cs-padding-h cs-line-height-btn cs-width-fill cs-color-btn-edit">
        ${this.text}
    </div>
    `
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
 * @param {string} value
 * @param {string} description
 */
function actionKeyValue(action, key, value, description = "") {
  return new SectionEntry({
    mainKeyDiceButton: new DiceButton(action),
    mainKeyText: key,
    valueText: value,
    subEntries: description === "" ? [] : [new SectionSubEntry({text: description})]
  })
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
  })
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
    })
  } else {
    return new SectionEntry({
      shortKeyText: part,
      mainKeyText: item,
      editButton: new EditButton("Edit / Remove"),
      subEntries: (description === "") ? [] : [new SectionSubEntry({text: description})]
    })
  }
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
  const characterModel = getCharacterModel(characterName);
  let html = "";

  const panes = [
    new Pane([
      new PaneSection({
          entries: [
            new SectionEntry({
              mainKeyText: "Hit Points",
              valueText: `${characterModel.current_hit_points}/${characterModel.total_hit_points}`
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
          actionKeyValue("Save vs", "Reflex", "TODO"),
          actionKeyValue("Save vs", "Fortitude", "TODO"),
          actionKeyValue("Save vs", "Will", "TODO"),
        ]
      }),
      new PaneSection({
        divider: new SectionDivider("Skills & Special Abilities"),
        entries: [
          actionKeyValue("Perform", "Skill Check", "TODO", "When attempting: TODO - List of Skills"),
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
          new SectionEntry({editButton: new EditButton("+ Add an Effect")})
        ]
      })
    ]),
    new Pane([
      new PaneSection({
        entries: [
          new SectionEntry({
            mainKeyText: "Total Character Level",
            valueText: "6",
            editButton: new EditButton("Level Up / Edit Levels")
          }), new SectionEntry({
            mainKeyText: "Base Attack Bonus",
            valueText: "+2",
          }),
          new SectionEntry({
            mainKeyText: "Allowed Weapons",
            valueText: "Standard",
          }),
          new SectionEntry({
            mainKeyText: "Allowed Armor",
            valueText: "Medium",
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
      ... []  // TODO - load class data from model instead
    ]),
  ]
  for (let i = 0; i < panes.length; i++) {
    html += panes[i].getHTML();
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
    if (characterListings[i] === event.target) {
      characterListings[i].classList.add("cs-character-listing-current");
    } else {
      characterListings[i].classList.remove("cs-character-listing-current");
    }
  }
}

window.onload = function () {
  const characterListings = document.getElementById("cs-character-listings").getElementsByClassName("cs-left-pane-listing");
  for (let i = 0; i < characterListings.length; i++) {
    characterListings[i].addEventListener("click", loadCharacter);
  }
};
