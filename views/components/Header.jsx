import React from 'react';
import Link from './Link';
import LogoutButton from './LogoutButton';

class Header extends React.Component {

  render() {
    const headerLinks = this.props.loggedIn ? (
      <LogoutButton />
    ) : null;

    return (
      <header className="row">
        <div className="span6" id="logo">
          <Link to="/">
            <img src="/logo.png" alt="logo" />
            <h1 className="text-red"><b>Pigeon</b></h1>
          </Link>
        </div>

        <div className="span2 offset4 text-center">
          {headerLinks}
        </div>
      </header>
    );
  }
}

export default Header;
