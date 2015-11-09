import React from 'react';

import {renderPath} from '../routes/routeUtils';
import routes from '../routes/routes';

import connectToStores from 'alt/utils/connectToStores';
import store from '../stores/routeStore';

class Router extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  render() {
    return renderPath(routes, this.props.path);
  }
}

export default connectToStores(Router);
