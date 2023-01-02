import { fork, ForkEffect } from "@redux-saga/core/effects";

import common from "./common";
import orders from "./order";

export default function* root(): Generator<ForkEffect<void>, void, unknown> {
    yield fork(common);
    yield fork(orders);
}
