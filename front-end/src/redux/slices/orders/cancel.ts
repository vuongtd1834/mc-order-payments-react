import { IRequestByIdPayload, OrderModel } from "@interfaces";
import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

const cancelOrderSlice = createGenericSlice<
    OrderModel.IOrderResponse,
    IRequestByIdPayload
>({
    name: "cancelOrder",
    initialState: initialState as GenericState<OrderModel.IOrderResponse>,
})({});

const { requested, received, failed, reset } = cancelOrderSlice.actions;

export {
    failed as cancelOrderFailed,
    reset as resetStateCancelOrder,
    received as cancelOrderReceived,
    requested as cancelOrderRequested,
};

export default cancelOrderSlice.reducer;
