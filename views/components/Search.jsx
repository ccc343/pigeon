import React from 'react';
import AutocompleteTextField from './AutocompleteTextField';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

class Search extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    console.log(value);
    this.props.onSelect(value);
  }

  render() {
    return (
      <div className="text-light-grey">
        <i className="ion-search text-white" />
        <AutocompleteTextField
          className="bg-dark-grey"
          dictionary={ this.props.user.organization.tags.map(x => x.name) }
          placeholder="search all tags..."
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default connectToStores(Search);
