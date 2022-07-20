import Person from './Person.js';

export default class Team {
  constructor() {
    this.teamMembers = [];
  }

  addPerson(person) {
    const found = this.teamMembers.find((tm) => tm.name == person.name);
    if (!found) {
      this.teamMembers.push(person);
    } else {
      alert('Sorry, that person already exists on the team!');
    }
  }

  removePerson(person) {
    const indexToDelete = this.teamMembers.indexOf(person);
    this.teamMembers.splice(indexToDelete, 1);
  }

  score() {
    if (this.teamMembers.length == 0) {
      return 0;
    }

    return this.teamMembers.length;
  }

  readyForBattle() {
    return this.teamMembers.length > 0;
  }

  static fromObjects(personObjects) {
    const team = new Team();
    team.teamMembers = personObjects.map((p) => new Person(p));
    return team;
  }
}
