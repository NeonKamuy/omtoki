import { Controller, Get, Header, Headers, Inject, Post, Res } from "@nestjs/common";
import { IUserBase } from "shared/interfaces/user";
import { wValidatedArg } from "../../utils/decorators/validation";
import { UserBaseSchema } from "./helper-schemas";
import {
    AGETPictureByUserIdSchema,
    IAGETAllUsers,
    IAGETPictureByUserId,
} from "./validators";
import { Response } from "express";
import * as tmp from "tmp";
import * as fs from "fs";
import { base64ToFileBuffer } from "src/utils/base64-to-file-buffer";
import UserService from "src/services/users";

@Controller("/api/users")
export class UserController {
    constructor(private readonly _UserService: UserService) {}

    @Get("/")
    public getAllAccepted(): Promise<IAGETAllUsers> {
        return this._UserService.getAllAccepted();
    }

    @Get("/picture/:userId")
    @Header("Content-Type", "image/*")
    public async getPictureByUserId(
        @wValidatedArg(AGETPictureByUserIdSchema) args: IAGETPictureByUserId,
        @Res() res: Response,
        @Headers() headers: Headers
    ) {
        const {
            picture,
            updatedAt,
        } = await this._UserService.getPictureByUserId(args);
        const lastModified = new Date(updatedAt);
        const ifModifiedSince = headers['if-modified-since'] ? new Date(headers['if-modified-since']) : null;

        if(ifModifiedSince && ifModifiedSince >= lastModified) {
            res.status(304);
            res.end();
        }

        res.header("Last-Modified", lastModified.toUTCString());
        res.header("Cache-Control", "public, max-age=31536000");
        
        const buffer = base64ToFileBuffer(picture);

        tmp.dir({}, (e, tempDir) => {
            const filename = `${tempDir}/${Date.now() + args.userId}`;
            fs.writeFile(filename, buffer, () => {
                res.sendFile(filename);
                res.once("finish", () => {
                    fs.unlink(filename, () => {});
                });
            });
        });
    }

    @Post("/")
    public addUser(
        @wValidatedArg(UserBaseSchema) args: IUserBase
    ): Promise<IAGETAllUsers> {
        return this._UserService.addUser(args);
    }
}
