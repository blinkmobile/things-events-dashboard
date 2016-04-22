import createBrowserHistory from 'history/lib/createBrowserHistory';
import { fromJS } from 'immutable';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import makeRoutes from '../routes/index.js';
import configureStore from './configureStore.js';
import { selectLocationState } from './modules/router.js';

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = fromJS(window.__INITIAL_STATE__ || {});
export const store = configureStore(initialState, browserHistory);
export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
export const routes = makeRoutes(store);
