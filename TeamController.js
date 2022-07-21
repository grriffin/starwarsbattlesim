import StarWars from './models/StarWars.js';
import { BattleHistory, PeopleCache, PeopleDetailCache } from './repository.js';
import PeopleView from './views/PeopleView.js';
import TeamView from './views/TeamView.js';
import Team from './models/Team.js';
import Battle from './models/Battle.js';

export default class TeamController {
  constructor(
    peopleParent,
    peopleDetailParent,
    teamParent,
    startBattleSection,
    errorParent
  ) {
    this.peopleParent = peopleParent;
    this.peopleDetailParent = peopleDetailParent;
    this.currentTeamParent = teamParent;
    this.startBattleSection = startBattleSection;
    this.errorParent = errorParent;
    this.peopleCache = new PeopleCache();
    this.peopleDetailCache = new PeopleDetailCache();
    this.battleCache = new BattleHistory();
    this.peopleParentElement = null;
    this.peopleDetailElement = null;
    this.teamElement = null;
    this.startBattleSectionElement = null;
    this.startBattleButton = null;
    this.errorElement = null;

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
    this.errorElement = document.querySelector(this.errorParent);
    const existingTeam = this.battleCache.loadCurrentTeam();
    if (existingTeam) {
      this.currentTeam = existingTeam;
      this.updateTeam();
    }
    await this.getPeopleSummaries();
  }

  async startBattle() {
    // Validate again anyway just in case they turn off browser validations
    if (!this.teamNameInput) {
      console.log("Why isn't there a team name input?");
      this.errorElement.innerText = 'A team name is required';
    }

    if (this.teamNameInput.checkValidity() === false) {
      this.teamNameInput.focus();
      this.teamNameInput.reportValidity();
      return;
    }

    if (!this.teamNameInput || !this.teamNameInput.value) {
      this.errorElement.innerText = 'A team name is required';
    }

    const name = this.teamNameInput.value;
    if (name.length < 3) {
      this.errorElement.innerText =
        'Team names are required to be at least 3 characters long.';
    }
    this.currentTeam.name = name;
    console.log('Battle Score: ' + this.currentTeam.score());
    this.battleCache.save(new Battle(this.currentTeam));
    this.currentTeam = null;
    this.battleCache.saveCurrentTeam(null);
    window.location.href = './battles.html';
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

        if (this.currentTeam && this.currentTeam.teamMembers.length > 0) {
          return summaries.filter(
            (f) => !this.currentTeam.teamMembers.some((t) => t.name == f.name)
          );
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
        if (url.length == 0) {
          return null;
        }
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
        this.peopleDetailElement.replaceChildren();
      }
    );
  }
  async updateTeamName(name) {}
  async addToTeam(person) {
    this.currentTeam.addPerson(person);
    this.getPeopleSummaries();
    this.updateTeam();
  }

  async removeFromTeam(person) {
    this.currentTeam.removePerson(person);
    this.getPeopleSummaries();
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

    if (this.teamNameInput) {
      this.currentTeam.name = this.teamNameInput.value;
    }

    this.teamNameInput = this.teamView.renderCurrentTeam(
      this.teamElement,
      this.currentTeam,
      (person) => {
        this.removeFromTeam(person);
      }
    );

    if (this.teamNameInput) {
      this.currentTeam.name = this.teamNameInput.value;
    }
    this.battleCache.saveCurrentTeam(this.currentTeam);
  }
}
