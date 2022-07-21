import TeamController from './TeamController.js';

window.onload = async (event) => {
  const controller = new TeamController(
    '#people-list',
    '#person-detail',
    '#team-container',
    '#start-battle-section'
  );
  await controller.init();
};
