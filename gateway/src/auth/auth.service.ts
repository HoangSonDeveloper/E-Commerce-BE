import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IId,
  LoginUserInput,
  ROLES,
  User,
  UserRole,
} from '../common/common.interface';
import { SignupUserInput } from '../common/common.interface';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { IUsersService } from '../users/users.interface';
import { PasswordUtils } from '../utils/password.utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
    private readonly jwtService: JwtService,
  ) {}

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  async register(data: SignupUserInput): Promise<any> {
    const { count } = await lastValueFrom(
      this.usersService.count({
        where: JSON.stringify({ email: data.email }),
      }),
    );

    if (count > 0) throw new BadRequestException('Email already exists');

    const user: User = await lastValueFrom(
      this.usersService.create({
        ...data,
        password: await this.passwordUtils.hash(data.password),
      }),
    );

    const result = JSON.parse(JSON.stringify(user));

    const userRole: UserRole = await lastValueFrom(
      this.usersService.assignRole({
        userId: user['id'],
        roleId: ROLES.STUDENT,
      }),
    );

    delete result.password;
    result.role = userRole;

    return result;
  }

  async login(data: LoginUserInput): Promise<any> {
    const user: any = await lastValueFrom(
      this.usersService.findOne({
        where: JSON.stringify({ email: data.email }),
      }),
    );

    if (!user.email)
      throw new UnauthorizedException('Username or password is invalid');

    const isMatch = await this.passwordUtils.compare(
      data.password,
      user.password,
    );

    if (!isMatch)
      throw new UnauthorizedException('Username or password is invalid');

    const userRole: UserRole = await lastValueFrom(
      this.usersService.getRole({ id: user['id'] }),
    );

    delete user.password;
    user.role = userRole;

    return user;
  }

  async generateToken(user: User): Promise<any> {
    const payload = {
      sub: user['_id'],
      email: user.email,
    };

    return await this.jwtService.signAsync(payload, { expiresIn: '60d' });
  }
}
