import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UtilsModule } from '../utils/utils.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './models/courses.model';
import { CourseClass } from './models/course-classes.model';
import { CourseCategory } from './models/course-categories';
import { CourseInstructor } from './models/course-instructors.model';
import { Category } from './models/categories.model';
import { Enrollment } from './models/enrollment.model';
import { User } from '../users/models/users.model';

@Module({
  imports: [
    UtilsModule,
    SequelizeModule.forFeature([
      Course,
      CourseClass,
      CourseCategory,
      CourseInstructor,
      Category,
      Enrollment,
      User,
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
