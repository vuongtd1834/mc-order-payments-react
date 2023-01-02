import React from "react";
import { Typography } from "@material-ui/core";
import { BasePanel, DividerPanel } from "./styled";

type IPanel = {
    title?: string;
};

export const Panel: React.FC<IPanel> = (props): JSX.Element => {
    const { title, children } = props;
    return (
        <BasePanel>
            <Typography variant="subtitle2" color="textPrimary">
                {title}
            </Typography>
            <DividerPanel />
            {children}
        </BasePanel>
    );
};
