import initialState from '../core/initialState';
import { ADD_GET_STARTED_COUNT } from '../core/actionTypes';

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GET_STARTED_COUNT:
      return { ...state, getStartedCount: state.getStartedCount + 1 };
    default: return state;
  }
};

export default countReducer;
