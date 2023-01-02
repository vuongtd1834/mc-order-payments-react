import styled from "styled-components";
import { Backdrop } from "@material-ui/core";

export const SuspenseBackdrop = styled(Backdrop)`
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
    color: ${({ theme }) => theme.palette.common.white};
`;
