import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { IUserBase } from "shared/interfaces/user";
import {
    IAAcceptPendingUser,
    IADeclinePendingUser,
    IRGETPendingUsers,
} from "src/controllers/admin/users/validators";
import { IUser, UserStatus } from "src/controllers/users/helper-schemas";
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

    public async getAllAccepted(): Promise<IAGETAllUsers> {
        const userDocs = await this._UserModel.find(
            { status: UserStatus.accepted },
            { picture: 0 }
        );
        const response = UserService.toIndexedUser(userDocs);
        return response;
    }

    public async getPending(
        page = 0,
        perPage = 15
    ): Promise<IRGETPendingUsers> {
        const userDocs = await this._UserModel
            .find({ status: UserStatus.pending }, { picture: 0 })
            .skip(page * perPage)
            .limit(perPage);

        const pageCount = Math.floor(
            (await this._UserModel.countDocuments({
                status: UserStatus.pending,
            })) / perPage
        );

        const pendingUsers = UserService.toIndexedUser(userDocs);
        return { pendingUsers, pageCount };
    }

    public async acceptPending(args: IAAcceptPendingUser): Promise<void> {
        await this._UserModel.updateOne(
            { _id: new ObjectId(args.userId) },
            { $set: { status: UserStatus.accepted } }
        );
    }

    public async declinePending(args: IADeclinePendingUser): Promise<void> {
        await this._UserModel.deleteOne({ _id: new ObjectId(args.userId) });
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
        const userDoc = await this._UserModel.create({
            ...args,
            status: UserStatus.pending,
        });
        const response = await this.getAllAccepted();
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
