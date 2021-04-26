import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getRequestArgsObject } from '../decorators/validation';
const sha512 = require('js-sha512');

@Injectable()
export class AdminAuthGuard implements CanActivate {
  protected static readonly adminAccessToken = "Nanatoki28";

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const object = getRequestArgsObject(request);

    if(object?.accessToken !== sha512(AdminAuthGuard.adminAccessToken)){
      return false;
    }
    return true;
  }
}