import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { eventsReducer as events } from './modules/events.js';
import { routerReducer as router } from './modules/router.js';

export default combineReducers({
  counter,
  events,
  router
});
