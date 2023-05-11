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

window.onload = function() {
  let html = "";
  const panels = [
    new CharacterSheetPanel(
      [
        new CharacterSheetSection(
          null,
          [
            new CharacterSheetEntry("Hit Points", "17/17"),
            new CharacterSheetEntry("Armor Class", "14"),
          ]
        ),
        new CharacterSheetSection(
          "Abilities",
          [
            new CharacterSheetEntry("Strength", "16/+5", rollCheck=new RollCheck("Check", 20)),
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
            new CharacterSheetEntry("Fighter Level", "5"),
            new CharacterSheetEntry("Additional Attacks", "1"),
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
<div id="cs-current-character-heading">Pal Bonwater - Level 6 Elementalist</div>
<div class="cs-panels">
${html}
</div>
</div>
`;
}
