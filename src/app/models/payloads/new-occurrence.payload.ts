import { OccurrenceTypeEnum } from '../enums/occurrence-type.enum';
import { UserProxy } from '../proxies/user.proxy';

export interface NewOccurrencePayload {
  id: number;
  title: string;
  description: string;
  location: string;
  type: OccurrenceTypeEnum;
  photoUrl?: string;
  user?: UserProxy;
}
