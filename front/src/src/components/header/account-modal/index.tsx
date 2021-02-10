import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IProps } from "./interfaces";

export const AccountModal: React.FC<IProps> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    return (
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
                <Form>
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
                <Button variant="outline-dark" onClick={toggleIsOpen}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}