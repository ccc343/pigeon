import React from 'react';

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
    console.log(this.props.tags);

    return (
      <div>
        <ul>
          {this.props.tags.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default connectToStores(Tags);
