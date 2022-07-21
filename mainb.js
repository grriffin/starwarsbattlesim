import BattleController from './BattleController.js';

window.onload = async (event) => {
  const controller = new BattleController('#battle-list');
  await controller.init();
};
