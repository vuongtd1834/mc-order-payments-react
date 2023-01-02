import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import { RootState } from "@redux/reducers";

export const makeSelectStatusBoundary = createSelector(
    (state: RootState) => state.statusBoundary.data,
    (status) => {
        if (!isEmpty(status)) {
            return status;
        }
        return [];
    },
);
