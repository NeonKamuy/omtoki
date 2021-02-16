import React, { useCallback, useRef, useState } from "react";
import "./layouts/index.scss";
import "./layouts/interactive.scss";
import "../../static/arrow-down/arrow-down.css";
import { IUserBase } from "../../shared/interfaces/user";

export const UserInteractiveTooltip: React.FC<IProps> = (props) => {
    const { onUserInfoChange } = props;

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

    const isFilled = !!info.name && !!info.description && !!info.picture;
    const style = isFilled ? filledStyle : defaultStyle;

    return (
        <div
            className="user-tooltip-layout-default user-tooltip-container interactive"
            style={style as any}
        >
            <div className="user-tooltip-left-column">
                <div className="user-tooltip-left-top-row" style={style as any}>
                    <div className="user-tooltip-picture empty">
                        <i className="gg-arrow-down"></i>
                    </div>
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
        </div>
    );
};

interface IProps {
    onUserInfoChange: (info: IUserInfo) => void;
}

interface IStyle {
    ["--interactive-color"]: string;
    ["--interactive-bgcolor"]: string;
}

export interface IUserInfo extends IUserBase {
    picture: File | null;
}

const defaultStyle: IStyle = {
    "--interactive-color": "#b8b8b8",
    "--interactive-bgcolor": "white",
};

const filledStyle: IStyle = {
    "--interactive-color": "white",
    "--interactive-bgcolor": "#8156FB",
};

const defaultUserInfo: IUserInfo = {
    name: "",
    description: "",
    picture: null,
};
