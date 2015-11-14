import React from 'react';
import ReactDOM from 'react-dom';

import authActions from '../../actions/authActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const email = ReactDOM.findDOMNode(this.refs.email);
    if (this.validate(email)) {
      authActions.login(email.value, (err) => {
        email.focus();
        this.setState({ error: err });
      });
    }
  }

  validate(email) {
    if (!email.value) {
      this.setState({ error: 'Please enter an email.' });
      email.focus();
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="row">
        <div className="span2 offset5">
          <p className="text-red">{this.state.error}</p>
          <label>Email</label>
          <input
            className="space-2 material-caret"
            name="email"
            ref="email"
            type="text"
            autoFocus
          />
          <div className="btn btn-primary" onClick={this.submit}>Sign In</div>
        </div>
      </div>
    );
  }
}

export default Login;
