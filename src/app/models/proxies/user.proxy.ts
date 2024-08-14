import { BaseProxy } from "./base.proxy";
import {OccurrenceProxy} from "./occurrence.proxy";

export interface UserProxy extends BaseProxy {
  name: string;
  email: string;
  city: string;
  occurrences: OccurrenceProxy[];
  photoUrl?: string;
}

export type UserWithPassword = Partial<UserProxy> & { password: string };

