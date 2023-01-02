import { OrderModel, IRequestByIdPayload } from "@interfaces";
import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

const detailOrderSlice = createGenericSlice<
    OrderModel.IOrderResponse,
    IRequestByIdPayload
>({
    name: "detailOrder",
    initialState: initialState as GenericState<OrderModel.IOrderResponse>,
})({});

const { requested, received, failed, reset } = detailOrderSlice.actions;

export {
    requested as getDetailOrderRequested,
    received as getDetailOrderReceived,
    failed as getDetailOrderFailed,
    reset as resetDetailOrderState,
};

export default detailOrderSlice.reducer;
