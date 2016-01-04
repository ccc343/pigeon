import alt from '../alt';
import actions from '../actions/tagsActions';

class TagsStore {

  constructor() {
    this.bindActions(actions);

    // An object cache containing tag ground truth.
    this.tags = {};

    // The ids of all tags to display.
    this.tagsToShow = [];

    // Functions to apply to the tags to display.
    this.sorts = {
      'Newest': tags => tags.sort((a, b) => b.id - a.id),
      'Popularity': tags => tags.sort((a, b) => b.users.length - a.users.length),
      'A-Z': tags => tags.sort((a, b) => a.name < b.name ? -1 : 1)
    };
    this.filters = {
      'None': tags => tags,
      'Subscribed': tags => tags.filter(x => x.subscribed),
      'Not Subscribed': tags => tags.filter(x => !x.subscribed)
    }

    this.sort = this.sorts['Newest'];
    this.filter = this.filters['None'];
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

    this.showAllTags();
  }

  updateTag(tag) {
    Object.assign(this.tags[tag.id], tag);
  }

  enableSortByRelevance() {
    this.sorts['Relevance'] = tags => tags;
  }

  disableSortByRelevance() {
    delete this.sorts['Relevance'];
  }

  setSort(type) {
    this.sort = this.sorts[type];
  }

  setFilter(type) {
    this.filter = this.filters[type];
  }
}

export default alt.createStore(TagsStore);
