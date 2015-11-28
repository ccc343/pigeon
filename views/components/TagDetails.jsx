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

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
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

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        uiActions.hideTag();
      }
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
      <div className="tag-details">
        <div className="btn-close text-center">
          <a onClick={uiActions.hideTag}>
            <i className="ion-close-round" />
          </a>
          <br />
          <small className="text-grey">esc</small>
        </div>

        <div className="content">
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

          {btn}
        </div>
      </div>
    );
  }
}

export default TagDetails;
