import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {MODE} from '../config/constants';
import Immutable from "immutable";
import createRootReducer from './rootReducer';
import createSagaMiddleware from "redux-saga";
import {createLogger} from "redux-logger";

import rootSaga from "./rootSaga";

// Debugger for redux
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL || ""
});

function createMiddlewares() {
    const routerMW = routerMiddleware(history);
    // eslint-disable-line
    const middlewares = [sagaMiddleware, routerMW];

    if (MODE === "development" && typeof window !== "undefined") {
        middlewares.push(
            createLogger({
                level: "info",
                collapsed: true,
                stateTransformer: state => {
                    const newState = {};

                    for (const i of Object.keys(state)) {
                        // eslint-disable-line
                        if (Immutable.Iterable.isIterable(state[i])) {
                            newState[i] = state[i].toJS();
                        } else {
                            newState[i] = state[i];
                        }
                    }

                    return newState;
                }
            })
        );
    }

    return middlewares;
}

// Redux & Saga Init
export default function (initialState) {
    // Redux & Saga Init
    const middlewares = createMiddlewares();

    const store = createStore(
        createRootReducer(history),
        MODE !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__()
            )
            : compose(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}