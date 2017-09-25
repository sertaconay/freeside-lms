import { combineReducers } from 'redux';
import count from './countReducer';


const rootReducer = combineReducers({
  count,
});

export default rootReducer;
