import { IUserBase } from "../../../shared/interfaces/user";

export interface IProps {
    onUserInfoChange: (info: IUserInfo) => void;
    parentIsVisible: boolean;
    photoRef?: React.LegacyRef<HTMLDivElement> ;
}

export interface IStyle {
    ["--interactive-color"]: string;
    ["--interactive-bgcolor"]: string;
    ["--interactive-border"]: string;
    ["--interactive-box-shadow"]: string;
}

export interface IUserInfo extends Pick<IUserBase, "name" | "description"> {
    picture: string | null;
};

export interface IImage {url: string, width: number, height: number}