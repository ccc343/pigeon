import React from 'react';
import {getPath, go, Link} from '../router/router';
import actions from '../actions/userActions';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    actions.logout((err) => {
      if (err) {
        console.log(err);
      }

      go('/login');
      actions.setCurrentUser(null);
    });
  }

  render() {
    return (
      <header className="row">
        <div id="logo">
          <Link to={this.props.user ? '/tags' : '/login'}>
            <img src="/logo.png" alt="logo" />
            <h1 className="text-red"><b>Pigeon</b></h1>
          </Link>
        </div>

        {this.props.user ? <a onClick={this.logout}>Logout</a> : null}
      </header>
    );
  }
}

export default Header;
