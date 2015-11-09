import alt from '../alt';
import actions from '../actions/userActions';

import xr from 'xr';

class UserStore {

  constructor() {
    this.bindActions(actions);
    this.currentUser = null;

    // TODO: replace with ajax request for user's tags
    this.tags = ['whitman', 'classof2017', 'innovation'];
  }

  signIn(user) {
    this.currentUser = user;

    // TODO: determine whether this user is registered already
  }

  signOut() {
    this.currentUser = null;
  }

}

export default alt.createStore(UserStore);
