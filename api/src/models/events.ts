import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { EventStatus, IEventBase, IEventSpeaker } from "shared/interfaces/event";
import { getTypegooseOptions } from "./db-config/model-options";

@modelOptions(getTypegooseOptions("events"))
class Event implements IEventBase {
    @prop()
    name: string;

    @prop()
    status: EventStatus;

    @prop()
    preDescription: string;

    @prop()
    postDescription: string;

    @prop()
    date: Date;

    @prop()
    place: string;

    @prop()
    speakers: IEventSpeaker[];

    @prop()
    pictures: string[];
}

const EventModel = getModelForClass(Event);

export type IEventModel = typeof EventModel;
export type IEventInstance = DocumentType<Event>;


export default EventModel;