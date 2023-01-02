import styled from "styled-components";
import { Button } from "@material-ui/core";

export const CreateNewOrderIcon = styled(Button)`
    align-self: flex-end;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
