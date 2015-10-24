import React from 'react';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.go('/');
  }

  render() {
    return (
      <header className="row">
        <div className="span3 link" onClick={this.onClick}>
          <img src="/logo.png" alt="logo" id="logo" />
          <h1 className="text-red" ><b>Pigeon</b></h1>
        </div>
      </header>
    );
  }
}

export default Header;
