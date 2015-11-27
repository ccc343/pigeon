import React from 'react';
import {getPath} from '../router/router';
import connectToStores from 'alt/utils/connectToStores';
import Header from './Header';
import SubHeader from './SubHeader';
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

        {getPath() !== '/login' ? <SubHeader /> : null}

        {this.props.children}
      </div>
    );
  }
}

export default connectToStores(App);
