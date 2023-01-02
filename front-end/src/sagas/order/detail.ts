import { put, call } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import { getDetailOrderFailed, getDetailOrderReceived } from "@redux/actions";

import API from "@services";
import { IRequestByIdPayload } from "@interfaces";

function* getDetailOrder(
    action: PayloadAction<IRequestByIdPayload>,
): Generator<unknown, void, unknown> {
    try {
        const response = yield call(API.Request, {
            url: `/order/${action.payload.id}`,
            method: "GET",
        });
        yield put(getDetailOrderReceived(response));
    } catch (error) {
        yield put(getDetailOrderFailed(yield error));
    }
}

export { getDetailOrder };
