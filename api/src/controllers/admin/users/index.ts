import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { wValidatedArg } from "src/utils/decorators/validation";
import { IAGETAllUsers } from "src/controllers/users/validators";
import { AAcceptPendingUserSchema, ADeclinePendingUserSchema, AGETPendingUsersSchema, IAAcceptPendingUser, IADeclinePendingUser, IAGETPendingUsers, IRGETPendingUsers } from "./validators";
import { AdminAuthGuard } from "src/utils/guards/AdminAuthGuard";
import UserService from "src/services/users";

@Controller("/api/admin/users")
export class AdminUserController {
    constructor(private readonly _UserService: UserService) {}

    @Get("/pending/get")
    @UseGuards(AdminAuthGuard)
    public getPending(
        @wValidatedArg(AGETPendingUsersSchema) args: IAGETPendingUsers
    ): Promise<IRGETPendingUsers> {
        return this._UserService.getPending(args.page, args.perPage);
    }

    @Get("/pending/accept")
    @UseGuards(AdminAuthGuard)
    public acceptUser(
        @wValidatedArg(AAcceptPendingUserSchema) args: IAAcceptPendingUser
    ): Promise<void> {
        return this._UserService.acceptPending(args);
    }

    @Get("/pending/decline")
    @UseGuards(AdminAuthGuard)
    public declineUser(
        @wValidatedArg(ADeclinePendingUserSchema) args: IADeclinePendingUser
    ): Promise<void> {
        return this._UserService.declinePending(args);
    }
}
