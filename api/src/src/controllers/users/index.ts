import { Controller, Get, Inject, Post } from '@nestjs/common';
import { IIndexedUser, IUserBase } from 'shared/interfaces/user';
import UserService from 'src/services';
import TYPES from 'src/types';
import { wValidatedArg } from '../decorators/validation';
import { UserBaseSchema } from './helper-schemas';

@Controller("/api/users")
export class UserController {
  constructor(
    private readonly _UserService: UserService
  ) {}

  @Get("/")
  public getAll(): Promise<IIndexedUser[]> {
    return this._UserService.getAll();
  }

  @Post("/")
  public addUser(
    @wValidatedArg(UserBaseSchema) args: IUserBase
  ): Promise<IIndexedUser[]> {
    return this._UserService.addUser(args);
  }
}
