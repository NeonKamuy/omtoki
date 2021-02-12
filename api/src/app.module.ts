import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserController } from './controllers/users';
import UserModel from './models/users';
import UserService from './services';
import TYPES from './types';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../front/build'),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, { provide: TYPES.Models.User, useValue: UserModel }],
})
export class AppModule { }