import { isEmpty } from 'lodash';
import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize/types';
import { InjectModel } from '@nestjs/sequelize';

import { IUsersService } from './users.interface';
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
} from '../common/find-and-paginate.interface';

import { User } from './models/users.model';
import {
  AssignRoleDto,
  UserCreateDto,
  UserDto,
  UserRoleDto,
} from './users.dto';
import { UserRole } from './models/user-roles.model';
import { Role } from './models/roles.model';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Role) private readonly roleRepo: typeof Role,
    @InjectModel(UserRole) private readonly userRoleRepo: typeof UserRole,
  ) {}

  async find(
    query?: IFindAndPaginateOptions,
  ): Promise<IFindAndPaginateResult<User>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<User> = await this.userRepo.create({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }

  async findById(id: string): Promise<User> {
    const result: User = await this.userRepo.findByPk(id, {
      raw: true,
    });

    return result;
  }

  async findOne(query: FindOptions): Promise<User> {
    const result: User = await this.userRepo.findOne({
      ...query,
      raw: true,
    });

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    const result: number = await this.userRepo.count(query);

    return result;
  }

  async create(user: UserDto): Promise<User> {
    const result: User = await this.userRepo.create(user as any);

    return result;
  }

  async update(id: string, user: UserCreateDto): Promise<User> {
    const record: User = await this.userRepo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const result: User = await record.update(user);

    return result;
  }

  async destroy(query?: FindOptions): Promise<number> {
    const result: number = await this.userRepo.destroy(query);

    return result;
  }

  async getRole(userId: string): Promise<UserRoleDto> {
    const userRole = await this.userRoleRepo.findByPk(userId);

    const roleName = await this.roleRepo.findByPk(userRole.role_id);

    return {
      userId: userRole.user_id,
      roleId: userRole.role_id,
      roleName: roleName.name,
    };
  }

  async assignRole(data: AssignRoleDto): Promise<UserRoleDto> {
    // check if user exists
    const user = await this.userRoleRepo.findByPk(data.userId);
    if (isEmpty(user)) {
      await this.userRoleRepo.create({
        user_id: data.userId,
        role_id: data.roleId,
      });
    } else {
      await this.userRoleRepo.update(
        { role_id: data.roleId },
        { where: { user_id: data.userId } },
      );
    }

    return this.getRole(data.userId);
  }
}
