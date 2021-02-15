import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { BurgerModalButton } from "../../../components/burger-modal";

export const Header: React.FC<{}> = React.memo(() => {
    return (
        <Navbar className="justify-content-end" style={{ backgroundColor: "transparent" }}>
            <Form inline className="pr-lg-4 pr-xs-2 pt-1">
                <BurgerModalButton />
            </Form>
        </Navbar>
    );
});
