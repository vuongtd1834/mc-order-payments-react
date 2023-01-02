import React, { useState, useEffect } from "react";
import DraftsIcon from "@material-ui/icons/Drafts";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

import { ORDER_STATUS } from "@definitions/enum";
import { ORDER_STATUS_TEXT } from "@constants";

import { Chip } from "@components/atoms";

type IPostStatus = {
    status: ORDER_STATUS;
};

export const OrderStatus: React.FC<IPostStatus> = (props) => {
    const { status } = props;
    const [chipProps, setChipProps] = useState({});

    useEffect(() => {
        const label = ORDER_STATUS_TEXT[status];
        switch (status) {
            case ORDER_STATUS.CREATED:
                setChipProps({
                    label,
                    colour: "warning",
                    icon: <DraftsIcon />,
                });
                break;
            case ORDER_STATUS.CONFIRMED:
                setChipProps({
                    label,
                    colour: "info",
                    icon: <HourglassEmptyIcon />,
                });
                break;
            case ORDER_STATUS.DELIVERED:
                setChipProps({
                    label,
                    colour: "success",
                    icon: <CheckCircleOutlineIcon />,
                });
                break;
            case ORDER_STATUS.CANCELLED:
                setChipProps({
                    label,
                    colour: "error",
                    icon: <CancelIcon />,
                });
                break;
        }
    }, [status]);

    return <Chip size="small" variant="outlined" {...chipProps} />;
};
