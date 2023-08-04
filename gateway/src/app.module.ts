import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    // AuthModule,
    UsersModule,
    CoursesModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
