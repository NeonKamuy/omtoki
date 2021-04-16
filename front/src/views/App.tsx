import React, { useLayoutEffect, useState } from "react";
import { ParticlesView } from "./particles";
import { Helmet } from "react-helmet";
import { Route } from "react-router";
import Switch from "react-bootstrap/esm/Switch";
import { PendingUserList } from "./admin/PendingUserList";
import { Login } from "./admin/Login";

const App = () => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight + "px");

    useLayoutEffect(() => {
        const updateSize = () => setInnerHeight(window.innerHeight + "px");
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        /* Overriding default vh for proper responsibility */
        <div style={{ "--windowInnerHeight": innerHeight } as any}>
            <Helmet>
                <title>Omtoki</title>
            </Helmet>

            <Switch>
                <Route path="/admin/login/:redirectionPath?" exact>
                    <Login />
                </Route>
                <Route path="/admin/pending-users" exact>
                    <PendingUserList />
                </Route>
                <Route path="/" exact>
                    <ParticlesView />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
