import { IUserBase } from "shared/interfaces/user";
import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import { ObjectId } from "bson";

class User implements IUserBase {
    @prop()
    _id: ObjectId;

    @prop()
    name: string;

    @prop()
    description: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

const UserModel = getModelForClass(User);

export type IUserModel = typeof UserModel;
export type IUserInstance = DocumentType<User>;


export default UserModel;