import alt from '../alt';
import actions from '../actions/uiActions';

class UIStore {

  constructor() {
    this.bindActions(actions);

    this.modalVisible = false;
    this.tagDetails = null;
    this.searchResults = null;
    this.loginError = '';
    this.newUser = false;
  }

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  showTag(tag) {
    this.tagDetails = tag;
  }

  hideTag() {
    this.tagDetails = null;
  }

  setSearchResults(results) {
    this.searchResults = results;
  }

  setLoginError(err) {
    this.loginError = err;
  }

  newUser() {
    this.newUser = true;
  }
}

export default alt.createStore(UIStore);
