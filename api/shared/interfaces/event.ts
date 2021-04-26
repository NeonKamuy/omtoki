import { ToIndexed } from "./utils";

// Event Speaker
export interface IEventSpeaker {
    title: string;
    description: string;
    picture: string;
}

// Event Status
export enum EventStatus {
    expected = "expected",
    passed = "passed"
}
export const EventStatuses = Object.values(EventStatus);

// Event
export interface IEventBase {
    name: string;
    status: EventStatus;
    preDescription: string;
    postDescription: string;
    date: Date;
    place: string;
    speakers: IEventSpeaker[];
    pictures: string[];
}

export type IIndexedEvent = ToIndexed<IEventBase>;