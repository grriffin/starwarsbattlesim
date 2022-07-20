export default class PeopleView {
  renderPeopleSummaries(peopleList, peopleElement, onPersonClick) {
    //const peopleElement = document.getElementById('people-list');
    for (const p of peopleList) {
      const pe = document.createElement('li');
      pe.classList.add('person');
      pe.innerText = p.name;
      pe.addEventListener('click', async () => {
        console.log('click event', p);
        await onPersonClick(p);
      });
      //pe.innerHTML = `<a href=${p.url}>${p.name}</a>`;
      peopleElement.appendChild(pe);
    }
  }

  renderPersonDetail(person, parent) {
    var detail = document.createElement('div');
    detail.classList.add('person-detail');
    detail.innerHTML =
      `<p>Name: ${person.name}</p>` +
      `<p>Species: ${person.species}</p>` +
      `<p>Eye Color: ${person.eyeColor}</p>` +
      `<p>Hair Color: ${person.hairColor}</p>` +
      `<p>Mass: ${person.mass}</p>` +
      `<p>Homeworld: ${person.homeworld}</p>` +
      `<p>Number of vehicles: ${person.vehicles.length ?? 0}</p>` +
      `<p>Number of starships: ${person.starships.length ?? 0}</p>`;
    parent.replaceChildren(detail);
  }

  startLoading(container) {
    container.classList.add('spinner');
  }

  stopLoading(container) {
    container.classList.remove('spinner');
  }
}
