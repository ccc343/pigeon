import React from 'react';

import Header from './Header';
import SubHeader from './SubHeader';
import LoginButton from './LoginButton';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

class App extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    const loggedIn = !!this.props.currentUser.email;

    const landingPage = (
      <div>
        <h1 className="text-center">no more listservs.</h1>

        <div className="row space-2">
          <div className="span6 offset3">
            <h2 className="text-center">
              <span className="text-red">Pigeon</span> helps you send & receive the emails you want with a simple Chrome extension.
            </h2>
          </div>
        </div>

        <div className="row text-center">
          <LoginButton />
        </div>
      </div>
    );

    const homePage = (
      <div>
        <SubHeader />
        {this.props.children}
      </div>
    );

    return (
      <div>
        <Header loggedIn={loggedIn} />
        {loggedIn ? homePage : landingPage}
      </div>
    );
  }
}

export default connectToStores(App);
