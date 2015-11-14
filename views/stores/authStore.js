import alt from '../alt';
import actions from '../actions/authActions';

class AuthStore {

  constructor() {
    this.bindActions(actions);

    this.currentUser = null;
    this.currentOrganization = null;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  setCurrentOrganization(org) {
    this.currentOrganization = org;
  }

}

export default alt.createStore(AuthStore);
