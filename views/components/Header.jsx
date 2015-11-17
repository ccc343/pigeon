import React from 'react';
import Link from '../router/components/Link';
import {getPath} from '../router/router';
import actions from '../actions/userActions';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.links = {
      logout: <a onClick={actions.logout}>Logout</a>,
      createorg: <Link to="/organization/new"><a>Register your organization</a></Link>,
      login: <Link to="/login"><a>Login</a></Link>
    };
  }

  render() {
    let headerLinks;
    switch (getPath()) {
      case '/login':
        headerLinks = this.links.createorg;
        break;
      case '/organization/new':
        headerLinks = this.links.login;
        break;
      default:
        headerLinks = this.links.logout;
    }

    return (
      <header className="row">
        <div className="span6" id="logo">
          <Link to={this.props.user ? '/tags' : '/login'}>
            <img src="/logo.png" alt="logo" />
            <h1 className="text-red"><b>Pigeon</b></h1>
          </Link>
        </div>

        <div className="span6 text-right">
          {headerLinks}
        </div>
      </header>
    );
  }
}

export default Header;
