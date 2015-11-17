import alt from '../alt';
import actions from '../actions/uiActions';

class UIStore {

  constructor() {
    this.bindActions(actions);

    this.modalVisible = false;
  }

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}

export default alt.createStore(UIStore);
