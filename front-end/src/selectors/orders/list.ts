import { createSelector } from "reselect";
import pick from "lodash/pick";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { RootState } from "@redux/reducers";
import { REQUEST_STATUS } from "@definitions/enum";

/**
 * selector using for list orders state
 */

export const makeSelectOrdersRows = createSelector(
    (state: RootState) => state.order.list.data,
    (data) => {
        if (!isEmpty(data)) {
            return map(data, (d) =>
                pick(d, [
                    "id",
                    "amount",
                    "username",
                    "status",
                    "created_at",
                    "updated_at",
                ]),
            );
        }
        return [];
    },
);

export const makeSelectOrderRequestStatus = createSelector(
    (state: RootState) => state.order.list.status,
    (status) => {
        return status || REQUEST_STATUS.IDLE;
    },
);
