import React from 'react';
import cx from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import userActions from '../actions/userActions';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';

class TagDetails extends React.Component {

  static getStores() {
    return [uiStore];
  }

  static getPropsFromStores() {
    return {
      tag: uiStore.getState().tagDetails
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.target.className === 'modal') {
      uiActions.hideTag();
    }
  }

  subscribe() {
    userActions.subscribe(this.props.tag.id, (err) => {
      this.setState({ error: err });
      if (!err) {
        uiActions.hideTag();
      }
    });
  }

  unsubscribe() {
    userActions.unsubscribe(this.props.tag.id, (err) => {
      this.setState({ error: err });
      if (!err) {
        uiActions.hideTag();
      }
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.tag) {
        uiActions.hideTag();
      }
    });
  }

  render() {
    let header, body1, body2, footer;

    if (this.props.tag) {
      header = <h2>#{this.props.tag.name}</h2>;

      body1 = (
        <span className="text-grey statistic">
          <i className="ion-person" />
          <b>{this.props.tag.users.length}</b>
        </span>
      );

      body2 = <p className="space-2">{this.props.tag.description}</p>;

      footer = this.props.tag.subscribed ? (
        <div className="btn" onClick={this.unsubscribe}>
          Unsubscribe
        </div>) : (
        <div className="btn btn-primary" onClick={this.subscribe}>
          Subscribe
        </div>
      );
    }

    return (
      <div
        className={cx('modal', { hidden: !this.props.tag })}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      >
        <div className="modal-dialog">
          <div className="modal-header">
            {header}

            <div className="btn-close text-center">
              <a onClick={uiActions.hideTag}>
                <i className="ion-close-round" />
              </a>
              <br />
              <small className="desktop-visible text-grey">esc</small>
            </div>
          </div>

          <div className="modal-body">
            {body1}
            {body2}
          </div>

          <div className="modal-footer">
            <p className="text-red">{this.state.error}</p>

            {footer}
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(TagDetails);
