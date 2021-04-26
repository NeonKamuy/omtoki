import * as Joi from "joi";
import { IIndexedEvent } from "shared/interfaces/event";
import { EventBaseRawSchema } from "src/controllers/events/helper-schemas";

// PUT Edit Event
export const APUTEditEventSchema = Joi.object({ ...EventBaseRawSchema, id: Joi.string().required() });
export type IAPUTEditEvent = IIndexedEvent;

// DELETE Event
export const ADELETEEventSchema = Joi.object({ id: Joi.string().required() });
export interface IADELETEEvent {
    id: string;
}