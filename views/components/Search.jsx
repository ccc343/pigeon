import React from 'react';
import AutocompleteTextField from './AutocompleteTextField';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import tagsStore from '../stores/tagsStore';
import tagsActions from '../actions/tagsActions';

class Search extends React.Component {

  static getStores() {
    return [tagsStore];
  }

  static getPropsFromStores() {
    return {
      tags: tagsStore.getState().tags
    };
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onChange(results) {
    const getTagId = name => {
      let tagId = -1;
      Object.keys(this.props.tags).forEach(id => {
        if (this.props.tags[id].name === name) {
          tagId = id;
          return;
        }
      });
      return tagId;
    }

    tagsActions.setTagsToShow(results.map(x => getTagId(x)));
    tagsActions.enableSortByRelevance();
    tagsActions.setSort('Relevance');
  }

  onClear() {
    tagsActions.showAllTags();
    tagsActions.setSort('Newest');
    tagsActions.disableSortByRelevance();
  }

  render() {
    const allTags = this.props.tags;

    return (
      <div className="text-light-grey">
        <i className="ion-search text-grey" />
        <AutocompleteTextField
          className="bg-light-grey"
          dictionary={ Object.keys(allTags).map(id => allTags[id].name) }
          placeholder="search all tags..."
          onClear={this.onClear}
          onChange = {this.onChange}
        />
      </div>
    );
  }
}

export default connectToStores(Search);
