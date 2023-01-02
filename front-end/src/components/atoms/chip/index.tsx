import React from "react";
import { ChipProps } from "@material-ui/core";

import { BaseChip } from "./styled";

type IChip = {
    colour?: "success" | "error" | "info" | "warning";
};

export const Chip: React.FC<IChip & ChipProps> = (props) => {
    const { children, ...rest } = props;
    return <BaseChip {...rest}>{children}</BaseChip>;
};
