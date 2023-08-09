import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { IUsersService } from './users.interface';
import { lastValueFrom } from 'rxjs';
import { IId } from 'src/common/common.interface';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
  ) {}

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  async getUser(query: any) {
    console.log('query', query);
    const user: any = await lastValueFrom(
      this.usersService.findOne({
        where: query,
      }),
    );

    console.log('user', user);

    const userRole = await lastValueFrom(
      this.usersService.getRole({ id: user.id }),
    );

    delete user.password;
    user.role = userRole;

    return user;
  }

  async getUserById(id: string) {
    const user: any = await lastValueFrom(this.usersService.findById({ id }));

    return user;
  }
}
