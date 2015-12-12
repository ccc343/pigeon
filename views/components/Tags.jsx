import React from 'react';
import CreateTag from './CreateTag';
import Welcome from './Welcome';
import Tag from './Tag';
import TagDetails from './TagDetails';
import Organization from './Organization';
import Dropdown from './Dropdown';

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
    const details = this.props.ui.tagDetails;

    const tagDetails = details ? <TagDetails tag={details} /> : null;

    return (
      <div className="row">
        <div className="span3">
          <Organization />
        </div>

        <div className="span9" id="tags-wrapper">
          {tagDetails ||
          <ul>
            {Object.keys(tags).map(id => <Tag key={id} tag={tags[id]} />)}
          </ul>}
        </div>

        <a className="btn-floating bg-red" onClick={uiActions.openModal}>
          <i className="ion-plus-round" />
        </a>

        <CreateTag />
        <Welcome />
      </div>
    );
  }
}

export default connectToStores(Tags);
