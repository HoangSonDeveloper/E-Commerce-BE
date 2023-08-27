import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/courses.model';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Category } from './models/categories.model';
import { CourseCategory } from './models/course-categories';

@Module({
  imports: [SequelizeModule.forFeature([Course, Category, CourseCategory])],
  controllers: [CoursesController],
  providers: [{ provide: 'CoursesService', useClass: CoursesService }],
})
export class CoursesModule {}
