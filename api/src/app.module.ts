import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdminController } from "./controllers/admin";
import AdminEventController from "./controllers/admin/events";
import { AdminUserController } from "./controllers/admin/users";
import EventsController from "./controllers/events";
import { UserController } from "./controllers/users";
import EventModel from "./models/events";
import UserModel from "./models/users";
import EventService from "./services/events";
import FileService from "./services/files";
import UserService from "./services/users";
import TYPES from "./types";
import { AdminAuthGuard } from "./utils/guards/AdminAuthGuard";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../../front/build"),
        }, {
            rootPath: join(__dirname, "../../")
        }),
    ],
    controllers: [
        UserController,
        EventsController,
        AdminController,
        AdminUserController,
        AdminEventController
    ],
    providers: [
        UserService, FileService, EventService,
        { provide: TYPES.Guards.AdminAuth, useClass: AdminAuthGuard },
        { provide: TYPES.Models.User, useValue: UserModel },
        { provide: TYPES.Models.Event, useValue: EventModel },
    ],
})
export class AppModule { }
