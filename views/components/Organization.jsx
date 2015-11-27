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
    const org = this.props.user.organization;

    return (
      <div className="sidebar">
        <h1 className="text-red">
          {org.name}
        </h1>
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
