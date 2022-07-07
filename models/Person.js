
import { get } from '../util.js'

export class Person {
  
  #person;

  static async load(url) {
    let p = await get(url);
    return new Person(p);
  }

  constructor(person) {
    this.#person = person;
    
  }

  birthYear() {
    return this.#person.birth_year;
  }
  
  eyeColor() {
    return this.#person.eye_color;
  }

  gender() {
    return this.#person.gender;
  }

  hairColor() {
    return this.#person.hair_color;
  }

  height() {
    return this.#person.height;
  }

  homeworld() {
    return this.#person.homeworld;
  }

  mass() {
    return this.#person.mass;
  }

  name() {
    return this.#person.name;
  }

  skinColor() {
    return this.#person.skin_color;
  }

  species() {
    return this.#person.species;
  }

  starships() {
    return this.#person.starships;
  }

  vehicles() {
    return this.#person.vehicles;
  }
}

/**"birth_year": "19 BBY",
    "eye_color": "Blue",
    "films": [
        "https://swapi.dev/api/films/1/",
        ...
    ],
    "gender": "Male",
    "hair_color": "Blond",
    "height": "172",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "mass": "77",
    "name": "Luke Skywalker",
    "skin_color": "Fair",
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-10T13:52:43.172000Z",
    "species": [
        "https://swapi.dev/api/species/1/"
    ],
    "starships": [
        "https://swapi.dev/api/starships/12/",
        ...
    ],
    "url": "https://swapi.dev/api/people/1/",
    "vehicles": [
        "https://swapi.dev/api/vehicles/14/"
        ...
    ] */