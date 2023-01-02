import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GridCellParams, GridColDef } from "@material-ui/data-grid";
import { Button, Box } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import LaunchIcon from "@material-ui/icons/Launch";

import { OrderStatus } from "@components/molecules";
import { ORDER_STATUS } from "@definitions/enum";
import { cancelOrderRequested } from "@redux/actions";

export const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
    },
    {
        field: "username",
        headerName: "User Name",
        width: 200,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params: GridCellParams): JSX.Element => {
            const { status } = params.row;
            return <OrderStatus status={status} />;
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 220,
        sortable: false,
        renderCell: (params: GridCellParams): JSX.Element => {
            const { id, status } = params.row;
            const dispatch = useDispatch();
            const history = useHistory();

            const handleCancelOrder = (
                events: React.MouseEvent<HTMLElement>,
            ) => {
                events.stopPropagation();
                dispatch(cancelOrderRequested({ id }));
            };

            const handleRedirectDetail = (
                events: React.MouseEvent<HTMLElement>,
            ) => {
                events.stopPropagation();
                history.push(`/orders/${id}`);
            };

            if (
                status === ORDER_STATUS.CANCELLED ||
                status === ORDER_STATUS.DELIVERED
            ) {
                return (
                    <Button
                        startIcon={<LaunchIcon />}
                        color="primary"
                        onClick={handleRedirectDetail}
                        variant="outlined"
                        size="small"
                    >
                        Detail
                    </Button>
                );
            }

            return (
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button
                        startIcon={<LaunchIcon />}
                        color="primary"
                        onClick={handleRedirectDetail}
                        variant="outlined"
                        size="small"
                    >
                        Detail
                    </Button>
                    <Button
                        startIcon={<CancelIcon />}
                        color="secondary"
                        onClick={handleCancelOrder}
                        variant="outlined"
                        size="small"
                    >
                        Cancel
                    </Button>
                </Box>
            );
        },
    },
];
