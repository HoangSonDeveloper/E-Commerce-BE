import { isEmpty } from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { InjectModel } from '@nestjs/sequelize';

import { ICoursesService } from './courses.interface';

import { Course } from './models/courses.model';
import { CourseCategoriesDto, CourseDto } from './courses.dto';
import { Category } from './models/categories.model';
import { CourseCategory } from './models/course-categories';
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
} from '../common/find-and-paginate.interface';

@Injectable()
export class CoursesService implements ICoursesService {
  constructor(
    @InjectModel(Course) private readonly courseRepo: typeof Course,
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
    @InjectModel(CourseCategory)
    private readonly courseCategoryRepo: typeof CourseCategory,
  ) {}

  async showAll(page: number, pageSize: number): Promise<Course[]> {
    const courses = await this.courseRepo.findAll({
      limit: pageSize ? pageSize : undefined,
      offset: page ? (page - 1) * pageSize : undefined,
      raw: true,
    });

    return courses;
  }

  async findById(id: string): Promise<Course> {
    const result: Course = await this.courseRepo.findByPk(id, {
      raw: true,
    });

    return result;
  }

  async findOne(query: FindOptions): Promise<Course> {
    const result: Course = await this.courseRepo.findOne({
      ...query,
      raw: true,
    });

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    const result: number = await this.courseRepo.count(query);

    return result;
  }

  async create(course: CourseDto): Promise<Course> {
    const result: Course = await this.courseRepo.create(course as any);

    return result;
  }

  async update(id: string, user: CourseDto): Promise<Course> {
    const record: Course = await this.courseRepo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const result: Course = await record.update(user);

    return result;
  }

  async destroy(query?: FindOptions): Promise<number> {
    const result: number = await this.courseRepo.destroy(query);

    return result;
  }

  async getCategories(courseId: string): Promise<CourseCategoriesDto> {
    const courseCategories = await this.courseCategoryRepo.findAll({
      where: { courseId },
    });

    const categories = await Promise.all(
      courseCategories.map(async (courseCategory) => {
        const category = await this.categoryRepo.findByPk(
          courseCategory.categoryId,
        );

        return category.name;
      }),
    );

    return {
      categories,
    };
  }
}
