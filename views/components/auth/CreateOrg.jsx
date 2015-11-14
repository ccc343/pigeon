import React from 'react';
import ReactDOM from 'react-dom';

import authActions from '../../actions/authActions';

class CreateOrg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const domain = ReactDOM.findDOMNode(this.refs.domain);
    const name = ReactDOM.findDOMNode(this.refs.name);
    const description = ReactDOM.findDOMNode(this.refs.description);

    if (this.validate(domain, name)) {
      authActions.createOrg(domain.value, name.value, description.value,
        (err) => {
          if (err) {
            domain.focus();
          }
          this.setState({ error: err });
        });
    }
  }

  validate(domain, name) {
    if (!domain.value) {
      this.setState({ error: 'Please enter a domain.' });
      domain.focus();
      return false;
    }

    if (!name.value) {
      this.setState({ error: 'Please name your organization.' });
      name.focus();
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="row">
        <div className="span4 offset4">
          <p className="text-red">{this.state.error}</p>
          <label>Domain</label>
          <input
            className="space-2 material-caret"
            name="domain"
            ref="domain"
            type="text"
            placeholder="princeton.edu"
            autoFocus
          />

          <label>Name</label>
          <input
            className="space-2 material-caret"
            name="name"
            ref="name"
            type="text"
            placeholder="Princeton University"
          />

          <label>Description</label>
          <textarea
            className="space-2 material-caret"
            name="description"
            ref="description"
            rows="1"
            placeholder="A land of great privilege."
          />

          <div className="btn btn-primary" onClick={this.submit}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrg;
