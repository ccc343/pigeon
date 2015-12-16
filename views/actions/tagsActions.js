import alt from '../alt';
import {sorts, filters} from '../utils/sort';

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
    );
  }
}

export default alt.createActions(TagsActions);
