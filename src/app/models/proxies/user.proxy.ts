import { BaseProxy } from "./base.proxy";

export interface UserProxy extends BaseProxy {
  name: string;
  email: string;
  city: string;
  photoUrl?: string;
}

export type UserWithPassword = Partial<UserProxy> & { password: string };

