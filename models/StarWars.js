import { get } from '../util.js';
import PersonSummary from './PersonSummary.js';
import Person from './Person.js';

//const BaseUrl = 'https://swapi.dev'
const BaseUrl = 'http://localhost:8000';

export default class StarWars {
  async getPeople() {
    var page = await get(`${BaseUrl}/api/people/`);
    console.dir(page);
    let people = [];

    while (page) {
      for (let p of page.results) {
        people.push(new PersonSummary(p.name, p.url));
      }

      if (page.next) {
        page = await get(page.next);
      } else {
        break;
      }
    }

    return people;
  }

  async getPerson(url) {
    let person = await get(url);
    if (person) {
      if (person.homeworld) {
        const homeworld = await get(person.homeworld);
        person['homeworld'] = homeworld.name;
      }

      if (person.species.length > 0) {
        const species = await get(person.species[0]);
        person['species'] = species.name;
      } else {
        person['species'] = 'Not Specified';
      }
      const newPerson = new Person(person);
      return newPerson;
    }

    console.log(`Getting person from ${url} did not return valid data`);
    return null;
  }
}
