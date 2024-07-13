import { inject, Injectable } from '@angular/core';
import { NewOccurrencePayload } from '../models/payloads/new-occurrence.payload';
import { OccurrenceProxy } from '../models/proxies/occurrence.proxy';
import { environment } from "../../environments/environment";
import { HttpAsyncService } from "../modules/http-async/services/http-async.service";
import { getCrudErrors } from "../utils/functions";
import { createCrudUrl } from "../utils/crud";

@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async get(): Promise<OccurrenceProxy[] | string> {
    const url = createCrudUrl<OccurrenceProxy>(environment.api.routes.occurrences.getMany, {
      search: {
        isActive: true
      },
    });

    const { error, success } = await this.http.get<OccurrenceProxy[]>(url);

    if (error || !success)
      return getCrudErrors(error)[0];

    return success;
  }

  public async create(occurrence: NewOccurrencePayload): Promise<[boolean, string?]> {
    const url = environment.api.routes.occurrences.create;

    const { error, success } = await this.http.post<OccurrenceProxy>(url, occurrence);

    if (!success || error)
      return [false, getCrudErrors(error)[0]]

    return [true];
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
