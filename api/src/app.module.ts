import { Module } from '@nestjs/common';
import { UserController } from './controllers/users';
import UserModel from './models/users';
import UserService from './services';
import TYPES from './types';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, { provide: TYPES.Models.User, useValue: UserModel }],
})
export class AppModule { }