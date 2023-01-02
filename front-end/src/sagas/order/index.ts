import { TakeableChannel } from "redux-saga";

import {
    createOrderRequested,
    fetchListOrderRequested,
    getDetailOrderRequested,
    updateOrderRequested,
    cancelOrderRequested,
} from "@redux/actions";

import { all, debounce, StrictEffect, takeLatest } from "redux-saga/effects";

import { createOrder } from "./create";
import { fetchOrders } from "./list";
import { getDetailOrder } from "./detail";
import { updateOrder } from "./update";
import { cancelOrder } from "./cancel";

export default function* orders(): Generator<
    StrictEffect,
    void,
    TakeableChannel<unknown>
> {
    yield all([
        debounce(300, createOrderRequested.type, createOrder),
        takeLatest(fetchListOrderRequested.type, fetchOrders),
        takeLatest(getDetailOrderRequested.type, getDetailOrder),
        debounce(300, updateOrderRequested.type, updateOrder),
        takeLatest(cancelOrderRequested.type, cancelOrder),
    ]);
}
