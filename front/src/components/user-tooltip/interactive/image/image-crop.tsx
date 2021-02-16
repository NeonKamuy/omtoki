import React, { useCallback, useState } from "react";
import "../style.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";

export const ImageCrop: React.FC<{ image: string }> = (props) => {
    const { image } = props;
    const [crop, setCrop] = useState<ReactCrop.Crop>({ aspect: 16 / 9 });

    return (
        <div className={"interactive-user-tooltip-img-crop-container"}>
            <ReactCrop
                src={image}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
            />
        </div>
    );
};
