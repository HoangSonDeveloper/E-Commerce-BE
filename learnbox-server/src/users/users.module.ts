import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UserRole } from './models/user-roles.model';
import { UtilsModule } from '../utils/utils.module';
import { CoursesModule } from '../courses/courses.module';
import { Course } from '../courses/models/courses.model';
import { CourseInstructor } from '../courses/models/course-instructors.model';
import { Category } from '../courses/models/categories.model';

@Module({
  imports: [
    UtilsModule,
    SequelizeModule.forFeature([
      User,
      Role,
      UserRole,
      Course,
      CourseInstructor,
      Category,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
