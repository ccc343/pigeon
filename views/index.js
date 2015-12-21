import React from 'react';
import {render} from 'react-dom';
import xr from 'xr';

import App from './components/App';

import uiActions from './actions/uiActions';
import userActions from './actions/userActions';
import tagsActions from './actions/tagsActions';

function getQueryStringValue (key) {
  return unescape(window.location.search.replace(
    new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") +
      "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

xr.post('/api/get_user_data')
  .then(function(res) {
    switch (getQueryStringValue("code")) {
      case '0':
        uiActions.setLoginError('Oops! We’re currently only accepting \
          @princeton.edu email addresses. Sorry!');
        break;
      case '1':
        uiActions.openNewUser();
        break;
      default:
        break;
    };

    if (res.user) {
      userActions.setCurrentUser(res.user);
      tagsActions.initTags(res.user);
    }

    render(React.createElement(App), document.getElementById('react-root'));
  });
