import { Component, inject, OnInit } from '@angular/core';
import { OccurrenceProxy } from '../../../models/proxies/occurrence.proxy';
import { OccurrenceService } from '../../../services/occurrence.service';
import { HelperService } from "../../../services/helper";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  private readonly occurrenceService: OccurrenceService = inject(OccurrenceService);

  private readonly helperService: HelperService = inject(HelperService);

  public async ngOnInit(): Promise<void> {
    await this.getOccurrences();
  }

  public occurrenceList: OccurrenceProxy[] = [];

  public async getOccurrences(): Promise<void> {
    const occurrences = await this.occurrenceService.get();

    if (typeof occurrences === 'string')
      return void this.helperService.showToast(occurrences)

    this.occurrenceList = occurrences;
  }

}
