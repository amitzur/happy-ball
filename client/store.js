import { createStore, applyMiddleware } from "redux";
import params from "./params";
import Reflect from "./reflect";
import LiteReflect from "./lite-reflect";
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


const ReflectClass = params.isLite ? LiteReflect : Reflect;
const reflect = new ReflectClass("ws://localhost:7000/bus", "nosecret");

const middleware = params.isMaster ? [reflect.createMiddleware("happy-ball")] : [logger];

const store = createStore(reducer, applyMiddleware(...middleware));

if (!params.isMaster) {
    reflect.listen("happy-ball", action => {
        store.dispatch(action);
    });
}

export default store;