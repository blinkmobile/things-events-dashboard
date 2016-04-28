import { List, fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { TAG_TYPES, getTags } from './tags.js';
import { THING_TYPES, getThings } from './things.js';

export const EVENT_RECEIVED = 'EVENT_RECEIVED';
export const eventReceived = (event) => ({
  payload: event,
  type: EVENT_RECEIVED
});

const ACTION_HANDLERS = {
  [EVENT_RECEIVED]: (state, { payload }) => {
    const newState = state.push(fromJS(payload));
    return newState.size > 20 ? newState.slice(-20) : newState;
  }
};

const initialState = new List();
export const eventsReducer = (state = initialState, action) => {
  const actionHandler = ACTION_HANDLERS[action.type];
  return actionHandler ? actionHandler(state, action) : state;
};

// exchange foreign keys for sub-documents where possible
// dereferenceList (list: List, source: Map) => List
const dereferenceList = (list, source) => list.map((value) => {
  return source.get(value) || value;
});

// exchange any foreign keys for sub-documents
// dereferenceEvent (event: Map, tags: Map, things: Map) => Map
const dereferenceEvent = (event, tags, things) => {
  return event.map((value, key) => {
    if (TAG_TYPES.includes(key)) {
      return dereferenceList(value, tags);
    }
    if (THING_TYPES.includes(key)) {
      return dereferenceList(value, things);
    }
    return value;
  });
};

// getEvents (state: Map) => List
export const getEvents = (state) => state.get('events') || initialState;

// getLatestEvent (state: Map) => Map
export const getLatestEvent = createSelector(
  getEvents,
  (events) => events.last()
);

// getOldestEvent (state: Map) => Map
export const getOldestEvent = createSelector(
  getEvents,
  (events) => events.first()
);

// getDereferencedEvents (state: Map) => Map
export const getDereferencedEvents = createSelector(
  [getEvents, getTags, getThings],
  (events, tags, things) => events.map(
    (event) => dereferenceEvent(event, tags, things)
  )
);
