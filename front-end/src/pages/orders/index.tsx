import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// action
import { fetchListOrderRequested, resetStateCancelOrder } from "@redux/actions";

// component
import { DataGrid } from "@components/molecules";

// selector
import {
    makeSelectOrderRequestStatus,
    makeSelectOrdersRows,
} from "@selectors/orders/list";

import { makeSelectCancelOrderStatus } from "@selectors/orders/cancel";

// utils and constant
import { isComplete, isLoading } from "@utils";
import { ORDER_REFRESH_INTERVAL } from "@constants";

// columns data grid
import { columns } from "./column";

// custom hooks
import useInterval from "@hooks/interval";

// local component
import { CreateNewOrderIcon } from "./styled";

const OrderPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const orders = useSelector(makeSelectOrdersRows);
    const orderRequestStatus = useSelector(makeSelectOrderRequestStatus);
    const cancelOrderStatus = useSelector(makeSelectCancelOrderStatus);

    /**
     * fetch list orders
     */
    useEffect(() => {
        dispatch(fetchListOrderRequested({}));
    }, []);

    /**
     * fetch new list order after delay time
     */
    useInterval(() => {
        dispatch(fetchListOrderRequested({}));
    }, ORDER_REFRESH_INTERVAL);

    /**
     * reset state cancel order if cancel success
     * prepare for next action
     */
    useEffect(() => {
        if (isComplete(cancelOrderStatus)) {
            dispatch(resetStateCancelOrder({}));
        }
    }, [cancelOrderStatus]);

    const rows = useMemo(() => {
        if (orders) {
            return orders;
        }
        return [];
    }, [orders]);

    const handleRedirectCreatePage = (): void => {
        history.push("/orders/add");
    };

    return (
        <>
            <CreateNewOrderIcon
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleRedirectCreatePage}
            >
                Create New Order
            </CreateNewOrderIcon>
            <Box width="100%" display="flex" alignItems="center">
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={10}
                    rowCount={rows?.length || 0}
                    loading={isLoading(orderRequestStatus)}
                />
            </Box>
        </>
    );
};

export default OrderPage;
