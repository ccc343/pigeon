import React from 'react';
import ReactDOM from 'react-dom';
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
    return (
        <div className="text-light-grey">
          <i className="ion-search text-white" />
          <AutocompleteTextField
            className="bg-dark-grey"
            dictionary={this.props.tags}
            placeholder="search tags and members..."
          />
        </div>
    );
  }
}

export default connectToStores(Search);
