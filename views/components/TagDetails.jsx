import React from 'react';
import cx from 'classnames';
import userActions from '../actions/userActions';
import uiActions from '../actions/uiActions';

class TagDetails extends React.Component {

  constructor(props) {
    super(props);

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  hide() {
    uiActions.hideTag(this.props.tag.id);
  }

  subscribe() {
    userActions.subscribe(this.props.tag.id);
  }

  unsubscribe() {
    userActions.unsubscribe(this.props.tag.id);
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
      <div className="tag-details bg-light-grey">
        <a className="btn-close" onClick={this.hide}>
          <i className="ion-close-round" />
        </a>

        <h3>#{this.props.tag.name}</h3>

        <span className="text-grey">
          <i className="ion-person" />
          <b>{this.props.tag.users.length}</b>
        </span>

        <p className="space-2">{this.props.tag.description}</p>

        {btn}
      </div>
    );
  }
}

export default TagDetails;
