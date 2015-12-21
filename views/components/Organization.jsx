import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';

class Organization extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    const org = this.props.user.organization;

    return (
      <div className="sidebar">
        <h2 className="text-dark-grey space-2">
          {org.name}
        </h2>
        <p>
          <span className="text-grey statistic">
            <i className="ion-person" />
            <b>{org.users.length}</b>
          </span>

          <span className="text-grey statistic">
            <i className="ion-pricetag" />
            <b>{org.tags.length}</b>
          </span>
        </p>
        <p>
          {org.description}
        </p>
      </div>
    );
  }
}

export default connectToStores(Organization);
