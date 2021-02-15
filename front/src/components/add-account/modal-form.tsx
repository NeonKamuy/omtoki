import React, { useCallback } from "react";
import { Modal, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import UserController from "../../controllers/users";
import "./index.scss";
import { UserInteractiveTooltip } from "../user-tooltip/interactive-tooltip";

export const AccountModalForm: React.FC<{ isOpen: boolean; toggleIsOpen: () => void }> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    const handleFormSubmit = useCallback((args) => {
        toggleIsOpen();
        const {
            target: [{ value: name }, { value: description }],
        } = args;
        UserController.addUser({ data: { name, description }, onLoaded: () => window.location.reload() });
    }, []);

    return (
        <Modal
            show={isOpen}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={toggleIsOpen}
            contentClassName="account-modal-form"
        >
            <Modal.Body className="account-modal-form body">
                <div className="sector"><span>Карточка</span></div>
                <div className="sector">
                    <UserInteractiveTooltip onUserInfoChange={()=>{}} />
                </div>
                <div className="sector"><span>Навыки</span></div>
                <div className="sector">
                    <textarea placeholder="Например - Java, SQL, Ruby"></textarea>
                </div>
                <div className="sector"><span>Телегрsам</span></div>
                <div className="sector">
                    <InputGroup className="tg-input-group">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="tg-input-prepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="tg-input" />
                    </InputGroup>
                </div>
                <div className="sector submit">
                    <span>Вступить</span>
                </div>
            </Modal.Body>
        </Modal>
    );
};
