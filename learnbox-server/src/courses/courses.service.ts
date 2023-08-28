import { BadRequestException, Injectable } from '@nestjs/common';
import { Course } from './models/courses.model';
import { CourseCategory } from './models/course-categories';
import { InjectModel } from '@nestjs/sequelize';
import { QueryUtils } from '../utils/query.utils';
import { HelperUtils } from '../utils/helper.utils';
import { merge } from 'lodash';
import { Category } from './models/categories.model';
import { Op, Sequelize } from 'sequelize';
import { CourseInstructor } from './models/course-instructors.model';
import { User } from '../users/models/users.model';
import { CourseClass } from './models/course-classes.model';
import { CreateCourseDto, EnrollmentDto } from './courses.dto';
import { Enrollment } from './models/enrollment.model';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private readonly courseRepo: typeof Course,
    @InjectModel(CourseCategory)
    private readonly courseCategoryRepo: typeof CourseCategory,
    @InjectModel(Category)
    private readonly categoryRepo: typeof Category,
    @InjectModel(CourseClass)
    private readonly courseClassRepo: typeof CourseClass,
    @InjectModel(User)
    private readonly userRepo: typeof User,
    @InjectModel(Enrollment)
    private readonly enrollmentRepo: typeof Enrollment,
    @InjectModel(CourseInstructor)
    private readonly courseInstructor: typeof CourseInstructor,
    private readonly queryUtils: QueryUtils,
    private readonly helperUtils: HelperUtils,
  ) {}

  async getCourses(
    page: number,
    pageSize: number,
    filterBy: string,
    orderBy: string,
  ): Promise<any> {
    const query = {
      where: {},
      include: [
        {
          model: Category,
          attributes: [],
          through: {
            attributes: [],
          },
        },
        {
          model: CourseInstructor,
          where: {},
          attributes: [],
        },
      ],
    };

    if (filterBy) {
      const filters = filterBy.split(';');

      filters.forEach((filter) => {
        const [key, value] = filter.split(':');
        if (!key || !value) {
          return;
        }
        if (key === 'category_id') {
          query.include[0].where = {
            id: value,
          };
        }
        if (key === 'instructor_id') {
          query.include[1].where = {
            instructor_id: value,
          };
          filterBy = this.queryUtils.removeFilter(filterBy, filter);
        }
      });
    }

    merge(
      query,
      await this.queryUtils.buildQuery(page, pageSize, filterBy, orderBy),
    );

    const courses = await this.courseRepo.findAll(query);
    const result = await Promise.all(
      courses.map(async (course) => {
        return this.getCourseInfo(course.id);
      }),
    );

    const count = result.length;
    const { next, prev } = await this.helperUtils.getPagination(
      '/users/instructors',
      count,
      page,
      pageSize,
      filterBy,
      orderBy,
    );

    return {
      count,
      next,
      prev,
      result,
    };
  }

  async getAllCategories(): Promise<any> {
    const categories = await this.categoryRepo.findAll();

    return categories;
  }

  async getCourseCategories(id: string): Promise<any> {
    const courseCategories = await this.categoryRepo.findAll({
      raw: true,
      include: [
        {
          model: Course,
          where: {
            id: id,
          },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return courseCategories;
  }

  async getCourseInfo(id: string): Promise<any> {
    const course = await this.courseRepo.findByPk(id, {
      include: [
        {
          model: Category,
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return course;
  }

  async getClasses(courseId: string): Promise<any> {
    const result = await this.courseClassRepo.findAll({
      where: {
        course_id: courseId,
      },
    });

    return {
      result,
    };
  }

  async enrollCourse(payload: EnrollmentDto): Promise<any> {
    const courseClass = await this.courseClassRepo.findByPk(payload.classId);
    if (!courseClass) {
      throw new BadRequestException('Class not found');
    }

    const user = await this.userRepo.findByPk(payload.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (
      courseClass.enrolled >= courseClass.enrollmentLimit &&
      courseClass.enrollmentLimit
    ) {
      throw new BadRequestException('Class is full');
    }

    const now = new Date();
    if (now < courseClass.registrationStart) {
      throw new BadRequestException('Class is yet to open for registration');
    }

    if (now > courseClass.registrationEnd) {
      throw new BadRequestException('Class is closed for registration');
    }

    const enrolled = await this.enrollmentRepo.findOne({
      where: {
        student_id: user.id,
        class_id: courseClass.id,
      },
    });

    if (enrolled) {
      throw new BadRequestException('Already enrolled');
    }

    const enrollment = await this.enrollmentRepo.create({
      studentId: payload.userId,
      classId: payload.classId,
      enrollment_date: now,
      cancelled: false,
    });
    return enrollment;
  }

  async createCourse(payload: CreateCourseDto): Promise<any> {
    const course = await this.courseRepo.create({
      ...payload,
    });

    const categories = payload.categories.map((category) => {
      return {
        courseId: course.id,
        categoryId: category,
      };
    });

    await this.courseCategoryRepo.bulkCreate(categories);

    const instructors = payload.instructors.map((instructor) => {
      return {
        courseId: course.id,
        instructorId: instructor,
      };
    });

    await this.courseInstructor.bulkCreate(instructors);

    return course;
  }
}
