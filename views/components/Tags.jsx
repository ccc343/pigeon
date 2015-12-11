import React from 'react';
import Modal from './Modal';
import Welcome from './Welcome';
import Tag from './Tag';
import TagDetails from './TagDetails';
import Organization from './Organization';
import Dropdown from './Dropdown';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';

import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

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
    const tagsList = !details ? (
      <ul>
        {Object.keys(tags).map(id => <Tag key={id} tag={tags[id]} />)}
      </ul>
    ) : null;

    return (
      <div className="row">
        <div className="span3">
          <Organization />
        </div>

        <div className="span9" id="tags-wrapper">
          {/*<Dropdown label="Sort by" options={["Newest", "Popularity", "A-Z"]} />*/}
          <VelocityTransitionGroup
            enter={{
              animation: 'fadeIn',
              duration: 200
            }}
            leave={{
              animation: 'fadeOut',
              duration: 200
            }}
          >
            {tagsList}
          </VelocityTransitionGroup>

          <VelocityTransitionGroup
            enter={{
              animation: 'fadeIn',
              duration: 200
            }}
            leave={{
              animation: 'fadeOut',
              duration: 200
            }}
          >
            {tagDetails}
          </VelocityTransitionGroup>
        </div>

        <a className="btn-floating bg-red" onClick={uiActions.openModal}>
          <i className="ion-plus-round" />
        </a>

        <Modal />
        <Welcome />
      </div>
    );
  }
}

export default connectToStores(Tags);
