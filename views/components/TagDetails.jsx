import React from 'react';
import cx from 'classnames';
import userActions from '../actions/userActions';
import uiActions from '../actions/uiActions';

class TagDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };

    this.hide = this.hide.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  hide() {
    uiActions.hideTag(this.props.tag.id);
  }

  subscribe() {
    userActions.subscribe(this.props.tag.id, (err) => {
      this.setState({ error: err });
    });
  }

  unsubscribe() {
    userActions.unsubscribe(this.props.tag.id, (err) => {
      this.setState({ error: err });
    });
  }

  render() {
    let btn;
    if (this.props.tag.subscribed) {
      btn = (
        <div className="btn" onClick={this.unsubscribe}>
          Unsubscribe
        </div>
      );
    } else {
      btn = (
        <div className="btn btn-primary" onClick={this.subscribe}>
          Subscribe
        </div>
      );
    }

    return (
      <div className="sidebar">
        <h1 className="text-red">
          #{this.props.tag.name}
        </h1>

        <p>
          <span className="text-grey statistic">
            <i className="ion-person" />
            <b>{this.props.tag.users.length}</b>
          </span>
        </p>

        <p className="space-2">{this.props.tag.description}</p>
        <p className="text-red">{this.state.error}</p>
        <div className="btn btn-back" onClick={this.hide}>
          <i className="ion-arrow-left-c" />
        </div>
        {btn}
      </div>
    );
  }
}

export default TagDetails;
