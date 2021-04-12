import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { IUserBase } from "shared/interfaces/user";
import { IUser } from "src/controllers/users/helper-schemas";
import {
    IAGETAllUsers,
    IAGETPictureByUserId,
} from "src/controllers/users/validators";
import { IUserModel } from "src/models/users";
import TYPES from "src/types";
import { docToObj } from "src/utils/db";

@Injectable()
export default class UserService {
    constructor(
        @Inject(TYPES.Models.User) private readonly _UserModel: IUserModel
    ) {}

    public async getAll(): Promise<IAGETAllUsers> {
        const userDocs = await this._UserModel.find({}, { picture: 0 });
        const response = UserService.toIndexedUser(userDocs);
        return response;
    }

    public async getPictureByUserId(
        args: IAGETPictureByUserId
    ): Promise<Pick<IUser, "picture" | "updatedAt">> {
        const { userId } = args;
        const picture = await this._UserModel.findOne(
            { _id: new ObjectId(userId) },
            { picture: 1, updatedAt: 1 }
        );
        if (!picture) throw new Error("Picture Not Found");
        return picture;
    }

    public async addUser(args: IUserBase): Promise<IAGETAllUsers> {
        const userDoc = await this._UserModel.create(args);
        const response = await this.getAll();
        return response;
    }

    public static toIndexedUser<
        T extends { _id: ObjectId; toObject: () => any }
    >(user: T): T & { id: string };
    public static toIndexedUser<T extends { _id: ObjectId }>(
        users: T[]
    ): (T & { id: string })[];
    public static toIndexedUser<T extends { _id: ObjectId }>(
        users: T | T[]
    ): (T & { id: string }) | (T & { id: string })[] {
        const toIndexedUser = (e: T) => ({
            ...docToObj(e),
            id: e._id.toHexString(),
        });
        return Array.isArray(users)
            ? users.map(toIndexedUser)
            : toIndexedUser(users);
    }
}
