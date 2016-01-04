import alt from '../alt';

class TagsActions {

  constructor() {
    this.generateActions(
      'showAllTags',
      'initTags',
      'setTagsToShow',
      'addTag',
      'updateTag',
      'setSort',
      'setFilter',
      'enableSortByRelevance',
      'disableSortByRelevance'
    );
  }
}

export default alt.createActions(TagsActions);
