import { IUserBase } from "../../../shared/interfaces/user";

export interface IProps {
    onUserInfoChange: (info: IUserInfo) => void;
    parentIsVisible: boolean;
}

export interface IStyle {
    ["--interactive-color"]: string;
    ["--interactive-bgcolor"]: string;
}

export interface IUserInfo extends IUserBase {
    picture: File | null;
}
