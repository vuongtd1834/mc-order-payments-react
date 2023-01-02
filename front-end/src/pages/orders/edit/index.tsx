import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { OrderModel } from "@interfaces/orders";

// action
import {
    getDetailOrderRequested,
    resetDetailOrderState,
    updateOrderRequested,
    resetStateUpdateOrder,
} from "@redux/actions";

import CreateOrEditOrder from "../component";
import { makeSelectDetailOrder } from "@selectors/orders/detail";
import { makeSelectUpdateOrderStatus } from "@selectors/orders/update";
import { isComplete } from "@utils";

const EditOrder: React.FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();

    // detail order data
    const detailOrder = useSelector(makeSelectDetailOrder);

    // update order state status
    const updateStatus = useSelector(makeSelectUpdateOrderStatus);

    /**
     * get detail order by id
     */
    useEffect(() => {
        if (params.id) {
            dispatch(getDetailOrderRequested({ id: +params.id }));
        }
        return () => {
            dispatch(resetDetailOrderState({}));
        };
    }, [params.id]);

    /**
     * reset update order state after update success
     */
    useEffect(() => {
        if (isComplete(updateStatus)) {
            dispatch(resetStateUpdateOrder({}));
        }
    }, [updateStatus]);

    const handleUpdateOrder = (data: OrderModel.ICreateOrderPayload) => {
        dispatch(updateOrderRequested({ id: +params.id, ...data }));
    };

    return (
        <CreateOrEditOrder
            onSubmit={handleUpdateOrder}
            mode="edit"
            data={detailOrder}
        />
    );
};

export default EditOrder;
