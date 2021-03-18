import React, { useCallback, useRef, useState } from "react";
import "../layouts/index.scss";
import "./style.scss";
import "../../../static/arrow-down/arrow-down.css";
import { IProps } from "./interfaces";
import { defaultUserInfo, filledStyle, defaultStyle } from "./constants";
import { IUserInfo } from "./interfaces";
import { ImageUploadModal } from "./image/image-modal";
import { ImageCrop } from "./image/image-crop";
import { __CONFIG__ } from "../../../config";

export const UserInteractiveTooltip: React.FC<IProps> = (props) => {
    const { onUserInfoChange } = props;
    const parentIsVisibleRef = useRef(props.parentIsVisible);
    parentIsVisibleRef.current = props.parentIsVisible;

    const [info, setInfo] = useState<IUserInfo>(defaultUserInfo);
    const infoRef = useRef(info);
    infoRef.current = info;

    const handleNameChange = useCallback((e) => {
        const newVal = e.target.value;
        handleInput("name", newVal);
    }, []);

    const handleDescChange = useCallback((e) => {
        const newVal = e.target.value;
        handleInput("description", newVal);
    }, []);

    const handleInput = useCallback((key: string, value: string) => {
        setInfo((e) => {
            const newState = {
                ...e,
                [key]: value,
            };
            onUserInfoChange(newState);
            return newState;
        });
    }, []);

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const toggleImageModalOpen = useCallback(
        (arg?: React.MouseEvent<HTMLDivElement, MouseEvent> | boolean) => {
            setImageModalOpen((e) => {
                const res = parentIsVisibleRef.current && (arg ? !!arg : !e);
                return res;
            });
        },
        []
    );

    const handleImageChange = useCallback((dataURL: string) => {
        handleInput("picture", dataURL);
    }, []);

    const isFilled = !!info.name && !!info.description && !!info.picture;
    const style = isFilled ? filledStyle : defaultStyle;

    return (
        <div
            className="user-tooltip-layout-default user-tooltip-container interactive"
            style={style as any}
        >
            <div className="user-tooltip-left-column">
                <div className="user-tooltip-left-top-row" style={style as any}>
                    {info.picture ? (
                        <div
                            className="user-tooltip-picture"
                            style={{
                                backgroundImage: `url(${__CONFIG__.backendURL + "/" + info.picture})`,
                            }}
                            onClick={toggleImageModalOpen}
                        />
                    ) : (
                        <div
                            className="user-tooltip-picture"
                            onClick={toggleImageModalOpen}
                        >
                            <div className="centered-picture-arrow">
                                <i className="gg-arrow-down"></i>
                            </div>
                        </div>
                    )}
                </div>

                <div className="user-tooltip-left-bottom-row"></div>
            </div>

            <div className="user-tooltip-right-column">
                <div className="user-tooltip-right-top-row">
                    <input
                        type="text"
                        className="user-tooltip-text-input"
                        placeholder="Имя Фамилия"
                        value={info?.name}
                        onChange={handleNameChange}
                    ></input>
                </div>

                <div className="user-tooltip-right-bottom-row">
                    <textarea
                        className="user-tooltip-text-input"
                        placeholder="На Java запустил ракету в космос. Очнулся, понял, что сон. Плакал"
                        value={info?.description}
                        onChange={handleDescChange}
                    ></textarea>
                </div>
            </div>
            <ImageUploadModal
                isOpen={imageModalOpen}
                toggleIsOpen={toggleImageModalOpen}
                onSubmit={handleImageChange}
            />
        </div>
    );
};
