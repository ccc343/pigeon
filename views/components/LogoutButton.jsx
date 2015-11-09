import React from 'react';

import userActions from '../actions/userActions';

class LogoutButton extends React.Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      userActions.signOut();
    });
  }

  render() {
    return (
      <a className="link" onClick={this.signOut}>
        <i className="ion-log-out" />
        Sign out
      </a>
    );
  }
}

export default LogoutButton;
