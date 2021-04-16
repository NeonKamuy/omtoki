import * as Joi from "joi";
import { IUserBase } from "shared/interfaces/user";

// Base User Schema
export const UserBaseRawSchema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    skills: Joi.string().required(),
    picture: Joi.string().required(),
    tg: Joi.string().required(),
};

export const UserBaseSchema = Joi.object(UserBaseRawSchema);

// User Status
export enum UserStatus {
    pending = 0,
    accepted = 1,
}
export const UserStatuses = Object.values(UserStatus);

// User Schema
export const UserSchema = {
    ...UserBaseRawSchema,
    userStatus: Joi.number()
        .integer()
        .valid(...UserStatuses)
        .required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
};

export interface IUser extends IUserBase {
    status: UserStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
