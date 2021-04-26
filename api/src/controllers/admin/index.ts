import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminAuthGuard } from "src/utils/guards/AdminAuthGuard";
import { wValidatedArg } from "../../utils/decorators/validation";

@Controller("/api/admin/main")
export class AdminController {
    @Get("/login")
    @UseGuards(AdminAuthGuard)
    public login(): boolean {
        return true;
        // Status 200 if login successful, 403 otherwise
    }
}
