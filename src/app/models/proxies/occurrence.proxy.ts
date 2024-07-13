import { OccurrenceTypeEnum } from '../enums/occurrence-type.enum';
import { UserProxy } from "./user.proxy";
import { BaseProxy } from "./base.proxy";

export interface OccurrenceProxy extends BaseProxy {
  type: OccurrenceTypeEnum;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  userId: number;
  user: UserProxy;
  photoUrl?: string;
}
