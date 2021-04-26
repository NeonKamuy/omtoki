import { ToIndexed } from "./utils";

// Minimal Common Information About Single User
export interface IUserBase {
    name: string;
    description: string;
    skills: string;
    tg: string;
    picture: string;
}

// Single User With Id
export type IIndexedUser = ToIndexed<IUserBase>;

// Indexed User Without Picture
export type IIndexedUserMeta = Omit<IIndexedUser, "picture">;