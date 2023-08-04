import { Module } from '@nestjs/common';
import { join } from 'path';
import {
  ClientProxyFactory,
  Transport,
  ClientGrpcProxy,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersServiceClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: '127.0.0.1:8002',
            package: 'user',
            protoPath: join(__dirname, '../proto/user.proto'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['UsersServiceClient'],
})
export class UsersModule {}
