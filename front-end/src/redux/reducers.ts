import { combineReducers } from "redux";
import order from "./slices/orders";
import statusBoundary from "./slices/status-boundary";

const rootReducer = combineReducers({
    order,
    statusBoundary,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
