import alt from '../alt';

const actions = alt.createActions(class ModalActions {

  constructor() {
    this.generateActions(
      'open',
      'close'
    );
  }
});

export default actions;
