import { OrderModel } from "@interfaces";
import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

const updateOrderSlice = createGenericSlice<
    OrderModel.IOrderResponse,
    OrderModel.IUpdateOrderPayload
>({
    name: "updateOrder",
    initialState: initialState as GenericState<OrderModel.IOrderResponse>,
})({});

const { requested, received, failed, reset } = updateOrderSlice.actions;

export {
    failed as updateOrderFailed,
    reset as resetStateUpdateOrder,
    received as updateOrderReceived,
    requested as updateOrderRequested,
};

export default updateOrderSlice.reducer;
