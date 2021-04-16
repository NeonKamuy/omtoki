import { Controller, Get, UseGuards } from "@nestjs/common";
import { wValidatedArg } from "../decorators/validation";
import { AdminAuthGuard } from "../guards/AdminAuthGuard";

@Controller("/api/admin/main")
export class AdminController {
    @Get("/login")
    @UseGuards(AdminAuthGuard)
    public login(): boolean {
        return true;
        // Status 200 if login successful, 403 otherwise
    }
}
