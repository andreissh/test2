import { makeAutoObservable } from "mobx";

class SearchCityStore {
  isCityChangeActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleCityChange(isCityChangeActive: boolean) {
    this.isCityChangeActive = isCityChangeActive;
  }
}

const searchCityStore = new SearchCityStore();
export default searchCityStore;
