import alt from '../alt';

class UserActions {

  constructor() {
    this.generateActions('signIn', 'signOut');
  }
}

export default alt.createActions(UserActions);
