import alt from '../alt';
import actions from '../actions/uiActions';

class UIStore {

  constructor() {
    this.bindActions(actions);

    this.modalVisible = false;
    this.tagDetails = null;
    this.searchResults = null;
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
}

export default alt.createStore(UIStore);
