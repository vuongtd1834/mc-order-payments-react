import { combineReducers } from "redux";

import create from "./create";
import list from "./list";
import detail from "./detail";
import update from "./update";
import cancel from "./cancel";

const orderReducer = combineReducers({
    list,
    create,
    detail,
    update,
    cancel,
});

export default orderReducer;
