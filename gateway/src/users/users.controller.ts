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
import { IId } from 'src/common/common.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy, // private readonly queryUtils: QueryUtils,
  ) {}
  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }
}
