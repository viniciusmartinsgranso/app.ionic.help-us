import { Injectable } from '@angular/core';
import { OccurrenceTypeEnum } from '../models/enums/occurrence-type.enum';
import { NewOccurrencePayload } from '../models/payloads/new-occurrence.payload';
import { OccurrenceProxy } from '../models/proxies/occurrence.proxy';

@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {

  constructor() { }

  public occurrence: NewOccurrencePayload[] = [
    {
      id: 0,
      title: 'Ananindeua',
      location: 'Sorocaba',
      description: 'aaaaaaaaaa',
      type: OccurrenceTypeEnum.COOP,
      photoUrl: 'assets/images/vini.jpg'
    },
  ];

  public occurrenceList: OccurrenceProxy[] = [];

  public get(): void {
    // const list = JSON.parse(localStorage.getItem('occurrences'));
    //
    // if (!list) {
    //   localStorage.setItem('occurrences', JSON.stringify(this.occurrenceList));
    // }
    // return list;
  }

  public create(occurrence: NewOccurrencePayload): void {
    // const storageOccurrences = localStorage.getItem('occurrences') ? JSON.parse(localStorage.getItem('occurrences')) : [];
    //
    // occurrence.user[0] = JSON.parse(localStorage.getItem('loggedUser'));
    // storageOccurrences.push(occurrence);
    // console.log(storageOccurrences);
    // localStorage.setItem('occurrences', JSON.stringify(storageOccurrences));
  }

  public update(occurrence: OccurrenceProxy): void {
    // const storage = JSON.parse(localStorage.getItem('occurrences'));
    //
    // storage.push(occurrence[0]);
    // localStorage.setItem('occurrences', JSON.stringify(storage));
  }

  public async delete(occurrence: number): Promise<void> {
    // const storage = JSON.parse(localStorage.getItem('occurrences'));
    // console.log(storage);
    //
    // const newList = storage.filter(occurrenceStorage => {
    //   if (occurrenceStorage.id !== occurrence) {
    //     return occurrenceStorage;
    //   }
    // });
    //
    // storage.push(newList);
    // localStorage.setItem('occurrences', JSON.stringify(newList));
  }
}
