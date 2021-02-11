import { Inject, Injectable } from "@nestjs/common";
import { IIndexedUser, IUserBase } from "shared/interfaces/user";
import { IUserInstance, IUserModel } from "src/models/users";
import TYPES from "src/types";

@Injectable()
export default class UserService {
    constructor(@Inject(TYPES.Models.User) private readonly _UserModel: IUserModel){}

    public async getAll(): Promise<IIndexedUser[]> {
        const userDocs = await this._UserModel.find();
        const response = UserService.toIndexedUser(userDocs);
        return response;
    }

    public async addUser(args: IUserBase): Promise<IIndexedUser[]> {
        const userDoc = await this._UserModel.create(args);
        const updatedUserDocs = await this._UserModel.find();
        const response = UserService.toIndexedUser(updatedUserDocs);
        return response;
    }

    public static toIndexedUser(user: IUserInstance): IIndexedUser;
    public static toIndexedUser(users: IUserInstance[]): IIndexedUser[];
    public static toIndexedUser(users: (IUserInstance | IUserInstance[])): (IIndexedUser | IIndexedUser[])
    {
        const toIndexedUser = (e: IUserInstance) => ({ ...e.toObject(), id: e._id.toHexString() })
        return Array.isArray(users) ? users.map(toIndexedUser) : toIndexedUser(users);
    }
}