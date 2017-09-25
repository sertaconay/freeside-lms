import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import defaultState from '../core/initialState';

const initStore = (initialState = defaultState) => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default initStore;
