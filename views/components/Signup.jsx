import React from 'react';
import ReactDOM from 'react-dom';
import actions from '../actions/userActions';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const email = ReactDOM.findDOMNode(this.refs.email);
    actions.signup(email.value, (err) => {
      email.focus();
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
          <div className="btn btn-primary" onClick={this.submit}>Sign Up</div>
        </div>
      </div>
    );
  }
}

export default Signup;
