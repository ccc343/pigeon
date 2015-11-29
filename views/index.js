import React from 'react';
import {render} from 'react-dom';
import xr from 'xr';
import Router from './router/components/Router';
import {go} from './router/router';
import {routes} from './routes';
import uiActions from './actions/uiActions';
import userActions from './actions/userActions';

function getQueryStringValue (key) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

xr.post('/api/get_user_data')
  .then(function(res) {
    switch (getQueryStringValue("code")) {
      case '0':
        uiActions.setLoginError('Oops! We’re currently only accepting @princeton.edu email addresses. Sorry!');
        break;
      case '1':
        uiActions.openNewUser();
        break;
      default:
        break;
    };

    if (res.user) {
      go('/tags');
      userActions.setCurrentUser(res.user);
    } else {
      go('/login');
    }

    const router = React.createElement(Router, { routes: routes });
    render(router, document.getElementById('react-root'));
  });
