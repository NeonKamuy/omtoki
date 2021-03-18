import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { BurgerModalButton } from "../../../components/burger-modal";
import "./style.scss";

export const Header: React.FC<{}> = React.memo(() => {
    return (
        <Navbar className="justify-content-between" style={{ backgroundColor: "transparent" }}>
            <Form inline id="logo-wrapper">
                <img src="/logo.gif" id="logo" />
            </Form>
            <Form inline id="burger-wrapper">
                <BurgerModalButton />
            </Form>
        </Navbar>
    );
});
