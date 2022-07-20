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
      localStorage.setItem(url, person.toJson());
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
  save(battle) {
    //Not the most efficient, but OK for now.
    const battles = load();
    battles.push(battle);
    localStorage.setItem('battles', JSON.stringify(battles));
  }

  load() {
    const battleJson = localStorage.getItem('battles');
    if (battleJson) {
      const battles = JSON.parse(battleJson);
      return battles.map((b) => {
        const team = Team.fromObjects(b);
        return new Battle(team);
      });
    }
    return null;
  }
}
