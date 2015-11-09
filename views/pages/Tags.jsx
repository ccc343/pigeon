import React from 'react';
import Tag from '../components/Tag';

import connectToStores from 'alt/utils/connectToStores';
import userStore from '../stores/userStore';
import userActions from '../actions/userActions';

class Tags extends React.Component {

  static getStores() {
    return [userStore];
  }

  static getPropsFromStores() {
    return userStore.getState();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.tags.map(item => <Tag key={item} tag={item} />)}
        </ul>
      </div>
    );
  }
}

export default connectToStores(Tags);
