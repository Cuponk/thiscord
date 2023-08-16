import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serverReducer from './server';

export const rootReducer = combineReducers({
  session: sessionReducer,
  server: serverReducer
});


const configureStore = (preloadedstate) => {
    return legacy_createStore(rootReducer, preloadedstate, applyMiddleware(thunk));
};
export default configureStore;