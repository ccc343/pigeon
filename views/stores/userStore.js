import alt from '../alt';
import actions from '../actions/userActions';

class UserStore {

  constructor() {
    this.bindActions(actions);
    this.user = null;
  }

  setCurrentUser(user) {
    if (!user) {
      return this.user = user;
    }

    this.user = {
      email: user.email,
      organization: user.organization,
    };
  }
}

export default alt.createStore(UserStore);
