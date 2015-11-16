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

  updateTag(updated) {
    Object.assign(this.tags[updated.id], updated);
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
