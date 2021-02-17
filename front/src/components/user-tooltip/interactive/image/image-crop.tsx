import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../style.scss";
import { Button } from "react-bootstrap";

export const ImageCrop: React.FC<{
    image: string;
    onSubmit: (dataURL: string) => void;
    onClose: () => void;
}> = (props) => {
    const { image, onSubmit, onClose } = props;

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

    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    useEffect(() => {
        const img = document.createElement("img");
        img.src = image;
        img.style.cssText = `
            max-height: 80vh;
            max-width: 80vw;
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 10000;
        `;
        document.body.appendChild(img);

        const width = img.clientWidth;
        const height = img.clientHeight;
        img.remove();        

        setImageSize({width, height})
    }, [image]);

    const handleCancel = useCallback(() => {
        setImageSize(null);
        onClose();
    }, []);

    if (!imageSize) return null;
    return (
        <div
            className="interactive-user-tooltip-img-crop-container"
            style={{
                width: imageSize.width,
                height: imageSize.height,
            }}
        >
            <Cropper
                src={image}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={true}
                movable={false}
                scalable={false}
                zoomable={false}
                background={false}
                width={imageSize.width}
                height={imageSize.height}
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
