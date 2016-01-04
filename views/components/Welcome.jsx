import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';
import userActions from '../actions/userActions';
import userStore from '../stores/userStore';

class Welcome extends React.Component {

  static getStores() {
    return [userStore, uiStore];
  }

  static getPropsFromStores() {
    return {
      visible: uiStore.getState().newUser
    };
  }

  constructor(props) {
    super(props);
    this.state = { error: '' };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.target.className === 'modal') {
      uiActions.closeNewUser();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.visible) {
        uiActions.closeNewUser();
      }
    });
  }

  render() {
    return (
      <div
        className={cx('modal', { hidden: !this.props.visible })}
        onClick={this.onClick}
      >
        <div className="modal-dialog">
          <div className="modal-header">
            <h2>welcome!</h2>

            <div className="btn-close text-center">
              <a onClick={uiActions.closeModal}>
                <i className="ion-close-round" />
              </a>
              <br />
              <small className="desktop-visible text-grey">esc</small>
            </div>
          </div>

          <div className="modal-body">
            Here are the tags for <b>Princeton University</b> &mdash; click to subscribe to all of the tags that interest you. That’s it!
          </div>

          <div className="modal-footer">
            <a className="btn btn-primary" onClick={uiActions.closeNewUser}>Ok</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(Welcome);
