import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { IUsersService } from './users.interface';
// import { QueryUtils } from 'src/utils/query.utils';
import { isEmpty, merge } from 'lodash';
import { IId, IQuery } from 'src/common/common.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    let query: any = {};

    const result = await this.usersService.getUser(query);
    return result;
  }
}
