import alt from '../alt';
import actions from '../actions/userActions';

class UserStore {

  constructor() {
    this.bindActions(actions);

    this.user = null;
    this.tags = {};
  }

  setCurrentUser(user) {
    this.user = {
      email: user.email,
      organization: user.organization,
    };

    this.tags = {};
    user.organization.tags.forEach(tag => this.handleNewTag(tag));

    user.tags.forEach(tag => {
      tags[tag.id].subscribed = true;
    });
  }

  handleSubscribe(tagId) {
    this.tags[tagId].subscribed = true;
  }

  handleUnsubscribe(tagId) {
    this.tags[tagId].subscribed = false;
  }

  handleNewTag(tag) {
    this.tags[tag.id] = {
      id: tag.id,
      name: tag.name,
      description: tag.description
    };
  }
}

export default alt.createStore(UserStore);
