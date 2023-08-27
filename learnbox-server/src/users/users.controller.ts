import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { merge, get } from 'lodash';
import { QueryUtils } from '../utils/query.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id/taught-profile-courses')
  async getInstructor(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('filterBy') filterBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    return this.usersService.getInstructor(
      id,
      page,
      pageSize,
      filterBy,
      orderBy,
    );
  }

  @Get(':id/info')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get('instructors')
  async getInstructors(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('filterBy') filterBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    return this.usersService.getInstructors(page, pageSize, filterBy, orderBy);
  }
}
