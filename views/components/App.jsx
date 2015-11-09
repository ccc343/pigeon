import React from 'react';

import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

import Home from '../pages/Home';

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
    const loggedIn = !!this.props.currentUser.email;

    return (
      <div>
        <Header loggedIn={loggedIn} />
        <SubHeader />
        {this.props.children || <Home />}
      </div>
    );
  }
}

export default connectToStores(App);
