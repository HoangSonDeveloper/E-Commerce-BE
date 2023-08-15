import { Course } from './models/courses.model';
import { FindOptions } from 'sequelize/types';
import { CourseCategoriesDto, CourseDto } from './courses.dto';
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
} from 'src/common/find-and-paginate.interface';

export interface ICoursesService {
  showAll(page: number, pageSize: number): Promise<Course[]>;
  findById(id: string): Promise<Course>;
  findOne(query?: FindOptions): Promise<Course>;
  count(query?: FindOptions): Promise<number>;
  countCourseCategories(query?: FindOptions): Promise<number>;
  create(comment: CourseDto): Promise<Course>;
  update(id: string, comment: CourseDto): Promise<Course>;
  destroy(query?: FindOptions): Promise<number>;
  getCategories(courseId: string): Promise<CourseCategoriesDto>;
  assignCategories(courseId: string, categories: number[]): Promise<any>;
  getInstructors(courseId: string): Promise<any>;
  assignInstructors(courseId: string, instructors: string[]): Promise<any>;
}
