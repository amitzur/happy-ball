import { createStore, applyMiddleware } from "redux";
import isMaster from "./is-master";
import Reflect from "./reflect";
import reducers from "./reducers";

const initialState = { left: 100, top: 100, size: 40, scale: 1, tracking: true };

function reducer(state, action) {
    if (typeof state === "undefined") {
        return initialState;
    }

    if (reducers[action.type]) {
        return Object.assign({}, state, reducers[action.type](state, action));
    }

    return state;
}


const logger = ({ getState, dispatch }) => next => action => {
    console.log("dispatching", action);
    const ret = next(action);
    console.log("state after dispatch", getState());
    return ret;
};

const reflect = new Reflect("ws://localhost:7000/bus", "nosecret");

const middleware = isMaster ? [logger, reflect.createMiddleware("happy-ball")] : [logger];

const store = createStore(reducer, applyMiddleware(...middleware));

if (!isMaster) {
    reflect.listen("happy-ball", message => {
        const action = JSON.parse(message);
        store.dispatch(action);
    });
}

export default store;