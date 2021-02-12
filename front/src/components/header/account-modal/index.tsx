import React, { useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserController from "../../../controllers/users";
import { IProps } from "./interfaces";
import "./index.scss";

export const AccountModalButton:  React.FC<IProps> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    const handleFormSubmit = useCallback((args) => {
        toggleIsOpen();
        const { target: [{value: name}, {value: description}] } = args;
        UserController.addUser({ data: { name, description }, onLoaded: () => window.location.reload() });
    }, [])

    return (
        <>
        <Button onClick={toggleIsOpen} variant="outline-dark" id="account-modal-button">Новая Анкета</Button>
        <Modal
            show={isOpen}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={toggleIsOpen}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать Новую Анкету
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit} id="account-creation-form" action="#">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Полное Имя</Form.Label>
                        <Form.Control type="text" placeholder="Имярек Имярекович" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Краткое описание</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Мне мало лет я много жил" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" type="submit" form="account-creation-form">Отправить</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}