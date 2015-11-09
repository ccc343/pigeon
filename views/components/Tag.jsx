import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

class Tag extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    return (
      <div className="tag">
        #{this.props.tag}

        <a className="btn-close">
          <i className="ion-close-round"></i>
        </a>
      </div>
    );
  }
}

export default connectToStores(Tag);
