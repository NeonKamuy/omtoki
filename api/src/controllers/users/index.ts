import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { IIndexedUser, IIndexedUserMeta, IUserBase } from 'shared/interfaces/user';
import UserService from 'src/services';
import TYPES from 'src/types';
import { wValidatedArg } from '../decorators/validation';
import { UserBaseSchema } from './helper-schemas';
import { AGETPictureByUserIdSchema, IAGETAllUsers, IAGETPictureByUserId } from './validators';
import {Response} from "express";
import fs from "fs";

@Controller("/api/users")
export class UserController {
  constructor(
    private readonly _UserService: UserService
  ) {}

  @Get("/")
  public getAll(): Promise<IAGETAllUsers> {
    return this._UserService.getAll();
  }

 
  @Get("/picture/:userId")
  public async getPictureByUserId(
    @wValidatedArg(AGETPictureByUserIdSchema) args: IAGETPictureByUserId,
    @Res() res: Response
  ) {
    const picture = await this._UserService.getPictureByUserId(args);
    const buffer = Buffer.from(picture, "base64");
    const stream = fs.createReadStream(buffer);
    stream.pipe(res);
  }

  @Post("/")
  public addUser(
    @wValidatedArg(UserBaseSchema) args: IUserBase
  ): Promise<IAGETAllUsers> {
    return this._UserService.addUser(args);
  }
}
