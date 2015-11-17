import routeActions from './actions/routeActions';
import routeStore from './stores/routeStore';

window.onpopstate = function(e) {
  routeActions.go(window.location.pathname);
};

export function go(path) {
  routeActions.go(path);
}

export function getPath() {
  return routeStore.getState().path;
}
