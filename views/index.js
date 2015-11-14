import React from 'react';
import {render} from 'react-dom';
import xr from 'xr';

import App from './components/App';

import authActions from './actions/authActions';

xr.post('/api/get_user_data')
  .then(function(res) {
    console.log(res);
    if (res.user) {
      authActions.setCurrentUser(res.user);
    }
    render(React.createElement(App), document.getElementById('react-root'));
  });
