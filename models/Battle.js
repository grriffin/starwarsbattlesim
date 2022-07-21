import Team from './Team.js';

export default class Battle {
  constructor(team, date) {
    this.team = team;
    if (!date) date = new Date();
    this._date = date;
  }

  get date() {
    return this._date;
  }

  score() {
    return this.team.score();
  }

  won() {
    return this.team.score() > 5;
  }

  toJSON() {
    return { date: this._date, team: this.team.toJSON() };
  }

  static fromJsonObject(battle) {
    const date = new Date(battle.date);
    const team = Team.fromJsonObject(battle.team);
    return new Battle(team, date);
  }
}
