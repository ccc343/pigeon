import React from 'react';
import Link from './Link';

class Header extends React.Component {

  render() {
    return (
      <header className="row">
        <Link to="/">
          <div className="span6">
            <img src="/logo.png" alt="logo" id="logo" />
            <h1 className="text-red" ><b>Pigeon</b></h1>
          </div>
        </Link>
      </header>
    );
  }
}

export default Header;
