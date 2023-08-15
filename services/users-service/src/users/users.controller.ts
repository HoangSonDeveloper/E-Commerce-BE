import Aigle from 'aigle';

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';

import { ICount, IQuery } from '../common/common.interface';
import { IUsersService } from './users.interface';
import { IFindPayload } from '../common/cursor-pagination.interface';

import { User } from './models/users.model';
import {
  AssignRoleDto,
  UserCreateDto,
  UserDto,
  UserRoleDto,
} from './users.dto';
import { UserRole } from './models/user-roles.model';

const { map } = Aigle;

@Controller()
export class UsersController {
  constructor(
    @Inject('UsersService') private readonly service: IUsersService,
  ) {}

  @GrpcMethod('UsersService', 'find')
  async find(query: IQuery): Promise<IFindPayload<User>> {
    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select)
        ? ['id'].concat(query.select)
        : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<User> = {
      edges: await map(results, async (comment: User) => ({
        node: comment,
        cursor: Buffer.from(JSON.stringify([comment.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    return result;
  }

  @GrpcMethod('UsersService', 'findById')
  async findById({ id }): Promise<User> {
    const result: User = await this.service.findById(id);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod('UsersService', 'findOne')
  async findOne(query: IQuery): Promise<User> {
    const result: User = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) return new User();

    return result;
  }

  @GrpcMethod('UsersService', 'count')
  async count(query: IQuery): Promise<ICount> {
    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod('UsersService', 'create')
  async create(data: UserDto): Promise<User> {
    const result = await this.service.create(data);

    return result;
  }

  @GrpcMethod('UsersService', 'update')
  async update({ id, data }): Promise<User> {
    const result: User = await this.service.update(id, data);

    return result;
  }

  @GrpcMethod('UsersService', 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod('UsersService', 'getRole')
  async getRole({ id }): Promise<UserRoleDto> {
    const userRole = await this.service.getRole(id);

    if (isEmpty(userRole)) throw new Error('Record not found.');

    return userRole;
  }

  @GrpcMethod('UsersService', 'assignRole')
  async assignRole(data: any): Promise<UserRoleDto> {
    const result = await this.service.assignRole(data);

    return result;
  }
}
