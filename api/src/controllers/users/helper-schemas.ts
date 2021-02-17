import * as Joi from "joi";

// Base User Schema
export const UserBaseSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    skills: Joi.string().required(),
    picture: Joi.string().required(),
    tg: Joi.string().required(),
})