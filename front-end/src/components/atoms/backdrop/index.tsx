import React from "react";
import { BackdropProps } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SuspenseBackdrop } from "./styled";

export const BackDropLoading: React.FunctionComponent<BackdropProps> = (
    props,
) => {
    return (
        <SuspenseBackdrop {...props}>
            <CircularProgress color="inherit" />
        </SuspenseBackdrop>
    );
};
