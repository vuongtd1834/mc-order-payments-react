import { Divider } from "@material-ui/core";
import styled from "styled-components";

export const BasePanel = styled.div`
    display: flex;
    flex-direction: column;
    border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
    border-radius: 4px;
    padding: ${({ theme }) => theme.spacing(2)};
    & > * {
        :not(:last-child) {
            margin-bottom: ${({ theme }) => theme.spacing(2)};
        }
    }
`;

export const PanelHeader = styled.div`
    padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const DividerPanel = styled(Divider)`
    margin-left: ${({ theme }) => theme.spacing(2)};
    margin-right: ${({ theme }) => theme.spacing(2)};
`;
