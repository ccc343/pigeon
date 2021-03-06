import alt from '../alt';

const actions = alt.createActions(class UIActions {

  constructor() {
    this.generateActions(
      'openModal',
      'closeModal',
      'showTag',
      'hideTag',
      'setLoginError',
      'openNewUser',
      'closeNewUser'
    );
  }
});

export default actions;
