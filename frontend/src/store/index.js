import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import session from './session';

export const rootReducer = combineReducers({
  session
});


const configureStore = (preloadedstate) => {
    return legacy_createStore(rootReducer, preloadedstate, applyMiddleware(thunk));
};
export default configureStore;