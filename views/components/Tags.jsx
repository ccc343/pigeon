import React from 'react';
import Modal from './Modal';
import Tag from './Tag';
import TagDetails from './TagDetails';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';
import modalActions from '../actions/modalActions';

class Tags extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  constructor(props) {
    super(props);
    this.state = { tagDetails: null };

    this.hideTag = this.hideTag.bind(this);
    this.showTag = this.showTag.bind(this);
  }

  hideTag() {
    this.setState({ tagDetails: null });
  }

  showTag(tag) {
    this.setState({ tagDetails: tag });
  }

  render() {
    const tags = this.props.tags;
    const details = this.state.tagDetails ? (
      <TagDetails tag={this.state.tagDetails} hide={this.hideTag} />
    ) : null;

    return (
      <div>
        {details}

        <ul>
          {Object.keys(tags).map((id) => {
            return <Tag key={id} tag={tags[id]} show={this.showTag} />;
          })}
        </ul>

        <a className="btn-floating bg-red" onClick={modalActions.open}>
          <i className="ion-plus-round" />
        </a>

        <Modal />
      </div>
    );
  }
}

export default connectToStores(Tags);
