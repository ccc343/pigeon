import React from 'react';
import Modal from './Modal';
import Tag from './Tag';
import TagDetails from './TagDetails';
import Organization from './Organization';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';

class Tags extends React.Component {

  static getStores() {
    return [userStore, uiStore];
  }

  static getPropsFromStores() {
    return {
      ui: uiStore.getState(),
      allTags: userStore.getState().tags
    };
  }

  render() {
    const tags = this.props.ui.searchResults || this.props.allTags;
    const sidebar = this.props.ui.tagDetails ? (
      <TagDetails tag={this.props.ui.tagDetails} />
      ) : <Organization />;

    return (
      <div className="row">
        <div className="span3">
          {sidebar}
        </div>

        <div className="span9">
          <ul>
            {Object.keys(tags).map(id => {
              return <Tag key={id} tag={tags[id]} />;
            })}
          </ul>
        </div>

        <a className="btn-floating bg-red" onClick={uiActions.openModal}>
          <i className="ion-plus-round" />
        </a>

        <Modal />
      </div>
    );
  }
}

export default connectToStores(Tags);
