import alt from '../alt';
import actions from '../actions/userActions';

class UserStore {

  constructor() {
    this.bindActions(actions);

    this.currentUser = {
      name: null,
      email: null,
      domain: null
    }

    // TODO: replace with ajax request for user's tags
    this.tags = ['whitman', 'classof2017', 'innovation'];
  }

  signIn(user) {
    Object.assign(this.currentUser, user);
  }

  signOut() {
    this.currentUser = {
      name: null,
      email: null,
      domain: null
    }
  }

}

export default alt.createStore(UserStore);
