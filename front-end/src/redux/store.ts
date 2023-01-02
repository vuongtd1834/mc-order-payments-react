import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";

import reducers from "./reducers";

// saga
import sagas from "@sagas";

const configureAppStore = (): EnhancedStore => {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    // Create the store with saga middleware
    const middleware = [];
    middleware.push(sagaMiddleware);

    if (process.env.NODE_ENV !== "production") {
        middleware.push(logger);
    }

    const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware({
                thunk: false,
            }),
            ...middleware,
        ],
        devTools: process.env.NODE_ENV !== "production",
    });

    sagaMiddleware.run(sagas);

    return store;
};

export default configureAppStore;
