import React from 'react';
import LogoutButton from './LogoutButton';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';

class Header extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    const headerLinks = this.props.email ? (
      <LogoutButton />
    ) : null;

    return (
      <header className="row">
        <div className="span6" id="logo">
          <img src="/logo.png" alt="logo" />
          <h1 className="text-red"><b>Pigeon</b></h1>
        </div>

        <div className="span2 offset4 text-center">
          {headerLinks}
        </div>
      </header>
    );
  }
}

export default connectToStores(Header);
