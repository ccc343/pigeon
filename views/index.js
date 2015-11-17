import React from 'react';
import {render} from 'react-dom';
import xr from 'xr';
import Router from './router/components/Router';
import {go} from './router/router';
import {routes} from './routes';
import userActions from './actions/userActions';

xr.post('/api/get_user_data')
  .then(function(res) {
    if (res.user) {
      if (window.location.pathname == '/') {
        go('/tags');
      }
      userActions.setCurrentUser(res.user);
    } else if (window.location.pathname == '/') {
      go('/login');
    }

    const router = React.createElement(Router, { routes: routes });
    render(router, document.getElementById('react-root'));
  });
