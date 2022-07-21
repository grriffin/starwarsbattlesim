export default class Person {
  #person;

  constructor(person) {
    this.#person = person;
  }

  get birthYear() {
    return this.#person.birth_year;
  }

  get eyeColor() {
    return this.#person.eye_color;
  }

  get gender() {
    return this.#person.gender;
  }

  get hairColor() {
    return this.#person.hair_color;
  }

  get height() {
    return this.#person.height;
  }

  get homeworld() {
    return this.#person.homeworld;
  }

  get mass() {
    return this.#person.mass;
  }

  get name() {
    return this.#person.name;
  }

  get skinColor() {
    return this.#person.skin_color;
  }

  get species() {
    return this.#person.species;
  }

  get starships() {
    return this.#person.starships;
  }

  get vehicles() {
    return this.#person.vehicles;
  }

  effectiveScore() {
    let score = (this.mass ?? 1) * (this.vehicles?.length ?? 0);
    if (this.species == 'Droid') {
      score += 150;
    }
    return score;
  }

  person() {
    return this.#person;
  }

  toJSON() {
    return this.#person;
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
