import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// common component
import { Wrapper } from "@components/atoms";
import { CustomSuspense } from "@components/molecules";
// end common component

const OrderPage = React.lazy(() => import("@pages/orders"));
const CreateOrderPage = React.lazy(() => import("@pages/orders/add"));
const EditOrderPage = React.lazy(() => import("@pages/orders/edit"));

const App: React.FunctionComponent = (): JSX.Element => {
    return (
        <Router>
            <Wrapper>
                <CustomSuspense>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/orders" />
                        </Route>
                        <Route exact path="/orders" component={OrderPage} />
                        <Route
                            exact
                            path="/orders/add"
                            component={CreateOrderPage}
                        />
                        <Route
                            exact
                            path="/orders/:id"
                            component={EditOrderPage}
                        />
                    </Switch>
                </CustomSuspense>
            </Wrapper>
        </Router>
    );
};

export default App;
