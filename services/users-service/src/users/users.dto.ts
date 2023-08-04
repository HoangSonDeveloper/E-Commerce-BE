export class UserCreateDto {
  readonly id?: string;
  readonly email?: string;
  readonly password?: string;
}

export class AssignRoleDto {
  readonly userId?: string;
  readonly roleId?: number;
}

export class UserDto {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly isVerified: boolean;
  readonly biography?: string;
  readonly birthday?: string;
  readonly name?: string;
  readonly avatar?: string;
  readonly phone?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export class UserRoleDto {
  readonly userId: string;
  readonly roleId: number;
  readonly roleName: string;
}
