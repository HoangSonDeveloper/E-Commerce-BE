import { FindOptions } from 'sequelize/types';

import { User } from './models/users.model';
import { AssignRoleDto, UserDto, UserRoleDto } from './users.dto';
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
} from '../common/find-and-paginate.interface';
import { UserRole } from './models/user-roles.model';

export interface IUsersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<User>>;
  findById(id: string): Promise<User>;
  findOne(query?: FindOptions): Promise<User>;
  count(query?: FindOptions): Promise<number>;
  create(comment: UserDto): Promise<User>;
  update(id: string, comment: UserDto): Promise<User>;
  destroy(query?: FindOptions): Promise<number>;
  getRole(userId: string): Promise<UserRoleDto>;
  assignRole(comment: AssignRoleDto): Promise<UserRoleDto>;
}
