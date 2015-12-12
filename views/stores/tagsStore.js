import alt from '../alt';
import actions from '../actions/tagsActions';
import {sorts, filters} from '../utils/sort';

class TagsStore {

  constructor() {
    this.bindActions(actions);

    // An object cache containing tag ground truth.
    this.tags = {};

    // The ids of all tags to display.
    this.tagsToShow = [];

    // Functions to apply to the tags to display.
    this.sort = sorts['Newest'];
    this.filter = filters['None'];
  }

  showAllTags() {
    this.tagsToShow = Object.keys(this.tags);
  }

  // Sets the initial ground truth of the user's tags.
  initTags(user) {
    this.tags = {};
    user.organization.tags.forEach(tag => {
      this.tags[tag.id] = {
        id: tag.id,
        name: tag.name,
        description: tag.description,
        users: tag.users
      };
    });

    user.tags.forEach(tag => {
      this.tags[tag.id].subscribed = true;
    });

    this.showAllTags();
  }

  setTagsToShow(ids) {
    this.tagsToShow = ids;
  }

  addTag(tag) {
    this.tags[tag.id] = {
      id: tag.id,
      name: tag.name,
      description: tag.description,
      users: [] // Assume that new tag has no users.
    };
  }

  updateTag(tag) {
    Object.assign(this.tags[tag.id], tag);
  }

  setSort(type) {
    this.sort = sorts[type];
  }

  setFilter(type) {
    this.filter = filters[type];
  }
}

export default alt.createStore(TagsStore);
