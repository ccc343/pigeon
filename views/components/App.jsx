import React from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import Tags from './Tags';
import Login from './Login';

import connectToStores from 'alt/utils/connectToStores';
import store from '../stores/userStore';

class App extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        {this.props.user ? <Tags /> : <Login />}
      </div>
    );
  }
}

export default connectToStores(App);
