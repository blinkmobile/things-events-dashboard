import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

let initialState;

initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

// custom immutable-friendly reducer: https://github.com/gajus/redux-immutable
export const routerReducer = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }
  return state;
};

// https://github.com/reactjs/react-router-redux/issues/314#issuecomment-190678756
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('router'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};
export const selectLocationState = createSelectLocationState();
