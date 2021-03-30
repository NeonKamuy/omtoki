import React, { useCallback, useRef } from "react";
import "../styles/button.scss";
import "../styles/button-x.scss";
import { IProps } from "./interfaces";

export const BurgerButton: React.FC<IProps> = (props) => {
    const { isOpen, onClick } = props;

    return (
        <div onClick={onClick} className={isOpen ? buttonXClass : buttonClass}>
            <span>toggle menu</span>
        </div>
    );
}

const buttonClass = "c-hamburger";
const buttonXClass = "c-hamburger--x";