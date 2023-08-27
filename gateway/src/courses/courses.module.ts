import { Module } from '@nestjs/common';
import { join } from 'path';
import {
  ClientProxyFactory,
  Transport,
  ClientGrpcProxy,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [ConfigModule],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    {
      provide: 'CoursesServiceClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: '127.0.0.1:8001',
            package: 'course',
            protoPath: join(__dirname, '../proto/course.proto'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['CoursesServiceClient'],
})
export class CoursesModule {}
