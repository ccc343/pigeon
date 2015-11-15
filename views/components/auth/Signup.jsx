import React from 'react';
import ReactDOM from 'react-dom';

import actions from '../../actions/userActions';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };

    this.login = this.login.bind(this);
  }

  input() {
    return ReactDOM.findDOMNode(this.refs.email);
  }

  login() {
    const input = this.input();
    actions.signup(input.value, (err) => {
      if (err) {
        input.focus();
      }
      this.setState({ error: err });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="span2 offset5">
          <p className="text-red">{this.state.error}</p>
          <label>email</label>
          <input
            className="space-2 material-caret"
            name="email"
            ref="email"
            type="text"
            autoFocus
          />
          <div className="btn btn-primary" onClick={this.login}>Sign Up</div>
        </div>
      </div>
    );
  }
}

export default Signup;
