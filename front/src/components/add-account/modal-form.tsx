import React, { useCallback, useState } from "react";
import { Modal, Form, Button, InputGroup, FormControl, Spinner } from "react-bootstrap";
import UserController from "../../controllers/users";
import "./index.scss";
import { UserInteractiveTooltip } from "../user-tooltip/interactive-tooltip";

export const AccountModalForm: React.FC<{ isOpen: boolean; toggleIsOpen: () => void }> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    const [isLoading, setIsLoading] = useState(true);
    const handleSubmit = useCallback((args) => {
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
                <div className="sector">
                    <span>Карточка</span>
                </div>
                <div className="sector">
                    <UserInteractiveTooltip onUserInfoChange={() => {}} />
                </div>
                <div className="sector">
                    <span>Навыки</span>
                </div>
                <div className="sector">
                    <textarea placeholder="Например - Java, SQL, Ruby"></textarea>
                </div>
                <div className="sector">
                    <span>Телеграм</span>
                </div>
                <div className="sector">
                    <InputGroup className="tg-input-group">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="tg-input-prepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="tg-input" />
                    </InputGroup>
                </div>

                {isLoading ? (
                    <div className="sector submit loading">
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            style={{ marginRight: 10 }}
                        />
                        <span>Отправка...</span>
                    </div>
                ) : (
                    <div className="sector submit" onClick={handleSubmit}>
                        <span>Вступить</span>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};
