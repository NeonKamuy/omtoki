import { Injectable } from "@nestjs/common";
import { IEventBase, IEventSpeaker } from "shared/interfaces/event";
import { IADELETEEvent } from "src/controllers/admin/events/validators";
import EventModel from "src/models/events";
import FileService from "./files";

@Injectable()
export default class EventService {
  public constructor(private readonly __FileService: FileService) {}

  private static readonly EventPicturesSubFolder = "event-pictures";
  private static readonly EventSpeakerPicturesSubFolder = "event-speakers";

  public async delete(args: IADELETEEvent) {
    const event = await EventModel.findByIdAndDelete(args.id);
    this.__FileService.deleteMany([
      ...event.pictures.map(
        (e) => `${EventService.EventPicturesSubFolder}/${e}`
      ),
      ...event.speakers.map(
        (e) => `${EventService.EventSpeakerPicturesSubFolder}/${e}`
      ),
    ]);
  }

  public async create(args: IEventBase) {
    const [preparedPictures, preparedSpeakers] = await Promise.all([
      this.preparePictures(args.pictures),
      this.prepareSpeakers(args.speakers),
    ]);

    EventModel.create({
      ...args,
      pictures: preparedPictures,
      speakers: preparedSpeakers,
    });
  }

  private async preparePictures(pictures: string[]): Promise<string[]> {
    const preparedPictures: string[] = [];
    const promises: Promise<any>[] = pictures.map((e) =>
      this.__FileService
        .saveFromBase64(e, EventService.EventPicturesSubFolder)
        .then((res) => preparedPictures.push(res))
    );
    await Promise.all(promises);
    return preparedPictures;
  }

  private async prepareSpeakers(
    speakers: IEventSpeaker[]
  ): Promise<IEventSpeaker[]> {
    const preparedSpeakers: IEventSpeaker[] = [];
    const promises: Promise<any>[] = speakers.map((e) =>
      this.__FileService
        .saveFromBase64(e.picture, EventService.EventSpeakerPicturesSubFolder)
        .then((res) => preparedSpeakers.push({ ...e, picture: res }))
    );
    await Promise.all(promises);
    return preparedSpeakers;
  }
}
