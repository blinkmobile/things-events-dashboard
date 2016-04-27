import { Map, fromJS } from 'immutable';

export const TAG_RECEIVED = 'TAG_RECEIVED';
export const tagReceived = (tag) => ({
  payload: tag,
  type: TAG_RECEIVED
});

const ACTION_HANDLERS = {
  [TAG_RECEIVED]: (state, { payload }) => {
    if (payload.id) {
      return state.set(payload.id, fromJS(payload));
    }
    return state; // payload is invalid, drop it
  }
};

const initialState = new Map();
export const tagsReducer = (state = initialState, action) => {
  const actionHandler = ACTION_HANDLERS[action.type];
  return actionHandler ? actionHandler(state, action) : state;
};

export const getTags = (state) => state.get('tags') || initialState;
