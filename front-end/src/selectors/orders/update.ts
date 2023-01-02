import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { REQUEST_STATUS } from "@definitions/enum";

/**
 * selector using for update order state
 */

export const makeSelectUpdateOrderStatus = createSelector(
    (state: RootState) => state.order.update.status,
    (status) => {
        return status || REQUEST_STATUS.IDLE;
    },
);
