import React, { useCallback, useState } from "react";
import "./layouts/index.scss";
import "./layouts/interactive.scss";
import "../../static/arrow-down/arrow-down.css";
import { IUserBase } from "../../shared/interfaces/user";

export const UserInteractiveTooltip: React.FC<IProps> = (props) => {
    const { onUserInfoChange } = props;
    const style = props.style ?? defaultStyle;

    const [info, setInfo] = useState<IUserInfo | null>(null);

    const handleInfoChange = useCallback(() => {}, []);

    return (
        <div className="user-tooltip-layout-default user-tooltip-container interactive" style={style}>
            <div className="user-tooltip-left-column">
                <div className="user-tooltip-left-top-row" style={style}>
                    <div className="user-tooltip-picture empty">
                        <i className="gg-arrow-down"></i>
                    </div>
                </div>

                <div className="user-tooltip-left-bottom-row"></div>
            </div>

            <div className="user-tooltip-right-column">
                <div className="user-tooltip-right-top-row">
                    <input type="text" className="user-tooltip-text-input" placeholder="Имя Фамилия"></input>
                </div>

                <div className="user-tooltip-right-bottom-row">
                    <textarea
                        className="user-tooltip-text-input"
                        placeholder="На Java запустил ракету в космос. Очнулся, понял, что сон. Плакал"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

interface IProps {
    onUserInfoChange: (info: IUserInfo) => void;
    style?: IStyle | null;
}

interface IStyle {
    color: string;
    backgroundColor: string;
}

interface IUserInfo extends IUserBase {
    picture: File | null;
}

const defaultStyle: IStyle = {
    color: "#b8b8b8",
    backgroundColor: "white",
};



