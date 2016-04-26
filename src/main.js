import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';

import { history, routes, store } from './redux/store';
import { syncStoreWithBus } from './lib/bus.js';

syncStoreWithBus(store);

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
