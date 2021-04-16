import React from "react";
import { Modal, Row, Spinner } from "react-bootstrap";

export const LoadingModal: React.FC<{show: boolean}> = (props) => {
    const {show} = props;

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body>
                <Row className="justify-content-center">
                    <h4>Загрузка...</h4>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Spinner animation="border" />
                </Row>
            </Modal.Body>
        </Modal>
    );
};
