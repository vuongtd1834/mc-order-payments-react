import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { REQUEST_STATUS } from "@definitions/enum";

/**
 * selector using for cancel order state
 */

export const makeSelectCancelOrderStatus = createSelector(
    (state: RootState) => state.order.cancel.status,
    (status) => {
        return status || REQUEST_STATUS.IDLE;
    },
);
