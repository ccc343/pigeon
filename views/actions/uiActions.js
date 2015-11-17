import alt from '../alt';

const actions = alt.createActions(class UIActions {

  constructor() {
    this.generateActions(
      'openModal',
      'closeModal'
    );
  }
});

export default actions;
