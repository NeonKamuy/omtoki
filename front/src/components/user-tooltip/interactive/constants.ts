import { IStyle, IUserInfo } from "./interfaces";

export const defaultStyle: IStyle = {
    "--interactive-color": "#b8b8b8",
    "--interactive-bgcolor": "white",
};

export const filledStyle: IStyle = {
    "--interactive-color": "white",
    "--interactive-bgcolor": "#8156FB",
};

export const defaultUserInfo: IUserInfo = {
    name: "",
    description: "",
    picture: null,
};
