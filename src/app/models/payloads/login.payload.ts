import { UserProxy } from '../proxies/user.proxy';

export interface LoginPayload extends UserProxy {
  email: string;
  password: string;
}
