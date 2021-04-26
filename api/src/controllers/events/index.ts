import { Controller, Get } from "@nestjs/common";

@Controller("/api/events")
export default class EventsController {
    @Get("/")
    public getEvents() {
    }
}