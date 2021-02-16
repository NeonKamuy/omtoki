import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { ImageCrop } from "./image-crop";

export const ImageUploadModal: React.FC<{
    isOpen: boolean;
    toggleIsOpen: (open?: boolean) => void;
}> = (props) => {
    const { isOpen, toggleIsOpen } = props;
    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handlePictureUpload = useCallback(() => {
        const fileInput = fileInputRef.current;
        if (!fileInput) return;
        fileInput.click();
    }, []);

    const [image, setImage] = useState<string | null>(null);
    const imageRef = useRef(image);
    imageRef.current = image;

    const handleImageChange = useCallback((fileURL: string | null) => {
        isOpenRef.current && setImage(fileURL);
    }, []);

    useEffect(() => {
        if (!isOpen) setImage(null);
    }, [isOpen]);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.stopPropagation();
            event.preventDefault();
            const file = event.target?.files?.[0];

            if (!file) return;

            const fileURL = URL.createObjectURL(file);
            handleImageChange(fileURL);
        },
        []
    );

    const handleImageCropSubmit = useCallback(() => {}, []);

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
                        <div
                            className="upload-circle-outer"
                            onClick={handlePictureUpload}
                        >
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

                {image && (
                    <ImageCrop image={image} onSubmit={handleImageCropSubmit} />
                )}
            </Modal>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />
        </>
    );
};
