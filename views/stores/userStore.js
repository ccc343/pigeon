import alt from '../alt';
import actions from '../actions/userActions';

class UserStore {

  constructor() {
    this.bindActions(actions);

    this.user = null;
    this.tags = {};
  }

  setCurrentUser(user) {
    if (!user) {
      return this.user = user;
    }

    this.user = {
      email: user.email,
      organization: user.organization,
    };

    this.tags = {};
    user.organization.tags.forEach(tag => this.handleNewTag(tag));
    user.tags.forEach(tag => {
      this.tags[tag.id].subscribed = true;
    });
  }

  handleSubscribe(subscribed) {
    const tag = this.tags[subscribed.id];
    tag.subscribed = true;
    tag.users = subscribed.users;
  }

  handleUnsubscribe(unsubscribed) {
    const tag = this.tags[unsubscribed.id];
    tag.subscribed = false;
    tag.users = unsubscribed.users;
  }

  handleNewTag(tag) {
    this.tags[tag.id] = {
      id: tag.id,
      name: tag.name,
      description: tag.description,
      users: tag.users || []
    };
  }
}

export default alt.createStore(UserStore);
