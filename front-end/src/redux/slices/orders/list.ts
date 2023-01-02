import { OrderModel } from "@interfaces";

import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

const listOrderSlice = createGenericSlice<
    Array<OrderModel.IOrderResponse>,
    Record<string, unknown>
>({
    name: "listOrders",
    initialState: initialState as GenericState<
        Array<OrderModel.IOrderResponse>
    >,
})({});

const { requested, received, failed, reset } = listOrderSlice.actions;

export {
    failed as fetchListOrdersFailed,
    reset as resetStateListOrders,
    received as fetchListOrdersReceived,
    requested as fetchListOrderRequested,
};

export default listOrderSlice.reducer;
