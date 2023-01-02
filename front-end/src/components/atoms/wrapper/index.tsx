import React from "react";
import { Box } from "@material-ui/core";
import { WrapperContainer } from "./styled";

export const Wrapper: React.FunctionComponent = ({ children }) => {
    return (
        <WrapperContainer maxWidth="md">
            <Box
                display="flex"
                flexDirection="column"
                marginBottom="auto"
                marginTop="auto"
                width="100%"
            >
                {children}
            </Box>
        </WrapperContainer>
    );
};
