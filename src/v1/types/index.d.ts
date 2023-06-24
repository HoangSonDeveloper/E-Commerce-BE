export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface IUserAuth extends IUser {
  generateAuthToken(): string;
  hashPassword(): Promise<string>;
  comparePassword(): Promise<boolean>;
}
