import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';
import tagsActions from '../actions/tagsActions';
import userActions from '../actions/userActions';
import userStore from '../stores/userStore';

class CreateTag extends React.Component {

  static getStores() {
    return [userStore, uiStore];
  }

  static getPropsFromStores() {
    return {
      user: userStore.getState(),
      visible: uiStore.getState().modalVisible
    };
  }

  constructor(props) {
    super(props);
    this.state = { error: '' };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  onClick(e) {
    if (e.target.className === 'modal') {
      uiActions.closeModal();
    }
  }

  onSubmit() {
    const nameInput = ReactDOM.findDOMNode(this.refs.nameInput);
    const descriptionInput = ReactDOM.findDOMNode(this.refs.descriptionInput);

    if (this.validate(nameInput)) {
      userActions.newTag(nameInput.value, descriptionInput.value, (err, id) => {
        if (err) {
          nameInput.focus();
          return this.setState({ error: err });
        }

        uiActions.closeModal();

        // Clear out input and any validation errors.
        this.setState({ error: '' });
        nameInput.value = '';
        descriptionInput.value = '';
      });
    }
  }

  validate(nameInput) {
    if (!nameInput.value) {
      this.setState({ error: 'Please name your tag.' });
      nameInput.focus();
      return false;
    }

    return true;
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.visible) {
        uiActions.closeModal();
      }
    });
  }

  render() {
    const error = this.state.error ? (
      <div className="text-red space-2">{this.state.error}</div>
    ) : null;

    return (
      <div
        className={cx('modal', { hidden: !this.props.visible })}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      >
        <div className="modal-dialog">
          <div className="modal-header">
            <h2>Create a tag</h2>

            <div className="btn-close text-center">
              <a onClick={uiActions.closeModal}>
                <i className="ion-close-round" />
              </a>
              <br />
              <small className="text-grey">esc</small>
            </div>
          </div>

          <div className="modal-body">
            {error}
            <label>Name</label>
            <input
              className="space-3 material-caret"
              type="text"
              name="tag-name"
              ref="nameInput"
              placeholder="entrepreneurship"
              autoComplete="off"
            />

            <label>Description</label>
            <textarea
              className="space-2 material-caret"
              name="tag-description"
              ref="descriptionInput"
              rows="1"
              placeholder="startups, venture capital, business"
            />
          </div>

          <div className="modal-footer">
            <a className="btn btn-primary" onClick={this.onSubmit}>Create</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(CreateTag);
