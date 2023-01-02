import React from "react";
import { DataGridProps, GridOverlay } from "@material-ui/data-grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CustomNoRowsOverlay } from "./grid-overlay";
import { CustomDataGrid, WrapOverlay } from "./styled";

const DataGridLoadingOverlay: React.FunctionComponent = (): JSX.Element => {
    return (
        <GridOverlay>
            <WrapOverlay>
                <LinearProgress />
            </WrapOverlay>
        </GridOverlay>
    );
};

export const DataGrid: React.FunctionComponent<DataGridProps> = (
    props,
): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <CustomDataGrid
            {...rest}
            disableSelectionOnClick
            autoHeight
            pagination
            components={{
                LoadingOverlay: DataGridLoadingOverlay,
                NoRowsOverlay: CustomNoRowsOverlay,
            }}
        >
            {children}
        </CustomDataGrid>
    );
};
