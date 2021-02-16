import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { BurgerModalButton } from "../../../components/burger-modal";
import "./style.scss";

export const Header: React.FC<{}> = React.memo(() => {
    return (
        <Navbar className="justify-content-between" style={{ backgroundColor: "transparent" }}>
            <Form inline className="px-lg-4 px-xs-2 pt-1">
                <img src="http://kamuy.ml/omtoki/logo.svg" id="logo" />
            </Form>
            <Form inline className="pr-lg-4 pr-xs-2 pt-1">
                <BurgerModalButton />
            </Form>
        </Navbar>
    );
});
