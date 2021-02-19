import { IStyle, IUserInfo } from "./interfaces";

export const defaultStyle: IStyle = {
    "--interactive-color": "#b8b8b8",
    "--interactive-bgcolor": "white",
    "--interactive-border": "1px solid black",
    "--interactive-box-shadow": "1px -1px 0 0 black"
};

export const filledStyle: IStyle = {
    "--interactive-color": "white",
    "--interactive-bgcolor": "#8156FB",
    "--interactive-border": "none",
    "--interactive-box-shadow": "1px -1px 0 0 #8156FB"
};

export const defaultUserInfo: IUserInfo = {
    name: "",
    description: "",
    picture: null,
};
