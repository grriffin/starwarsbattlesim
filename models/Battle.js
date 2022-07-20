export default class Battle {
  constructor(team) {
    this.team = team;
  }

  won() {
    this.team.score() > 5;
  }
}
