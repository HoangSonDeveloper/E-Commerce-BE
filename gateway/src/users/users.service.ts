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

  async showAll(page: number = 1, pageSize: number = 10) {
    let result = await lastValueFrom(
      this.usersService.showAll({ page, pageSize }),
    );

    if (Object.keys(result).length === 0) {
      return {
        result: [],
      };
    }

    const resultJson = JSON.parse(JSON.stringify(result));

    let instructors = await Promise.all(
      resultJson.users.map(async (user: any) => {
        const userRole = await lastValueFrom(
          this.usersService.getRole({ id: user.id }),
        );

        if (userRole.roleId === 2) {
          delete user.password;
          user.role = userRole;
          return user;
        }
      }),
    );

    instructors = instructors.filter((instructor) => instructor !== undefined);

    const count = instructors.length;

    return {
      count,
      result: instructors,
      next:
        page * pageSize < count
          ? `/courses?page=${++page}&pageSize=${pageSize}`
          : '',
    };
  }

  async assignRole(userId: string, roleId: number) {
    const userRole = await lastValueFrom(
      this.usersService.assignRole({ userId, roleId }),
    );
    return userRole;
  }
}
