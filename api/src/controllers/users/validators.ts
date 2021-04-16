import * as Joi from "joi";
import { IIndexedUser, IIndexedUserMeta } from "shared/interfaces/user";

export type IAGETAllUsers = IIndexedUserMeta[];

export const AUserIdRawSchema = {
    userId: Joi.string().required(),
};
export interface IAUserId {
    userId: string;
}

/*******************************/

export const AGETPictureByUserIdSchema = Joi.object(AUserIdRawSchema);
export type IAGETPictureByUserId = IAUserId;
