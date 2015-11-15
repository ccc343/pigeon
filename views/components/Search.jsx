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

  render() {
    const tags = this.props.user.organization.tags;

    return (
      <div className="text-light-grey">
        <i className="ion-search text-white" />
        <AutocompleteTextField
          className="bg-dark-grey"
          dictionary={ tags.map(item => item.name) }
          placeholder="search tags and members..."
        />
      </div>
    );
  }
}

export default connectToStores(Search);
