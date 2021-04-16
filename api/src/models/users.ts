import { IUserBase } from "shared/interfaces/user";
import { prop, getModelForClass, DocumentType, modelOptions } from '@typegoose/typegoose';
import { getTypegooseOptions } from "./db-config/model-options";
import { IUser } from "src/controllers/users/helper-schemas";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions(getTypegooseOptions("users"))
class User implements IUser {
    @prop()
    name: string;

    @prop()
    description: string;

    @prop()
    skills: string;

    @prop()
    tg: string;

    @prop()
    picture: string;

    @prop()
    status: number;

    @prop()
    createdAt?: Date;

    @prop()
    updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export type IUserModel = typeof UserModel;
export type IUserInstance = DocumentType<User>;


export default UserModel;