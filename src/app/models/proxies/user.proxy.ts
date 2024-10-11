import { BaseProxy } from "./base.proxy";
import {OccurrenceProxy} from "./occurrence.proxy";
import { RolesEnum } from "../enums/roles.enum";

export interface UserProxy extends BaseProxy {
  name: string;
  email: string;
  city: string;
  occurrences: OccurrenceProxy[];
  roles: RolesEnum[]
  photoUrl?: string;
}

export type UserWithPassword = Partial<UserProxy> & { password: string };

