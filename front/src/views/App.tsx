import React from "react";
import { ParticlesView } from "./particles";
import {Helmet} from "react-helmet";

const App = () => {
    return (
        <div style={{ height: "100%" }}>
            <Helmet>
                <title>Omtoki</title>
            </Helmet>

            <ParticlesView />
        </div>
    );
};

export default App;
