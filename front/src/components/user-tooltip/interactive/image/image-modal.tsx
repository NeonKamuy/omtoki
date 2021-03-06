import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IImage } from "../interfaces";
import { ImageCrop } from "./image-crop";

export const ImageUploadModal: React.FC<{
    isOpen: boolean;
    toggleIsOpen: (open?: boolean) => void;
    onSubmit: (dataURL: string) => void;
}> = (props) => {
    const { isOpen, toggleIsOpen, onSubmit: onImageChange } = props;
    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handlePictureUpload = useCallback(() => {
        const fileInput = fileInputRef.current;
        if (!fileInput) return;
        fileInput.click();
    }, []);

    const [image, setImage] = useState<IImage | null>(null);
    const imageRef = useRef(image);
    imageRef.current = image;

    const handleImageChange = useCallback((image: IImage) => {
        isOpenRef.current && setImage(image);
    }, []);

    useEffect(() => {
        if (!isOpen) setImage(null);
    }, [isOpen]);

    const rawImageContainerRef = useRef<HTMLImageElement>(null);
    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target?.files?.[0];
            if (!file) return;

            const fileURL = URL.createObjectURL(file);

            // Needed to get responsive size for crop container
            const img = rawImageContainerRef.current!;
            img.src = fileURL;
            img.addEventListener("load", ()=>{
                handleImageChange({
                    url: fileURL,
                    width: img.width,
                    height: img.height,
                });
    
            }, {once:true});
        },
        []
    );

    const handleImageCropSubmit = useCallback((dataURL: string) => {
        setImage(null);
        toggleIsOpen(false);
        onImageChange(dataURL);
    }, []);

    const handleImageCropClose = useCallback(()=>{
        setImage(null);
    }, [])

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
                    <ImageCrop image={image} onClose={handleImageCropClose} onSubmit={handleImageCropSubmit} />
                )}
            </Modal>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />
            <img ref={rawImageContainerRef} style={{                maxHeight: "80vh",
                maxWidth: "80vw",
                position: "absolute", visibility: "hidden"}} />
        </>
    );
};
