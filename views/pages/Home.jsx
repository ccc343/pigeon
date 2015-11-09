import React from 'react';
import LoginButton from '../components/LoginButton';

class Home extends React.Component {

  render() {
    return (
      <div className={this.props.className}>
        <h1 className="text-center">no more listservs.</h1>

        <div className="row space-2">
          <div className="span6 offset3">
            <h2 className="text-center">
              <span className="text-red">Pigeon</span> helps you send & receive the emails you want with a simple Chrome extension.
            </h2>
          </div>
        </div>

        <div className="row text-center">
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default Home;
