import React from "react";
import { Modal } from "react-bootstrap";

export const ImageUploadModal: React.FC<{
    isOpen: boolean;
    toggleIsOpen: () => void;
}> = (props) => {
    const { isOpen, toggleIsOpen } = props;

    return (
        <>
            <Modal
                show={isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={toggleIsOpen}
                contentClassName="interactive-user-tooltip-image-upload-form"
            >
                <Modal.Body>
                    <div className="image-upload-container">
                        <div className="upload-circle-outer">
                            <div className="upload-circle-inner">
                                <div className="centered-picture-arrow">
                                    <i className="gg-arrow-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="upload-text">
                            Фотография будет проходить модерацию, проследи чтобы
                            на ней было твое лицо
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
