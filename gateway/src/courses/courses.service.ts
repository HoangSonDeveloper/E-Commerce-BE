import { CourseInstructor } from './../../../services/courses-service/src/course-instructors/models/course-instructors.model';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { ICoursesService } from './courses.interface';
import { CourseDto } from './courses.dto';
import {
  CreateCourseInput,
  EnrollmentInputDto,
} from 'src/common/common.interface';
import { lastValueFrom } from 'rxjs';
import { IUsersService } from 'src/users/users.interface';

@Injectable()
export class CoursesService implements OnModuleInit {
  constructor(
    @Inject('CoursesServiceClient')
    private readonly coursesServiceClient: ClientGrpcProxy,
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
  ) {}

  private coursesService: ICoursesService;
  private usersService: IUsersService;

  onModuleInit(): void {
    this.coursesService =
      this.coursesServiceClient.getService<ICoursesService>('CoursesService');
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  async createCourse(data: CreateCourseInput) {
    const result = await lastValueFrom(
      this.coursesService.create({
        ...data,
      }),
    );

    await lastValueFrom(
      this.coursesService.assignCategories({
        courseId: result.id,
        categories: data.categories,
      }),
    );

    await lastValueFrom(
      this.coursesService.assignInstructors({
        courseId: result.id,
        instructors: data.instructors,
      }),
    );

    const course = JSON.parse(JSON.stringify(result));

    const categories = await this.getCourseCategories(course.id);
    const instructors = await Promise.all(
      data.instructors.map(async (instructor) => {
        const data = JSON.parse(
          JSON.stringify(
            await lastValueFrom(this.usersService.findById({ id: instructor })),
          ),
        );

        delete data.password;
        delete data.updatedAt;

        return data;
      }),
    );

    return {
      result: {
        ...course,
        ...categories,
        instructors,
      },
    };
  }

  async getCourseById(id: string) {
    const course = await lastValueFrom(this.coursesService.findById({ id }));
    const courseCategories = await this.getCourseCategories(id);
    const courseInstructors = await lastValueFrom(
      this.coursesService.getInstructors({ id }),
    );

    const courseInstructorsInfo = await Promise.all(
      courseInstructors.instructors.map(async (instructor) => {
        return await lastValueFrom(
          this.usersService.findById({ id: instructor }),
        );
      }),
    );

    const result = {
      ...course,
      ...courseCategories,
      instructors: courseInstructorsInfo,
    };

    return result;
  }

  async enroll(enrollment: EnrollmentInputDto) {
    const result = await lastValueFrom(this.coursesService.enroll(enrollment));

    return result;
  }

  async getCourseCategories(id: string) {
    const result = await lastValueFrom(
      this.coursesService.getCategories({ id }),
    );

    return result;
  }

  async assignCategories(courseId: string, categories: number[]) {
    const result = await lastValueFrom(
      this.coursesService.assignCategories({ courseId, categories }),
    );

    return result;
  }

  async assignInstructors(courseId: string, instructors: string[]) {
    const result = await lastValueFrom(
      this.coursesService.assignInstructors({ courseId, instructors }),
    );

    return result;
  }

  async showAll(page: number = 1, pageSize: number = 10) {
    const { count } = await lastValueFrom(
      this.coursesService.count({
        where: JSON.stringify({}),
      }),
    );

    let result = await lastValueFrom(
      this.coursesService.showAll({ page, pageSize }),
    );

    if (Object.keys(result).length === 0) {
      return {
        result: [],
      };
    }

    const resultJson: any = JSON.parse(JSON.stringify(result));

    const courses = await Promise.all(
      resultJson.courses.map(async (course) => {
        const courseData = await this.getCourseById(course.id);

        return courseData;
      }),
    );

    return {
      count,
      result: courses,
      next:
        page * pageSize < count
          ? `/courses?page=${++page}&pageSize=${pageSize}`
          : '',
    };
  }
}
