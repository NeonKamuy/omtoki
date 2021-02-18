import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../style.scss";
import { Button } from "react-bootstrap";
import { IImage } from "../interfaces";

export const ImageCrop: React.FC<{
    image: IImage;
    onSubmit: (dataURL: string) => void;
    onClose: () => void;
}> = (props) => {
    const { image: {url: imageURL, width, height}, onSubmit, onClose } = props;

    const cropperRef = useRef<HTMLImageElement>(null);
    const croppedImageRef = useRef<string | null>(null);

    const onCrop = useCallback(() => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const croppedImage = cropper.getCroppedCanvas().toDataURL();
        croppedImageRef.current = croppedImage;
    }, []);

    const handleSubmit = useCallback(() => {
        const dataURL = croppedImageRef.current;
        if (!dataURL) return;

        onSubmit(dataURL);
        croppedImageRef.current = null;
    }, []);

    return (
        <div
            className="interactive-user-tooltip-img-crop-container"
            style={{width, height}}
        >
            <Cropper
                src={imageURL}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={true}
                movable={false}
                scalable={false}
                zoomable={false}
                background={false}
                width={width}
                height={height}
                crop={onCrop}
                ref={cropperRef}
            />
            <div className="crop-controls">
                <Button variant="danger" onClick={onClose}>
                    Отменить
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
