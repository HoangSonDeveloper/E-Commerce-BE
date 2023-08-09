import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { ICount, IQuery } from '../common/common.interface';
import { CourseCategoriesDto, CourseDto } from './courses.dto';
import { ICoursesService } from './courses.interface';
import { Course } from './models/courses.model';

@Controller()
export class CoursesController {
  constructor(
    @Inject('CoursesService') private readonly service: ICoursesService,
  ) {}

  @GrpcMethod('CoursesService', 'showAll')
  async showAll({ page, pageSize }) {
    console.log('page', page, 'pageSize', pageSize);
    const courses = await this.service.showAll(page, pageSize);

    return {
      courses,
    };
  }

  @GrpcMethod('CoursesService', 'findById')
  async findById({ id }): Promise<Course> {
    const result: Course = await this.service.findById(id);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod('CoursesService', 'findOne')
  async findOne(query: IQuery): Promise<Course> {
    const result: Course = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod('CoursesService', 'count')
  async count(query: IQuery): Promise<ICount> {
    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod('CoursesService', 'create')
  async create(data: CourseDto): Promise<Course> {
    const result = await this.service.create(data);

    return result;
  }

  @GrpcMethod('CoursesService', 'update')
  async update({ id, data }): Promise<Course> {
    const result: Course = await this.service.update(id, data);

    return result;
  }

  @GrpcMethod('CoursesService', 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod('CoursesService', 'getCategories')
  async getCategories({ id }): Promise<CourseCategoriesDto> {
    const result = await this.service.getCategories(id);

    return result;
  }
}
