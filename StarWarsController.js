import StarWars from './models/StarWars.js';
import { PeopleCache, PeopleDetailCache } from './repository.js';
import PeopleView from './views/PeopleView.js';

export default class StarWarsController {
  constructor(peopleParent, peopleDetailParent) {
    this.peopleParent = peopleParent;
    this.peopleDetailParent = peopleDetailParent;
    this.peopleCache = new PeopleCache();
    this.peopleDetailCache = new PeopleDetailCache();
    this.peopleParentElement = null;
    this.peopleDetailElement = null;

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.starWarsApi = new StarWars();
    this.peopleView = new PeopleView();
  }
  async init() {
    this.peopleParentElement = document.querySelector(this.peopleParent);
    this.peopleDetailElement = document.querySelector(this.peopleDetailParent);
    await this.getPeopleSummaries();
  }

  async load(container, loader) {
    this.peopleView.startLoading(container);
    try {
      await loader();
    } finally {
      this.peopleView.stopLoading(container);
    }
  }

  async getPeopleSummaries() {
    let summaries = this.peopleCache.load();
    await this.load(this.peopleParentElement, async () => {
      const onPersonClick = async (clickedPersonSummary) => {
        await this.load(this.peopleDetailElement, async () => {
          try {
            const url = clickedPersonSummary.url;
            let clickedPerson = this.peopleDetailCache.load(url);
            console.log('from cache', clickedPerson);
            if (!clickedPerson) {
              clickedPerson = await this.starWarsApi.getPerson(url);
              console.log('from api', clickedPerson);
              this.peopleDetailCache.save(url, clickedPerson);
            }
            this.peopleView.renderPersonDetail(
              clickedPerson,
              this.peopleDetailElement
            );
          } catch (error) {
            console.log(error);
          }
        });
      };

      if (!summaries) {
        summaries = await this.starWarsApi.getPeople();
        this.peopleCache.save(summaries);
      }

      this.peopleView.renderPeopleSummaries(
        summaries,
        this.peopleParentElement,
        onPersonClick
      );
    });
  }
}
