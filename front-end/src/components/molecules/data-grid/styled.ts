import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";

export const CustomDataGrid = styled(DataGrid)`
    background-color: ${({ theme }) => theme.palette.background.paper};
    .MuiDataGrid-overlay {
        background-color: ${({ theme }) => theme.palette.background.default};
    }
`;

export const WrapOverlay = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
`;
