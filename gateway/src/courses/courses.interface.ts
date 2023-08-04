import { Enrollment } from './../../../services/courses-service/src/enrollment/models/enrollment.model';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

import {
  IId,
  IQuery,
  ICount,
  UserRole,
  EnrollmentInputDto,
} from '../common/common.interface';
import { Course, UsersConnection } from '../common/common.interface';
import { CourseCategoriesDto, CourseDto } from './courses.dto';

interface UpdateCourseInput {
  id: string;
  data: CourseDto;
}

export interface ICoursesService {
  showAll(paginateOptions: any): Promise<Course[]>;
  findById(id: IId, metadata?: Metadata): Observable<Course>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Course>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: CourseDto, metadata?: Metadata): Observable<Course>;
  update(input: UpdateCourseInput): Observable<Course>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
  enroll(
    course: EnrollmentInputDto,
    metadata?: Metadata,
  ): Observable<Enrollment>;
  getCategories(id: IId): Observable<CourseCategoriesDto>;
}
