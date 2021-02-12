import React from "react";
import { Modal, Form, Button, ListGroup } from "react-bootstrap";
import { IProps } from "./interfaces";
import "./styles/modal.scss";
import { BurgerButton } from "./burger-button";

export const BurgerModalButton: React.FC<IProps> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    return (
        <>
            <BurgerButton isOpen={isOpen} onClick={toggleIsOpen} />
            <Modal
                show={isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={toggleIsOpen}
                backdrop="static"
                className="burger-modal"
            >
                <ListGroup className="text-center burger-list-group">
                    <ListGroup.Item action>
                        <span>Home</span>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <span>Ave html template portfolio</span>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <span>About</span>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <span>Blog</span>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <span>Contact</span>
                    </ListGroup.Item>
                </ListGroup>
            </Modal>
        </>
    );
};
