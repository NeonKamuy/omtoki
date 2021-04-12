import { Controller, Get, Header, Inject, Post, Res } from "@nestjs/common";
import { IUserBase } from "shared/interfaces/user";
import UserService from "src/services";
import TYPES from "src/types";
import { wValidatedArg } from "../decorators/validation";
import { UserBaseSchema } from "./helper-schemas";
import {
    AGETPictureByUserIdSchema,
    IAGETAllUsers,
    IAGETPictureByUserId,
} from "./validators";
import { Response } from "express";
import * as tmp from "tmp";
import * as fs from "fs";

@Controller("/api/users")
export class UserController {
    constructor(private readonly _UserService: UserService) {}

    @Get("/")
    public getAll(): Promise<IAGETAllUsers> {
        return this._UserService.getAll();
    }

    @Get("/picture/:userId")
    @Header("Content-Type", "image/*")
    public async getPictureByUserId(
        @wValidatedArg(AGETPictureByUserIdSchema) args: IAGETPictureByUserId,
        @Res() res: Response
    ) {
        const {
            picture,
            updatedAt,
        } = await this._UserService.getPictureByUserId(args);

        res.header("Last-Modified", new Date(updatedAt).toUTCString());
        const buffer = Buffer.from(
            picture.replace(/^data:image\/[a-z]+;base64,/, ""),
            "base64"
        );

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
