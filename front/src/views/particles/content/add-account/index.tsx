import React, { useCallback, useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserController from "../../../../controllers/users";
import { ModalContext } from "../../context/modal-context";
import "./index.scss";

export const AccountModalButton: React.FC<{}> = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const modalContext = useContext(ModalContext);
    const modalContextRef = useRef(modalContext);
    modalContextRef.current = modalContext;

    const toggleIsOpen = useCallback(() => {
        setIsOpen((isOpen: boolean | undefined) => {
            const { modalOpen, setModalOpen } = modalContextRef.current;

            if (!!isOpen) {
                setModalOpen(false);
                return false;
            }

            if (modalOpen) return !!isOpen;
            setModalOpen(true);
            return true;
        });
    }, [setIsOpen]);

    const handleFormSubmit = useCallback((args) => {
        toggleIsOpen();
        const {
            target: [{ value: name }, { value: description }],
        } = args;
        UserController.addUser({ data: { name, description }, onLoaded: () => window.location.reload() });
    }, []);

    return (
        <>
            <span
                id="account-modal-trigger"
                onClick={toggleIsOpen}
            >
                Вступить
            </span>

            <Modal
                show={isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={toggleIsOpen}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Создать Новую Анкету</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit} id="account-creation-form" action="#">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Полное Имя</Form.Label>
                            <Form.Control type="text" placeholder="Имя Фамилия" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Краткое описание</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Пара слов о вас..." />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" type="submit" form="account-creation-form">
                        Отправить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
