import React, { useCallback, useRef } from "react";
import "./index.scss";
import { IProps } from "./interfaces";

export const BurgerButton: React.FC<IProps> = (props) => {
    const { isOpen, onClick } = props;

    return (
        <div onClick={onClick} className={buttonClass + (isOpen ? "is-active" : "")}>
            <span>toggle menu</span>
        </div>
    );
}

const buttonClass = "c-hamburger c-hamburger--x ";