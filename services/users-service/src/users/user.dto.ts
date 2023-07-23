export class UserDto {
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly password_hashed?: string;
  readonly updatedAt?: string;
}
export class UserCreateDto {
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly password_hashed?: string;
}
