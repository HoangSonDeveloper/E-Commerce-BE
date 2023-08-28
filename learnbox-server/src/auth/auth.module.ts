import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PasswordUtils } from '../utils/password.utils';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { UtilsModule } from '../utils/utils.module';
import { UserRole } from '../users/models/user-roles.model';
import { Role } from '../users/models/roles.model';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, UserRole, Role]),
    UtilsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordUtils, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}