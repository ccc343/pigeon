import React from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Home from '../pages/Home';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';

class App extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    return (
      <div>
        <Header loggedIn={!!this.props.currentUser} />
        <SubHeader className={cx({hidden: !this.props.currentUser})} />
        {this.props.children || <Home />}
      </div>
    );
  }
}

export default connectToStores(App);
