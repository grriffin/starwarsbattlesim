import PersonSummary from './models/PersonSummary.js';
import Person from './models/Person.js';
import Battle from './models/Battle.js';
import Team from './models/Team.js';

export class PeopleCache {
  save(people) {
    localStorage.setItem('summaries', JSON.stringify(people));
  }

  load() {
    let peopleJson = localStorage.getItem('summaries');
    if (!peopleJson) {
      return null;
    }

    var people = JSON.parse(peopleJson);
    return people.map((p) => new PersonSummary(p._name, p._url));
  }
}

export class PeopleDetailCache {
  save(url, person) {
    if (person) {
      localStorage.setItem(url, JSON.stringify(person));
    }
  }

  load(url) {
    let personJson = localStorage.getItem(url);
    if (!personJson) {
      return null;
    }

    const person = new Person(JSON.parse(personJson));
    return person;
  }
}

export class BattleHistory {
  saveCurrentTeam(team) {
    if (!team) {
      localStorage.removeItem('currentTeam');
      return;
    }
    localStorage.setItem('currentTeam', JSON.stringify(team));
  }

  loadCurrentTeam() {
    const currentTeam = localStorage.getItem('currentTeam');
    if (currentTeam) {
      return Team.fromJsonObject(JSON.parse(currentTeam));
    }
    return null;
  }

  save(battle) {
    //Not the most efficient, but OK for now.
    let battles = this.load();
    if (!battles) {
      battles = [];
    }
    battles.push(battle);
    localStorage.setItem('battles', JSON.stringify(battles));
  }

  load() {
    const battleJson = localStorage.getItem('battles');
    if (battleJson) {
      const battles = JSON.parse(battleJson);
      return battles.map((b) => Battle.fromJsonObject(b));
    }
    return null;
  }
}
