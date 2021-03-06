import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { BurgerModalButton } from "../../../components/nav-modal";
import "./style.scss";

export const Header: React.FC<{}> = React.memo(() => {
    return (
        <Navbar className="justify-content-between align-items-start p-0 m-0" style={{ backgroundColor: "transparent" }}>
            <Form inline id="logo-wrapper">
                <img src="/logo.gif" id="logo" />
            </Form>
            <Form inline id="burger-wrapper">
                <BurgerModalButton />
            </Form>
        </Navbar>
    );
});
