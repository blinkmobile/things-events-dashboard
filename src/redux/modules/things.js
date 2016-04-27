import { Map, fromJS } from 'immutable';

export const THING_RECEIVED = 'THING_RECEIVED';
export const thingReceived = (thing) => ({
  payload: thing,
  type: THING_RECEIVED
});

const ACTION_HANDLERS = {
  [THING_RECEIVED]: (state, { payload }) => {
    if (payload.id) {
      return state.set(payload.id, fromJS(payload));
    }
    return state; // payload is invalid, drop it
  }
};

const initialState = new Map();
export const thingsReducer = (state = initialState, action) => {
  const actionHandler = ACTION_HANDLERS[action.type];
  return actionHandler ? actionHandler(state, action) : state;
};

export const getThings = (state) => state.get('things') || initialState;
