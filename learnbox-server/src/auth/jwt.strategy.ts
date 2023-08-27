import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userRepo: typeof User,
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

  async validate(payload: any): Promise<User> {
    const user = this.userRepo.findOne({
      where: { id: payload.sub },
    });

    if (!user) throw new Error('User not found');

    return user;
  }
}
