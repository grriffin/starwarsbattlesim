import { spin, unspin } from '../util.js';
import PersonSummary from '../models/PersonSummary.js';

export default class PeopleView {
  async renderPeopleSummaries(peopleElement, peopleLoader, onPersonClick) {
    spin(peopleElement);
    try {
      const peopleList = await peopleLoader();
      // We will build two select lists, one with a "size",
      // and one without. I hoped that browsers would show
      // the listbox for larger screen sizes and drop down
      // for smaller automatically, but no such luck. Seems
      // like the only way is to create two parallel lists,
      // and let the CSS show them as appropiate with media
      // queries.
      const selectorDropDown = document.createElement('select');
      selectorDropDown.classList.add('dropdown');
      const dummyOption = document.createElement('option');
      dummyOption.value = '';
      dummyOption.innerText = 'Select a figher...';
      selectorDropDown.appendChild(dummyOption);
      const selectorListBox = document.createElement('select');
      selectorListBox.classList.add('listbox');
      selectorListBox.size = 10;

      for (const p of peopleList) {
        const option = document.createElement('option');
        option.value = p.url;
        option.innerText = p.name;
        selectorDropDown.appendChild(option);
        selectorListBox.appendChild(option.cloneNode(true));
      }

      const changeHandler = async (event) => {
        const summary = new PersonSummary(
          event.target.selectedOptions[0].text,
          event.target.value
        );

        event.target.disabled = true;
        try {
          await onPersonClick(summary);
        } finally {
          event.target.disabled = false;
          event.target.focus();
        }
      };

      selectorDropDown.addEventListener('change', changeHandler);

      selectorListBox.addEventListener('change', changeHandler);

      peopleElement.replaceChildren(selectorDropDown, selectorListBox);

      /*
      for (const p of peopleList) {
        const pe = document.createElement('li');
        pe.classList.add('person');
        pe.innerText = p.name;
        pe.addEventListener('click', async () => {
          await onPersonClick(p);
        });
        peopleElement.appendChild(pe);
      }*/
    } finally {
      unspin(peopleElement);
    }
  }

  async renderPersonDetail(parent, personLoader, onAddClick) {
    spin(parent);
    try {
      const person = await personLoader();
      if (person == null) {
        parent.replaceChildren();
        return;
      }
      const detail = document.createElement('div');
      detail.classList.add('person-detail');
      detail.innerHTML =
        `<p>${person.name} Details</p>` +
        `<p>Species: ${person.species}</p>` +
        `<p>Eye Color: ${person.eyeColor}</p>` +
        `<p>Hair Color: ${person.hairColor}</p>` +
        `<p>Mass: ${person.mass}</p>` +
        `<p>Homeworld: ${person.homeworld}</p>` +
        `<p>Number of vehicles: ${person.vehicles?.length ?? 0}</p>` +
        `<p>Number of starships: ${person.starships?.length ?? 0}</p>`;
      const addButton = document.createElement('button');
      addButton.innerText = 'Add To Team';
      addButton.addEventListener('click', (event) => onAddClick(person));
      detail.appendChild(addButton);
      parent.replaceChildren(detail);
    } finally {
      unspin(parent);
    }
  }
}
