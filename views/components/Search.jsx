import React from 'react';
import AutocompleteTextField from './AutocompleteTextField';
import cx from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import uiActions from '../actions/uiActions';

class Search extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return {
      tags: userStore.getState().tags
    };
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onChange(results) {
    const getTagId = (name) => {
      let tagId = -1;
      Object.keys(this.props.tags).forEach(id => {
        if (this.props.tags[id].name === name) {
          tagId = id;
          return;
        }
      });
      return tagId;
    }

    const tags = results.map(x => this.props.tags[getTagId(x)]);

    uiActions.setSearchResults(tags);
  }

  onClear() {
    uiActions.setSearchResults(null);
  }

  render() {
    return (
      <div className="text-light-grey">
        <i className="ion-search text-grey" />
        <AutocompleteTextField
          className="bg-light-grey"
          dictionary={ Object.keys(this.props.tags).map(id => this.props.tags[id].name) }
          placeholder="search all tags..."
          onClear={this.onClear}
          onChange = {this.onChange}
        />
      </div>
    );
  }
}

export default connectToStores(Search);
