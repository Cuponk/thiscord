import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import serverReducer from "./server";
import channelReducer from "./channel";
import messagesReducer from "./message";
import userReducer from "./user";
import membershipsReducer from "./memberships";

export const rootReducer = combineReducers({
    session: sessionReducer,
    servers: serverReducer,
    channels: channelReducer,
    messages: messagesReducer,
    users: userReducer,
    memberships: membershipsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedstate) => {
    return legacy_createStore(
        rootReducer,
        preloadedstate,
        applyMiddleware(thunk)
    );
};
export default configureStore;
