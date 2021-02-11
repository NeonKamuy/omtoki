import { IUserBase } from "shared/interfaces/user";
import { prop, getModelForClass, DocumentType, modelOptions } from '@typegoose/typegoose';
import { ObjectId } from "bson";
import { getTypegooseOptions } from "./db-config/model-options";

@modelOptions(getTypegooseOptions("users"))
class User implements IUserBase {
    @prop()
    name: string;

    @prop()
    description: string;
}

const UserModel = getModelForClass(User);

export type IUserModel = typeof UserModel;
export type IUserInstance = DocumentType<User>;


export default UserModel;