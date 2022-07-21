import Person from './Person.js';

export default class Team {
  constructor(name = '') {
    this._teamMembers = [];
    this._name = name;
  }

  get name() {
    return this._name;
  }
  set name(n) {
    this._name = n;
  }

  get teamMembers() {
    return this._teamMembers;
  }

  addPerson(person) {
    const found = this._teamMembers.find((tm) => tm.name == person.name);
    if (!found) {
      this._teamMembers.push(person);
    } else {
      alert('Sorry, that person already exists on the team!');
    }
  }

  removePerson(person) {
    const indexToDelete = this._teamMembers.indexOf(person);
    this._teamMembers.splice(indexToDelete, 1);
  }

  score() {
    let score = 0;
    if (this._teamMembers && this._teamMembers.length > 0) {
      for (const p of this._teamMembers) {
        score += p.effectiveScore();
      }
    }
    return score;
  }

  readyForBattle() {
    return this._teamMembers.length > 0;
  }

  toJSON() {
    return {
      name: this._name,
      teamMembers: this._teamMembers.map((m) => m.person()),
    };
  }

  static fromJsonObject(teamObject) {
    const team = new Team(teamObject.name ?? '');
    if (teamObject.teamMembers) {
      team._teamMembers = teamObject.teamMembers.map((p) => new Person(p));
    }
    return team;
  }
}
