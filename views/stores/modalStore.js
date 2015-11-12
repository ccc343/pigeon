import alt from '../alt';
import actions from '../actions/modalActions';

class ModalStore {

  constructor() {
    this.bindActions(actions);

    this.visible = false;
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

export default alt.createStore(ModalStore);
