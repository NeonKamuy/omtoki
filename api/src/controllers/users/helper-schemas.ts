import Joi from "joi";

// Base User Schema
export const UserBaseSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
})