import React from 'react';
import actions from '../actions/userActions';

class Header extends React.Component {

  render() {
    const headerLinks = this.props.user ? (
        <a className="link" onClick={actions.logout}>
          Logout
        </a>
      ) : (
        <div>
          <a onClick={this.props.onClickCreateOrg}>
            Register your organization
          </a>
          <a onClick={this.props.onClickLogin}>
            Login
          </a>
          <a onClick={this.props.onClickSignUp}>
            Sign up
          </a>
        </div>
      );

    return (
      <header className="row">
        <div className="span6" id="logo">
          <img src="/logo.png" alt="logo" />
          <h1 className="text-red"><b>Pigeon</b></h1>
        </div>

        <div className="span6 text-right">
          {headerLinks}
        </div>
      </header>
    );
  }
}

export default Header;
