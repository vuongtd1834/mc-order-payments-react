import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { StyledThemeProvider } from "@definitions/styled-components";

// store
import configureAppStore from "@redux/store";

import { SnackbarConfirm } from "@components/molecules";
import App from "./App";

const store = configureAppStore();

ReactDOM.render(
    <React.StrictMode>
        <StyledThemeProvider>
            <Provider store={store}>
                <App />
                <SnackbarConfirm />
            </Provider>
        </StyledThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
