import { put, call } from "redux-saga/effects";

import { fetchListOrdersReceived, fetchListOrdersFailed } from "@redux/actions";

import API from "@services";

function* fetchOrders(): Generator<unknown, void, unknown> {
    try {
        const response = yield call(API.Request, {
            url: "/order",
            method: "GET",
        });
        yield put(fetchListOrdersReceived(response));
    } catch (error) {
        yield put(fetchListOrdersFailed(yield error));
    }
}

export { fetchOrders };
