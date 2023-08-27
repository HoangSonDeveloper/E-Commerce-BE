import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UserRole } from './users/models/user-roles.model';
import { Role } from './users/models/roles.model';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/models/courses.model';
import { CourseCategory } from './courses/models/course-categories';
import { Category } from './courses/models/categories.model';
import { CourseInstructor } from './courses/models/course-instructors.model';
import { CourseClass } from './courses/models/course-classes.model';
import { Enrollment } from './courses/models/enrollment.model';

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
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        synchronize: configService.get<boolean>('DB_SYNC'),
        models: [
          User,
          UserRole,
          Role,
          Course,
          CourseCategory,
          Category,
          CourseClass,
          CourseInstructor,
          Enrollment,
        ],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
  ],
})
export class AppModule {}
