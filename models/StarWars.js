import { get } from '../util.js';
import PersonSummary from './PersonSummary.js';

export class StarWars {

  async getPeople() {
    var page = await get('https://swapi.dev/api/people/');
    console.dir(page);
    let people = [];

    while(page) {

      for(let p of page.results) {
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

}