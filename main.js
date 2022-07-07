import {StarWars} from "./models/StarWars.js";
import {spin} from "./util.js"
import {PeopleCache} from "./repository.js";

window.onload = async (event) => {
  spin('loader', async () => {
    const peopleCache = new PeopleCache();
    const sw = new StarWars();
    let people = peopleCache.load();

    if (!people) {
      people = await sw.getPeople();
      peopleCache.save(people);
    }

    const peopleElement = document.getElementById('people-list');
    for(const p of people) {
      const pe = document.createElement('li');
      pe.innerHTML = `<a href=${p.url}>${p.name}</a>`;
      peopleElement.appendChild(pe);
    }
  });
};