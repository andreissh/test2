import { makeAutoObservable } from "mobx";

class SearchCityStore {
  isCityChangeActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setChangeCity(isCityChangeActive: boolean) {
    this.isCityChangeActive = isCityChangeActive;
  }

  toggleCityChange(status: boolean) {
    this.setChangeCity(status);
  }
}

const searchCityStore = new SearchCityStore();
export default searchCityStore;
