import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
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

  async getInstructor(id: string) {
    const userRole = await lastValueFrom(this.usersService.getRole({ id }));
    if (userRole.roleId !== 2) {
      throw new BadRequestException('User is not instructor');
    }
    const user: any = await lastValueFrom(this.usersService.findById({ id }));

    delete user.password;
    user.role = userRole;

    return user;
  }

  async assignRole(userId: string, roleId: number) {
    const userRole = await lastValueFrom(
      this.usersService.assignRole({ userId, roleId }),
    );
    return userRole;
  }
}
