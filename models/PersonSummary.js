
export default class PersonSummary {

  constructor(name, url) {
    this._name = name;
    this._url = url;
  }

  get name() {
    return this._name
  }

  get url() {
    return this._url;
  }
}
