import routeActions from './actions/routeActions';
import routeStore from './stores/routeStore';
import Link from './components/Link';
import Router from './components/Router';

window.onpopstate = function(e) {
  routeActions.go(window.location.pathname);
};

function go(path, callback) {
  routeActions.go(path);
  if (callback) callback();
}

function getPath() {
  return routeStore.getState().path;
}

export {go, getPath, Link, Router};
