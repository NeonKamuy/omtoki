import * as Joi from "joi";
import { AUserIdRawSchema, IAUserId } from "src/controllers/users/validators";

// GET Pending Users
export const AGETPendingUsersSchema = Joi.object({
    page: Joi.number().integer(),
    perPage: Joi.number().integer()
})
export type IAGETPendingUsers = Partial<IPagination>;

// Accept Pending User
export const AAcceptPendingUserSchema = Joi.object(AUserIdRawSchema);
export type IAAcceptPendingUser = IAUserId;

// Decline Pending User
export const ADeclinePendingUserSchema = Joi.object(AUserIdRawSchema);
export type IADeclinePendingUser = IAUserId;