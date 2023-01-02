import React from "react";
import { useDispatch } from "react-redux";

import { OrderModel } from "@interfaces/orders";

import { createOrderRequested } from "@redux/actions";

// local component
import CreateOrEditOrder from "../component";

const CreateOrder: React.FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();

    const handleCreateNewOrder = (data: OrderModel.ICreateOrderPayload) => {
        dispatch(createOrderRequested(data));
    };
    return <CreateOrEditOrder onSubmit={handleCreateNewOrder} />;
};

export default CreateOrder;
