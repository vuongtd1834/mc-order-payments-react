import React, { useMemo, useState, useEffect } from "react";
import values from "lodash/values";
import every from "lodash/every";
import keys from "lodash/keys";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { resetStateStatusBoundary } from "@redux/slices/status-boundary";

// selector
import { makeSelectStatusBoundary } from "@selectors/status-boundary";
import { useCallback } from "react";
// end of selector

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarConfirm = (): JSX.Element => {
    const dispatch = useDispatch();
    const [listOpened, setListOpened] = useState({});
    const status = useSelector(makeSelectStatusBoundary);

    // hooks

    /**
     * open snackbar by action name
     */
    useMemo(() => {
        keys(status)?.forEach((name) => {
            setListOpened({ [name]: true });
        });
    }, [status]);

    /**
     * reset state status boundary if all snackbar closed
     */
    useEffect(() => {
        if (every(values(listOpened), (value) => !value)) {
            dispatch(resetStateStatusBoundary({}));
        }
    }, [listOpened]);

    // end of hooks

    // function

    const handleClose = useCallback(
        (event?: React.SyntheticEvent, reason?: string, action?: string) => {
            if (reason === "clickaway") {
                return;
            }
            setListOpened({ ...listOpened, [action]: false });
        },
        [listOpened],
    );

    // end of function

    return (
        <React.Fragment>
            {keys(status)?.map((key) => (
                <Snackbar
                    key={key}
                    open={listOpened[key]}
                    autoHideDuration={3000}
                    onClose={(event, reason) => handleClose(event, reason, key)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Alert
                        onClose={(event) => handleClose(event, null, key)}
                        severity={status[key]?.severity}
                    >
                        {status[key]?.message}
                    </Alert>
                </Snackbar>
            ))}
        </React.Fragment>
    );
};

export { SnackbarConfirm };
