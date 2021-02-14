import React from "react";
import { ParticlesView } from "./particles";
import {Helmet} from "react-helmet";

const App = () => {
    return (
        <div style={{ height: "100%" }}>
            <Helmet>
                <link rel="icon" href="https://icon-library.com/images/progress-icon-gif/progress-icon-gif-21.jpg" type="image/gif" ></link>
                <title>Omtoki</title>
            </Helmet>

            <ParticlesView />
        </div>
    );
};

export default App;
