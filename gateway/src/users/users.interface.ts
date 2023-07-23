import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

import { IId, IQuery, ICount } from '../common/common.interface';
import { User, UsersConnection } from '../common/common.interface';
import { UserDto } from './users.dto';

interface UpdateUserInput {
  id: string;
  data: UserDto;
}

export interface IUsersService {
  find(query: IQuery, metadata?: Metadata): Observable<UsersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: UserDto, metadata?: Metadata): Observable<User>;
  update(input: UpdateUserInput): Observable<User>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
