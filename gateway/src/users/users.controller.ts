import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { IUsersService } from './users.interface';
// import { QueryUtils } from 'src/utils/query.utils';
import { isEmpty, merge } from 'lodash';
import { IId, IQuery } from 'src/common/common.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { AssignRoleDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id/taught-profile-courses')
  async getInstructorInfo(@Param('id') id: string) {
    const result = await this.usersService.getInstructor(id);
    return result;
  }

  @Get('/instructors')
  async getCourses(@Query() query: any) {
    const { page, pageSize } = query;
    const result = await this.usersService.showAll(page, pageSize);
    return result;
  }

  @Post('/assign-role')
  async assignRole(@Body() body: AssignRoleDto) {
    const result = await this.usersService.assignRole(body.userId, body.roleId);
    return result;
  }
}
