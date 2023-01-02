import { put, call, select } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import {
    updateOrderFailed,
    updateOrderReceived,
    setStatusBoundary,
} from "@redux/actions";

import { OrderModel } from "@interfaces";

import API from "@services";

function* updateOrder(
    action: PayloadAction<OrderModel.IUpdateOrderPayload>,
): Generator<unknown, void, Record<string, unknown>> {
    const statusBoundary = yield select((state) => state.statusBoundary.data);
    try {
        const response = yield call(API.Request, {
            url: `/order/${action.payload.id}`,
            method: "PUT",
            payload: {
                ...omit(action.payload, ["id"]),
            },
        });
        yield put(updateOrderReceived(response));
        yield put(
            setStatusBoundary({
                ...statusBoundary,
                [`updateOrder${new Date().getTime()}`]: {
                    message: "Update Order Successfully!",
                    severity: "success",
                },
            }),
        );
    } catch (error) {
        yield put(updateOrderFailed(yield error));
    }
}

export { updateOrder };
