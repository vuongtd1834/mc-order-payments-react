import { put, call, select } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
    createOrderFailed,
    createOrderReceived,
    setStatusBoundary,
} from "@redux/actions";

import { OrderModel } from "@interfaces";

import API from "@services";

function* createOrder(
    action: PayloadAction<OrderModel.ICreateOrderPayload>,
): Generator<unknown, void, Record<string, unknown>> {
    const statusBoundary = yield select((state) => state.statusBoundary.data);
    try {
        const response = yield call(API.Request, {
            url: "/order",
            method: "POST",
            payload: {
                ...action.payload,
            },
        });
        yield put(createOrderReceived(response));
        yield put(
            setStatusBoundary({
                ...statusBoundary,
                [`createOrder${new Date().getTime()}`]: {
                    message: "Create Order Successfully!",
                    severity: "success",
                },
            }),
        );
    } catch (error) {
        yield put(createOrderFailed(yield error));
    }
}

export { createOrder };
