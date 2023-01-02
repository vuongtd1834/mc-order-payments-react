import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { InputNumber as CustomInputNumber } from "./styled";

export const Input: React.FunctionComponent<TextFieldProps> = React.memo(
    (props) => {
        return <TextField variant="outlined" size="small" {...props} />;
    },
);

export const InputNumber: React.FunctionComponent<TextFieldProps> = React.memo(
    (props) => {
        return <CustomInputNumber variant="outlined" size="small" {...props} />;
    },
);
