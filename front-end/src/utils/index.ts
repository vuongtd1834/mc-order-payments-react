import { REQUEST_STATUS } from "@definitions/enum";

export const isLoading = (status: REQUEST_STATUS): boolean =>
    status === REQUEST_STATUS.LOADING;

export const isIdle = (status: REQUEST_STATUS): boolean =>
    status === REQUEST_STATUS.IDLE;

export const isComplete = (status: REQUEST_STATUS): boolean =>
    status === REQUEST_STATUS.COMPLETE;

export const isError = (status: REQUEST_STATUS): boolean =>
    status === REQUEST_STATUS.ERROR;
