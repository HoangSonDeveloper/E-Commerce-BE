import { Static, Type } from "@sinclair/typebox";

export const createAccountSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export type CreateAccountDTO = Static<typeof createAccountSchema>;

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
