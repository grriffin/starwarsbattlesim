import PersonSummary from "./models/PersonSummary.js";

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
    return people.map( p => new PersonSummary(p._name, p._url));
  }
}