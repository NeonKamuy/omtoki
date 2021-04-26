import { Controller, Delete, Post, Put } from "@nestjs/common";
import { IEventBase } from "shared/interfaces/event";
import { EventBaseSchema } from "src/controllers/events/helper-schemas";
import EventModel from "src/models/events";
import EventService from "src/services/events";
import { wValidatedArg } from "src/utils/decorators/validation";
import { ADELETEEventSchema, APUTEditEventSchema, IADELETEEvent, IAPUTEditEvent } from "./validators";

@Controller("/api/admin/events")
export default class AdminEventController {
    public constructor(private readonly __EventService: EventService) {
    }

    @Post("/")
    public async create(
        @wValidatedArg(EventBaseSchema) args: IEventBase
    ) {
        await this.__EventService.create(args);
    }

    @Put("/:id")
    public edit(
        @wValidatedArg(APUTEditEventSchema) args: IAPUTEditEvent
    ) { }

    @Delete("/:id")
    public delete(
        @wValidatedArg(ADELETEEventSchema) args: IADELETEEvent
    ) { }
}