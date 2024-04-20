import { OccurrenceTypeEnum } from '../enums/occurrence-type.enum';
import { UserProxy } from './user.proxy';

export interface OccurrenceProxy {
  id: number;
  type: OccurrenceTypeEnum;
  title: string;
  description: string;
  location: string;
  user?: UserProxy;
  photoUrl?: string;
}
