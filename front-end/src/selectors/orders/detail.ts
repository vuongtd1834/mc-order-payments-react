import { createSelector } from "reselect";
import { RootState } from "@redux/reducers";
import { REQUEST_STATUS } from "@definitions/enum";

/**
 * selector using for detail order state
 */

export const makeSelectDetailOrderStatus = createSelector(
    (state: RootState) => state.order.detail.status,
    (status) => {
        return status || REQUEST_STATUS.IDLE;
    },
);

export const makeSelectDetailOrder = createSelector(
    (state: RootState) => state.order.detail.data,
    (data) => {
        return data;
    },
);
