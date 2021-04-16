import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdminController } from "./controllers/admin";
import { AdminUserController } from "./controllers/admin/users";
import { AdminAuthGuard } from "./controllers/guards/AdminAuthGuard";
import { UserController } from "./controllers/users";
import UserModel from "./models/users";
import UserService from "./services";
import TYPES from "./types";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../../front/build"),
        }),
    ],
    controllers: [UserController, AdminUserController, AdminController],
    providers: [
        UserService,
        { provide: TYPES.Guards.AdminAuth, useClass: AdminAuthGuard },
        { provide: TYPES.Models.User, useValue: UserModel },
    ],
})
export class AppModule {}
