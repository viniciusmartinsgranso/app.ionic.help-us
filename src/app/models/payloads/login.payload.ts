import { UserProxy } from '../proxies/user.proxy';

export interface LoginPayload extends Partial<UserProxy> {
  email: string;
  password: string;
}
