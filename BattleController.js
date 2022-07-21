import StarWars from './models/StarWars.js';
import { BattleHistory } from './repository.js';
import BattleView from './views/BattleView.js';

export default class BattleController {
  constructor(battleParent) {
    this.battleParent = battleParent;
    this.starWarsApi = new StarWars();
    this.battleParentElement = null;
    this.battleHistory = new BattleHistory();
    //this.peopleView = new PeopleView();
    this.battleView = new BattleView();
  }
  init() {
    this.battleParentElement = document.querySelector(this.battleParent);
    this.getBattles();
  }

  getBattles() {
    this.battleView.renderBattle(
      this.battleParentElement,

      () => {
        return this.battleHistory.load();
      }
    );
  }
}
