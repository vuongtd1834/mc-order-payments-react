import styled from "styled-components";

import Chip from "@material-ui/core/Chip";

export const BaseChip = styled(Chip)`
    color: ${({ theme, colour, variant }) => {
        if (variant === "outlined" || variant === "text") {
            return theme.palette[colour]?.main;
        }
        return theme.palette[colour]?.contrastText;
    }};
    background: ${({ theme, colour, variant }) => {
        if (variant === "outlined" || variant === "text") {
            return;
        }
        return theme.palette[colour]?.main;
    }};
    border: ${({ theme, colour, variant }) => {
        if (variant === "outlined") {
            return `1px solid ${theme.palette[colour]?.main}`;
        }
        return "none";
    }};
    & svg {
        color: ${({ theme, colour, variant }) => {
            if (variant === "outlined" || variant === "text") {
                return theme.palette[colour]?.main;
            }
            return theme.palette[colour]?.contrastText;
        }};
    }
`;
