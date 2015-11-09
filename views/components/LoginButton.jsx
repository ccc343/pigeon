import React from 'react';

import userActions from '../actions/userActions';

class LoginButton extends React.Component {

  onSuccess(googleUser) {
    const user = googleUser.getBasicProfile();
    const email = user.getEmail();

    userActions.signIn({
      name: user.getName(),
      email: email,
      domain: email.split('@')[1]
    });

    // Make an ajax request to get the bootstrap data
  }

  componentDidMount() {
    gapi.signin2.render('login-btn', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      width: 220,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess
    });
  }

  render() {
    return <div id="login-btn" />
  }
}

export default LoginButton;
