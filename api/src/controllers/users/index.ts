import { Controller, Get, Inject, Post } from '@nestjs/common';
import { IIndexedUser, IIndexedUserMeta, IUserBase } from 'shared/interfaces/user';
import UserService from 'src/services';
import TYPES from 'src/types';
import { wValidatedArg } from '../decorators/validation';
import { UserBaseSchema } from './helper-schemas';
import { AGETPictureByUserIdSchema, IAGETAllUsers, IAGETPictureByUserId } from './validators';

@Controller("/api/users")
export class UserController {
  constructor(
    private readonly _UserService: UserService
  ) {}

  @Get("/")
  public getAll(): Promise<IAGETAllUsers> {
    return this._UserService.getAll();
  }

  @Get("/picture/:user_id")
  public getPictureByUserId(
    @wValidatedArg(AGETPictureByUserIdSchema) args: IAGETPictureByUserId
  ): Promise<string> {
    return this._UserService.getPictureByUserId(args);
  }

  @Post("/")
  public addUser(
    @wValidatedArg(UserBaseSchema) args: IUserBase
  ): Promise<IAGETAllUsers> {
    return this._UserService.addUser(args);
  }
}
