import { Component, OnInit } from '@angular/core';
import { OccurrenceProxy } from '../../../models/proxies/occurrence.proxy';
import { OccurrenceService } from '../../../services/occurrence.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(
    private readonly occurrenceService: OccurrenceService,
  ) { }

  ngOnInit() {
    this.getOccurrences();
  }

  public occurrenceList: OccurrenceProxy[] = [];

  public getOccurrences(): void {
    // this.occurrenceList = JSON.parse(localStorage.getItem('occurrences'));
    // console.log(this.occurrenceList);
  }

}
