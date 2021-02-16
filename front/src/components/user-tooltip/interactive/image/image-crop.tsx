import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../style.scss";
import { Button } from "react-bootstrap";

export const ImageCrop: React.FC<{
    image: string;
    onSubmit: (dataURL: string) => void;
}> = (props) => {
    const { image, onSubmit } = props;

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

    const handleCancel = useCallback(() => {}, []);

    return (
        <div className="interactive-user-tooltip-img-crop-container">
            <Cropper
                src={image}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={true}
                movable={false}
                scalable={false}
                zoomable={false}
                crop={onCrop}
                ref={cropperRef}
            />
            <div className="crop-controls">
                <Button variant="danger" onClick={handleCancel}>
                    Отменить
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
