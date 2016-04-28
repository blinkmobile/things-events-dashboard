import { Map, fromJS } from 'immutable';

export const THING_TYPES = ['assets', 'locations', 'people'];

export const THING_RECEIVED = 'THING_RECEIVED';
export const thingReceived = (thing) => ({
  payload: thing,
  type: THING_RECEIVED
});

export const THING_REMOVED = 'THING_REMOVED';
export const thingRemoved = (thingId) => ({
  payload: thingId,
  type: THING_REMOVED
});

const ACTION_HANDLERS = {
  [THING_RECEIVED]: (state, { payload }) => {
    if (payload.id) {
      return state.set(payload.id, fromJS(payload));
    }
    return state; // payload is invalid, drop it
  },

  [THING_REMOVED]: (state, { payload }) => {
    return state.delete(payload);
  }
};

const initialState = new Map();
export const thingsReducer = (state = initialState, action) => {
  const actionHandler = ACTION_HANDLERS[action.type];
  return actionHandler ? actionHandler(state, action) : state;
};

export const getThings = (state) => state.get('things') || initialState;
