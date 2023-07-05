export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IUserInfoDTO {
  firstName: string;
  lastName: string;
  avatar: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  phone: string;
}
