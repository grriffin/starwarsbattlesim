import PersonSummary from './models/PersonSummary.js';
import Person from './models/Person.js';

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
