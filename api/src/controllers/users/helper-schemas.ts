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

// User Schema
export const UserSchema = {
    ...UserBaseRawSchema,
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
};
export interface IUser extends IUserBase {
    createdAt?: Date;
    updatedAt?: Date;
}