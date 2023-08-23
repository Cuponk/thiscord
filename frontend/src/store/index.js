import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serverReducer from './server';
import channelReducer from './channel';

export const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serverReducer,
  channels: channelReducer
});

// let enhancer;

// if (process.env.NODE_ENV === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require('redux-logger').default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }


const configureStore = (preloadedstate) => {
    return legacy_createStore(rootReducer, preloadedstate, applyMiddleware(thunk));
};
export default configureStore;