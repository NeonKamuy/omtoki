import React, { useCallback, useContext, useRef, useState } from "react";
import { Modal, Form, Button, ListGroup } from "react-bootstrap";
import "./styles/modal.scss";
import { BurgerButton } from "./burger-button";
import { ModalContext } from "../../views/particles/context/modal-context";

export const BurgerModalButton: React.FC<{}> = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const modalContext = useContext(ModalContext);
    const modalContextRef = useRef(modalContext);
    modalContextRef.current = modalContext;

    const toggleIsOpen = useCallback(() => {
        setIsOpen((burgerIsOpen: boolean | undefined) => {
            const { modalOpen, setModalOpen } = modalContextRef.current;

            if (!!burgerIsOpen) {
                setModalOpen(false);
                return false;
            }

            if (modalOpen) return !!burgerIsOpen;
            setModalOpen(true);
            return true;
        });
    }, [setIsOpen]);

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
});
