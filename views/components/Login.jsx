import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="span4 offset4 text-center">
            <img className="space-2" src="/posh.png" alt=""/>
          </div>
        </div>
        <div className="row">
          <div className="span6 offset3 text-center">
            <h2>Email should be as easy as afternoon tea.</h2>
            <p className="text-red">{this.state.error}</p>
            <a className="btn btn-primary" href="/auth/google">
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
