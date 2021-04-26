import * as Joi from "joi";
import { EventStatuses } from "shared/interfaces/event";

// Event Speaker Schema
export const EventSpeakerRawSchema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.string().required(),
};

export const EventSpeakerSchema = Joi.object(EventSpeakerRawSchema);

// Base Event Schema
export const EventBaseRawSchema = {
    name: Joi.string().required(),
    status: Joi.string().valid(...EventStatuses).required(),
    preDescription: Joi.string().default("").required(),
    postDescription: Joi.string().default("").required(),
    date: Joi.date().required(),
    place: Joi.string().required(),
    speakers: Joi.array().items(EventSpeakerSchema).required(),
    pictures: Joi.array().items(Joi.string()).required(),
};

export const EventBaseSchema = Joi.object(EventBaseRawSchema);