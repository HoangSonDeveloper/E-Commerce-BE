import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { merge, get } from 'lodash';
import { QueryUtils } from '../utils/query.utils';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCourseDto, EnrollmentDto } from './courses.dto';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('filterBy') filterBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    return this.coursesService.getCourses(page, pageSize, filterBy, orderBy);
  }

  @Post('create')
  async createCourse(@Body() body: CreateCourseDto) {
    return this.coursesService.createCourse(body);
  }
  @Get('categories')
  async getAllCategories() {
    return this.coursesService.getAllCategories();
  }

  @Get('classes')
  async getCourseClasses(@Query('course_id') courseId: string) {
    return this.coursesService.getClasses(courseId);
  }

  @Get(':id/course-info')
  async getCourseInfo(@Param('id') id: string) {
    const course = await this.coursesService.getCourseInfo(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  @UseGuards(JwtAuthGuard)
  @Post('enroll')
  async enrollCourse(@Body() body: EnrollmentDto) {
    return this.coursesService.enrollCourse(body);
  }
}
