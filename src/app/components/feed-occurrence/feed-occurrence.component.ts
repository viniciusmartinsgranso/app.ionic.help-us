import { Component, Input } from '@angular/core';
import { OccurrenceTypeEnum, occurrenceTypeWhiteImage } from '../../models/enums/occurrence-type.enum';
import { OccurrenceProxy } from '../../models/proxies/occurrence.proxy';

@Component({
  selector: 'app-feed-occurrence',
  templateUrl: './feed-occurrence.component.html',
  styleUrls: ['./feed-occurrence.component.scss'],
})
export class FeedOccurrenceComponent {

  constructor() {
  }

  @Input()
  public occurrence!: OccurrenceProxy;

  public typeTranslate: Record<OccurrenceTypeEnum, string> = occurrenceTypeWhiteImage;

}
