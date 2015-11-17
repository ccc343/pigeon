import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

class Organization extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    const org = this.props.user.organization;

    return (
      <div>
        <h3>
          {org.name}
        </h3>
        <p>
          {org.description}
        </p>
      </div>
    );
  }
}

export default connectToStores(Organization);
