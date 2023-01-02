import styled from "styled-components";
import { Container } from "@material-ui/core";

export const WrapperContainer = styled(Container)`
    display: flex;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.palette.background.default};
`;
