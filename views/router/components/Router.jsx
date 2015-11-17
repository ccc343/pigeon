import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {renderPath} from '../routeUtils';
import store from '../stores/routeStore';

class Router extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  render() {
    return renderPath(this.props.routes, this.props.path);
  }
}

Router.propTypes = {
  path: React.PropTypes.string.isRequired,
  routes: React.PropTypes.object.isRequired
};

export default connectToStores(Router);
