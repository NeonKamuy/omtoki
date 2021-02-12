import React from "react";
import { Content } from "../content";
import { Header } from "../header";

const App = () => {
    return (
        <div style={{height: "100%"}}>
            <Header />
            <Content />
        </div>
    );
};

export default App;
