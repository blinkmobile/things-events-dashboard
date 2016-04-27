import { List, fromJS } from 'immutable';
import { createSelector } from 'reselect';

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

export const getEvents = (state) => state.get('events') || initialState;

export const getLatestEvent = createSelector(
  getEvents,
  (events) => events.last()
);

export const getOldestEvent = createSelector(
  getEvents,
  (events) => events.first()
);
