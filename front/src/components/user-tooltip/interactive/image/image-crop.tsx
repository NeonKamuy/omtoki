import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../style.scss";
import { Button } from "react-bootstrap";

export const ImageCrop: React.FC<{
    image: string;
    onSubmit: (dataURL: string) => void;
}> = (props) => {
    const { image } = props;

    const cropperRef = useRef<HTMLImageElement>(null);
    const croppedImageRef = useRef<string | null>(null);

    const onCrop = useCallback(() => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const croppedImage = cropper.getCroppedCanvas().toDataURL();
        croppedImageRef.current = croppedImage;
    }, []);

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
                <Button variant="danger">Отменить</Button>
                <Button variant="success">Сохранить</Button>
            </div>
        </div>
    );
};
