import { put, call, select } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";

import {
    cancelOrderFailed,
    cancelOrderReceived,
    fetchListOrdersReceived,
    setStatusBoundary,
} from "@redux/actions";

import { IRequestByIdPayload, OrderModel } from "@interfaces";

import API from "@services";

import { ORDER_STATUS } from "@definitions/enum";

function* cancelOrder(
    action: PayloadAction<IRequestByIdPayload>,
): Generator<
    unknown,
    void,
    Record<string, unknown> & Array<OrderModel.IOrderResponse>
> {
    const statusBoundary = yield select((state) => state.statusBoundary.data);
    const orders = yield select((state) => state.order.list.data);
    try {
        const response = yield call(API.Request, {
            url: `/order/${action.payload.id}/cancel`,
            method: "PUT",
        });
        yield put(cancelOrderReceived(response));
        yield put(
            setStatusBoundary({
                ...statusBoundary,
                [`cancelOrder${new Date().getTime()}`]: {
                    message: "Cancel Order Successfully!",
                    severity: "success",
                },
            }),
        );
        if (orders) {
            const temp = [...orders];
            const newOrders = temp.map((order) => {
                const newOrder = { ...order };
                if (newOrder.id === response?.id) {
                    newOrder.status = ORDER_STATUS.CANCELLED;
                }
                return newOrder;
            });
            yield put(fetchListOrdersReceived(newOrders));
        }
    } catch (error) {
        yield put(cancelOrderFailed(yield error));
    }
}

export { cancelOrder };
