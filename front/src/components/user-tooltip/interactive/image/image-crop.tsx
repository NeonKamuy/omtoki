import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../style.scss";

export const ImageCrop: React.FC<{ image: string }> = (props) => {
    const { image } = props;

    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <Cropper
            src={image}
            className="interactive-user-tooltip-img-crop-container"
            initialAspectRatio={1}
            aspectRatio={1}
            guides={true}
            movable={false}
            scalable={false}
            zoomable={false}
            crop={onCrop}
            ref={cropperRef}
        />
    );
};
