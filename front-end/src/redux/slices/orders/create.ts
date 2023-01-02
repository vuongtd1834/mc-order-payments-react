import { OrderModel } from "@interfaces";

import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

const createOrderSlice = createGenericSlice<
    OrderModel.IOrderResponse,
    OrderModel.ICreateOrderPayload
>({
    name: "createOrder",
    initialState: initialState as GenericState<OrderModel.IOrderResponse>,
})({});

const { requested, received, failed, reset } = createOrderSlice.actions;

export {
    failed as createOrderFailed,
    reset as resetStateCreateOrder,
    received as createOrderReceived,
    requested as createOrderRequested,
};

export default createOrderSlice.reducer;
