import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthCommands,
  DecodeTokenDto,
  DecodeTokenResDto,
} from 'src/dto/auth.dto';
import { Services } from 'src/services/types';
import { MetadataKeys } from '../type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(Services.Auth) private readonly authServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      MetadataKeys.Secured,
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpException(
        {
          message: 'Is not a Bearer token',
        },
        401,
      );
    }

    const validateAccessDto: DecodeTokenDto = {
      token: token,
    };
    const userTokenInfo: DecodeTokenResDto = await firstValueFrom(
      this.authServiceClient.send(
        { cmd: AuthCommands.DecodeToken },
        validateAccessDto,
      ),
    );

    if (userTokenInfo.error !== null) {
      throw new HttpException(
        {
          message: userTokenInfo.error,
        },
        401,
      );
    }

    request.user = userTokenInfo.data;

    return true;
  }
}
