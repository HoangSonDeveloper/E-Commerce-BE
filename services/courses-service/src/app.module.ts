import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Course } from './courses/models/courses.model';
import * as fs from 'fs';
import { Category } from './courses/models/categories.model';
import { CourseCategory } from './courses/models/course-categories';
import { Enrollment } from './enrollment/models/enrollment.model';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CourseInstructor } from './course-instructors/models/course-instructors.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // typeValidation: true,
        // benchmark: true,
        // native: true,
        // autoLoadModels: true,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        synchronize: configService.get<boolean>('DB_SYNC'),
        models: [
          Course,
          Category,
          CourseCategory,
          Enrollment,
          CourseInstructor,
        ],
        // define: {
        //   timestamps: true,
        //   underscored: false,
        //   version: false,
        //   // schema: configService.get<string>('DB_SCHEMA'),
        // },
      }),
      inject: [ConfigService],
    }),
    CoursesModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
