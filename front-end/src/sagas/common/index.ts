import {
    all,
    AllEffect,
    ForkEffect,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import history from "@utils/history";
import { setStatusBoundary } from "@redux/actions";
import { ErrorModel } from "@interfaces";

function* globalHandleFailed(action: PayloadAction<ErrorModel.IError>) {
    if (action.type.match(/^.+failed$/)) {
        const status = action.payload?.status;
        const statusBoundary = yield select(
            (state) => state.statusBoundary.data,
        );
        switch (status) {
            case 401:
                break;
            case 404:
                yield history.push("/404");
                break;
            case 500:
                yield put(
                    setStatusBoundary({
                        ...statusBoundary,
                        [`SERVER_ERROR${new Date().getTime()}`]: {
                            message: "Oops there was an error server!",
                            severity: "error",
                        },
                    }),
                );
                break;
            case 502:
                yield history.push("/502");
                break;
            default:
                break;
        }
    }
}

export default function* common(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
> {
    yield all([takeEvery("*", globalHandleFailed)]);
}
