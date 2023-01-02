import {
    createSlice,
    PayloadAction,
    Slice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

import { REQUEST_STATUS } from "@definitions/enum";

export interface GenericState<T> {
    data?: T;
    status: REQUEST_STATUS;
    error?: T;
    params?: unknown;
}

export const initialState = {
    status: REQUEST_STATUS.IDLE,
    data: {},
    error: {},
    params: undefined,
};
/**
 * @param T response state
 * @param D params
 * @returns slice
 */
const createGenericSlice = <T, D>({
    name = "",
    initialState,
}: {
    name: string;
    initialState: GenericState<T>;
}) => {
    return <Reducers extends SliceCaseReducers<GenericState<T>>>(
        reducers: Reducers &
            ValidateSliceCaseReducers<
                GenericState<T>,
                Reducers
            > = {} as Reducers &
            ValidateSliceCaseReducers<GenericState<T>, Reducers>,
    ): Slice => {
        return createSlice({
            name,
            initialState,
            reducers: {
                requested(state, action: PayloadAction<D>) {
                    state.status = REQUEST_STATUS.LOADING;
                    state.params = { ...action.payload };
                },
                /**
                 * If you want to write to values of the state that depend on the generic
                 * (in this case: `state.data`, which is T), you might need to specify the
                 * State type manually here, as it defaults to `Draft<GenericState<T>>`,
                 * which can sometimes be problematic with yet-unresolved generics.
                 * This is a general problem when working with immer's Draft type and generics.
                 */
                received(state: GenericState<T>, action: PayloadAction<T>) {
                    state.data = action.payload;
                    state.status = REQUEST_STATUS.COMPLETE;
                    state.error = {} as T;
                    state.params = undefined as D;
                },
                failed(state: GenericState<T>, action: PayloadAction<T>) {
                    state.error = action.payload;
                    state.status = REQUEST_STATUS.ERROR;
                    state.data = {} as T;
                    state.params = undefined as D;
                },
                reset(state: GenericState<T>) {
                    state.error = {} as T;
                    state.status = REQUEST_STATUS.IDLE;
                    state.data = {} as T;
                    state.params = undefined as D;
                },
                ...reducers,
            },
        });
    };
};

export default createGenericSlice;
