import React from 'react';
import {render} from 'react-dom';

import Router from './Router';

render(React.createElement(Router, {path: path}),
  document.getElementById('react-root')
);
