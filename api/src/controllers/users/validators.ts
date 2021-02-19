import * as Joi from "joi";
import { IIndexedUser, IIndexedUserMeta } from "shared/interfaces/user";

export type IAGETAllUsers = IIndexedUserMeta[];


/*******************************/

export const AGETPictureByUserIdSchema = Joi.object({
    userId: Joi.string().required(),
});
export interface IAGETPictureByUserId {
    userId: string;
};
