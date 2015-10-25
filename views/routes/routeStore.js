import alt from './alt';
import actions from './routeActions';

class RouteStore {

  constructor() {
    this.bindActions(actions);

    // The entry point path is detected by the server
    // and placed in a global variable <path>. This is
    // admittedly pretty ugly.
    this.path = ENTRY_PATH;
  }

  go(path) {
    this.path = path;
    history.pushState(null, null, path);
  }
}

export default alt.createStore(RouteStore);
