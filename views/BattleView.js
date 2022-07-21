export default class BattleView {
  renderBattle(battleElement, battleLoader) {
    const battles = battleLoader();
    battleElement.replaceChildren();

    if (!battles) {
      const emptyCard = document.createElement('div');
      emptyCard.innerText = 'There are no battles to display';
      battleElement.appendChild(emptyCard);
      return;
    }

    for (const battle of battles) {
      const battleCard = document.createElement('div');
      battleCard.classList.add('battle-card');
      const battleHeader = document.createElement('div');
      battleHeader.classList.add('battle-header');
      battleHeader.innerHTML = `<span class="title">Battle on ${battle.date.toLocaleDateString(
        'en-us',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      )}</span><div class="score-card"><span class="score-title">Score:</span><span class="score">${battle.score()}</span></div>`;
      battleCard.appendChild(battleHeader);

      // render team
      const team = battle.team;
      if (!team || !team.teamMembers || team.teamMembers.length == 0) {
        const noMembers = document.createElement('p');
        noMembers.innerText = 'No Team Members Added';
        battleCard.appendChild(noMembers);
        battleElement.appendChild(battle);
        continue;
      }
      const teamHeader = document.createElement('h4');
      teamHeader.classList.add('team-header');
      teamHeader.innerText = 'Team ' + team.name;
      battleCard.appendChild(teamHeader);
      const details = document.createElement('div');
      details.classList.add('fighters');

      for (const person of team.teamMembers) {
        const detail = document.createElement('div');
        detail.classList.add('fighter-card');

        detail.innerHTML =
          `<p>Name: ${person.name}</p>` +
          `<p>Effectiveness Score: ${
            (person.mass ?? 1) * (person.vehicles?.length ?? 0)
          }</p>`;
        details.appendChild(detail);
      }
      battleCard.appendChild(details);
      battleElement.appendChild(battleCard);
    }
  }
}
