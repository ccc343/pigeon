import React from 'react';
import CreateTag from './CreateTag';
import Welcome from './Welcome';
import Tag from './Tag';
import TagDetails from './TagDetails';
import Organization from './Organization';
import Dropdown from './Dropdown';

import connectToStores from 'alt/utils/connectToStores';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';
import tagsActions from '../actions/tagsActions';
import tagsStore from '../stores/tagsStore';

class Tags extends React.Component {

  static getStores() {
    return [tagsStore, uiStore];
  }

  static getPropsFromStores() {
    return {
      tags: tagsStore.getState(),
      ui: uiStore.getState()
    };
  }

  render() {
    const details = this.props.ui.tagDetails;
    const tagDetails = details ? <TagDetails tag={details} /> : null;

    const state = this.props.tags;
    let tags = state.tagsToShow.map(id => state.tags[id]);
    tags = state.sort(state.filter(tags));

    return (
      <div className="row">
        <div className="span3">
          <Organization />
        </div>

        <div className="span9" id="tags-wrapper">
          {tagDetails ||
          <ul>
            {tags.map(t => <Tag key={t.id} tag={t} />)}
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
