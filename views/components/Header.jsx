import React from 'react';
import userActions from '../actions/userActions';

class Header extends React.Component {

  render() {
    return (
      <header className="row">
        <div id="logo">
          <img src="/logo.png" alt="logo" />
          <h1 className="text-red"><b>Pigeon</b></h1>
        </div>

        {this.props.user ? <a onClick={userActions.logout}>Logout</a> : null}
      </header>
    );
  }
}

export default Header;
