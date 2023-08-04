import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { PinoLogger } from 'nestjs-pino';
import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { IUsersService } from '../users/users.interface';
import { User } from 'src/common/common.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, 'jwt')
  implements OnModuleInit
{
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      // issuer: configService.get<string>('JWT_ISSUER'),
      // audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => get(req, 'cookies.x-auth-token'),
      ]),
    });
  }

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }
}
