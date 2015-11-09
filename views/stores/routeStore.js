import alt from '../alt';
import actions from '../actions/routeActions';

class RouteStore {

  constructor() {
    this.bindActions(actions);
    this.path = window.location.pathname;
  }

  go(path) {
    this.path = path;
    history.pushState(null, null, path);
  }
}

export default alt.createStore(RouteStore);
