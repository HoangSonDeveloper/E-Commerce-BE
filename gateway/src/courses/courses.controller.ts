import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCourseInput,
  EnrollmentInputDto,
  SignupUserInput,
} from '../common/common.interface';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async getCourses(@Query() query: any) {
    const { page, pageSize } = query;
    const result = await this.coursesService.showAll(page, pageSize);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createCourse(@Body() body: CreateCourseInput) {
    const course = await this.coursesService.createCourse(body);
    return course;
  }

  @Get('/categories')
  async getAllCategories() {
    const result = await this.coursesService.getAllCategories();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/enroll')
  async enroll(@Body() body: EnrollmentInputDto) {
    const result = await this.coursesService.enroll(body);
    return result;
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    const result = await this.coursesService.getCourseById(id);
    return result;
  }
}
