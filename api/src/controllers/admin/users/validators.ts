import * as Joi from "joi";
import { IPagination } from "shared/interfaces/pagination";
import { AUserIdRawSchema, IAGETAllUsers, IAUserId } from "src/controllers/users/validators";

// GET Pending Users
export const AGETPendingUsersSchema = Joi.object({
    page: Joi.number().integer(),
    perPage: Joi.number().integer(),
});
export type IAGETPendingUsers = Partial<IPagination>;

export interface IRGETPendingUsers {
    pendingUsers: IAGETAllUsers;
    pageCount: number;
}

// Accept Pending User
export const AAcceptPendingUserSchema = Joi.object(AUserIdRawSchema);
export type IAAcceptPendingUser = IAUserId;

// Decline Pending User
export const ADeclinePendingUserSchema = Joi.object(AUserIdRawSchema);
export type IADeclinePendingUser = IAUserId;
