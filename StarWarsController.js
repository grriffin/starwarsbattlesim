import StarWars from './models/StarWars.js';
import { BattleHistory, PeopleCache, PeopleDetailCache } from './repository.js';
import PeopleView from './views/PeopleView.js';
import TeamView from './views/TeamView.js';
import Team from './models/Team.js';

export default class StarWarsController {
  constructor(
    peopleParent,
    peopleDetailParent,
    teamParent,
    startBattleSection
  ) {
    this.peopleParent = peopleParent;
    this.peopleDetailParent = peopleDetailParent;
    this.currentTeamParent = teamParent;
    this.startBattleSection = startBattleSection;
    this.peopleCache = new PeopleCache();
    this.peopleDetailCache = new PeopleDetailCache();
    this.battleCache = new BattleHistory();
    this.peopleParentElement = null;
    this.peopleDetailElement = null;
    this.teamElement = null;
    this.startBattleSectionElement = null;
    this.startBattleButton = null;

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.currentTeam = new Team();
    this.starWarsApi = new StarWars();
    this.peopleView = new PeopleView();
    this.teamView = new TeamView();
  }
  async init() {
    this.peopleParentElement = document.querySelector(this.peopleParent);
    this.peopleDetailElement = document.querySelector(this.peopleDetailParent);
    this.teamElement = document.querySelector(this.currentTeamParent);
    this.startBattleSectionElement = document.querySelector(
      this.startBattleSection
    );
    this.startBattleButton = document.querySelector(
      this.startBattleSection + ' button'
    );
    if (this.startBattleButton) {
      this.startBattleButton.addEventListener('click', async (event) => {
        this.startBattle();
      });
    }
    await this.getPeopleSummaries();
  }

  async startBattle() {
    console.log('Battle Score: ' + this.currentTeam.score());
  }

  async getPeopleSummaries() {
    // I'm not sure I love this, but I didn't love any of it.
    // we are calling render, passing it a "loader" so that it
    // can clear children, start a loading animation, etc. while
    // the API is returning data, because it's a pretty slow API
    // and very noticeable delays. Too many nested calls though.
    // Since those items are view related, I thought it was best
    // to have the view manage all those details, rather than the
    // controller.
    this.peopleView.renderPeopleSummaries(
      this.peopleParentElement,

      async () => {
        let summaries = this.peopleCache.load();

        if (!summaries) {
          summaries = await this.starWarsApi.getPeople();
          this.peopleCache.save(summaries);
        }
        return summaries;
      },

      async (clickedPersonSummary) => {
        await this.getPersonDetail(clickedPersonSummary);
      }
    );
  }

  async getPersonDetail(personSummary) {
    await this.peopleView.renderPersonDetail(
      this.peopleDetailElement,
      async () => {
        const url = personSummary.url;
        let person = this.peopleDetailCache.load(url);
        if (person) {
          return person;
        }

        person = await this.starWarsApi.getPerson(url);
        this.peopleDetailCache.save(url, person);
        return person;
      },
      async (person) => {
        this.addToTeam(person);
      }
    );
  }

  async addToTeam(person) {
    this.currentTeam.addPerson(person);
    this.updateTeam();
  }

  async removeFromTeam(person) {
    this.currentTeam.removePerson(person);
    this.updateTeam();
  }

  async updateTeam() {
    if (this.currentTeam.readyForBattle()) {
      this.startBattleSectionElement.classList.remove('hidden');
    } else {
      if (!this.startBattleSectionElement.classList.contains('hidden')) {
        this.startBattleSectionElement.classList.add('hidden');
      }
    }
    this.teamView.renderCurrentTeam(
      this.teamElement,
      this.currentTeam,
      (person) => {
        this.removeFromTeam(person);
      }
    );
  }
}
