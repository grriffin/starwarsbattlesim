export default class TeamView {
  renderCurrentTeam(teamElement, team, onRemoveClick) {
    if (!team || !team.teamMembers || team.teamMembers.length == 0) {
      const noMembers = document.createElement('p');
      noMembers.innerText = 'No Team Members Added';
      teamElement.replaceChildren(noMembers);
      return;
    }
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'team-name';
    nameInput.value = team.name;
    nameInput.required = true;
    nameInput.minLength = 3;
    nameInput.placeholder = 'Please enter a team name';

    const details = document.createElement('div');
    details.classList.add('person-card-container');
    for (const person of team.teamMembers) {
      const detail = document.createElement('div');
      detail.classList.add('person-card');
      detail.innerHTML =
        `<p>Name: ${person.name}</p>` +
        `<p>Species: ${person.species}</p>` +
        `<p>Eye Color: ${person.eyeColor}</p>` +
        `<p>Hair Color: ${person.hairColor}</p>` +
        `<p>Mass: ${person.mass}</p>` +
        `<p>Homeworld: ${person.homeworld}</p>` +
        `<p>Number of vehicles: ${person.vehicles?.length ?? 0}</p>` +
        `<p>Number of starships: ${person.starships?.length ?? 0}</p>`;
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', (event) => onRemoveClick(person));
      detail.appendChild(removeButton);
      details.appendChild(detail);
    }

    teamElement.replaceChildren(nameInput, details);
    return nameInput;
  }
}
