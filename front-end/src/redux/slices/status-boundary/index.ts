import createGenericSlice, {
    GenericState,
    initialState,
} from "@redux/slices/base";

export type IStatusBoundary = {
    message: string;
    severity: "error" | "success" | "warning" | "info";
};

const statusBoundarySlice = createGenericSlice<
    Record<string, IStatusBoundary>,
    Record<string, IStatusBoundary>
>({
    name: "statusBoundary",
    initialState: initialState as GenericState<Record<string, IStatusBoundary>>,
})({});

const { received, reset } = statusBoundarySlice.actions;

export { received as setStatusBoundary, reset as resetStateStatusBoundary };

export default statusBoundarySlice.reducer;
