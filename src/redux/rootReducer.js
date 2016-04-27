import { combineReducers } from 'redux-immutable';

import counter from './modules/counter';
import { eventsReducer as events } from './modules/events.js';
import { routerReducer as router } from './modules/router.js';
import { tagsReducer as tags } from './modules/tags.js';
import { thingsReducer as things } from './modules/things.js';

export default combineReducers({
  counter,
  events,
  router,
  tags,
  things
});
