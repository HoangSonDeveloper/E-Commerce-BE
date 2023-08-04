export class UserDto {
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface AssignRoleDto {
  readonly userId?: string;
  readonly roleId?: number;
}

export interface SignupUserDTO {
  name: string;
  email: string;
  password_hashed: string;
}
