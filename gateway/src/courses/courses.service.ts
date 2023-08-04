import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { ICoursesService } from './courses.interface';
import { CourseDto } from './courses.dto';
import {
  CreateCourseInput,
  EnrollmentInputDto,
} from 'src/common/common.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CoursesService implements OnModuleInit {
  constructor(
    @Inject('CoursesServiceClient')
    private readonly coursesServiceClient: ClientGrpcProxy,
  ) {}

  private coursesService: ICoursesService;

  onModuleInit(): void {
    this.coursesService =
      this.coursesServiceClient.getService<ICoursesService>('CoursesService');
  }

  async createCourse(data: CreateCourseInput) {
    const result = await lastValueFrom(
      this.coursesService.create({
        ...data,
      }),
    );

    return result;
  }

  async getCourseById(id: string) {
    const course = await lastValueFrom(this.coursesService.findById({ id }));
    const courseCategories = await this.getCourseCategories(id);

    const result = {
      ...course,
      ...courseCategories,
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

  async showAll(page: number = 1, pageSize: number = 10) {
    const result = await this.coursesService.showAll({ page, pageSize });

    return result;
  }
}
