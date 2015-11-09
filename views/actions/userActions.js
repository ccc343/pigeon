import alt from '../alt';

class UserActions {

  constructor() {
    this.generateActions(
      'signIn',
      'signOut',
      'subscribe',
      'unsubscribe'
    );
  }
}

export default alt.createActions(UserActions);
