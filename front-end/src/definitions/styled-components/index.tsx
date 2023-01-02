import React from "react";
import { ThemeProvider } from "styled-components";
import {
    createTheme,
    StylesProvider,
    MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export const ThemeContext = React.createContext({
    theme: "light",
    toggle: () => undefined,
});

type IUseTheme = {
    toggle: () => void;
};

export const useTheme = (): IUseTheme => {
    const { toggle } = React.useContext(ThemeContext);

    return {
        toggle,
    };
};

export const StyledThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = React.useState<"light" | "dark">("light");

    // switch theme
    const toggle = () => {
        setTheme((theme) => (theme === "light" ? "dark" : "light"));
    };
    const values = React.useMemo(
        () => ({
            theme,
            toggle,
        }),
        [toggle, theme],
    );

    const muiTheme = React.useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: [
                        "-apple-system",
                        "BlinkMacSystemFont",
                        '"Segoe UI"',
                        "Roboto",
                        '"Helvetica Neue"',
                        "Arial",
                        '"Noto Sans"',
                        '"Liberation Sans"',
                        "sans-serif",
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                        '"Noto Color Emoji"',
                    ].join(","),
                    fontSize: 14,
                    fontWeightLight: 200,
                    fontWeightRegular: 400,
                    fontWeightMedium: 500,
                    fontWeightBold: 700,
                    caption: {
                        fontSize: "0.78rem",
                    },
                },
                palette: {
                    type: theme,
                    primary: {
                        main: "#1976d2",
                    },
                    secondary: {
                        main: "#f52936",
                    },
                    background: {
                        default: "#f0f2f5",
                    },
                },
                spacing: (x) => `${x * 8}px`,
            }),
        [theme],
    );

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <ThemeContext.Provider value={values}>
                    <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
                </ThemeContext.Provider>
            </MuiThemeProvider>
        </StylesProvider>
    );
};
