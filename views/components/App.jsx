import React from 'react';

import Header from './Header';
import SubHeader from './SubHeader';
import Tags from './Tags';

import Login from './auth/Login';
import Signup from './auth/Signup';
import CreateOrg from './auth/CreateOrg';

import connectToStores from 'alt/utils/connectToStores';
import store from '../stores/userStore';

class App extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  constructor(props) {
    super(props);
    this.state = {
      display: <Login />
    };

    this.display = this.display.bind(this);
  }

  display(component) {
    this.setState({
      display: component
    });
  }

  render() {
    return (
      <div>
        <Header
          user={this.props.user}
          onClickSignUp={this.display.bind(this, <Signup />)}
          onClickCreateOrg={this.display.bind(this, <CreateOrg />)}
          onClickLogin={this.display.bind(this, <Login />)}
        />

        {this.props.user ? <SubHeader /> : null}
        {this.props.user ? <Tags /> : this.state.display}
      </div>
    );
  }
}

export default connectToStores(App);
