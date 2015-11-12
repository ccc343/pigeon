import alt from '../alt';
import actions from '../actions/userActions';

class UserStore {

  constructor() {
    this.bindActions(actions);

    this.name = null;
    this.email = null;
    this.organizationId = null;
    this.tags = {};

    this.name = "Julia Wang";
    this.email = "juliahw@princeton.edu";
    this.organizationId = 1;
  }

  setTags(tags) {
    this.tags = tags;
  }

  updateTag(params) {
    Object.assign(this.tags[params.id], params.tag);
  }

  handleSubscribe(tagId) {
    this.tags[tagId].subscribed = true;
  }

  handleUnsubscribe(tagId) {
    this.tags[tagId].subscribed = false;
  }
}

export default alt.createStore(UserStore);
