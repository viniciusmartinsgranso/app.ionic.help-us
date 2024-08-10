import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../modules/http-async/services/http-async.service";
import { getCrudErrors } from "../utils/functions";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async uploadImage(file: File): Promise<[boolean, string]> {

    const url = environment.api.routes.medias.post;

    const formData = new FormData();

    formData.append('file', file);

    const http = this.http.getNativeClient();

    try {
      const response = await firstValueFrom(http.post(url, formData)) as { url: string };
      return [true, response.url];
    } catch (error) {
      return [false, getCrudErrors(error)[0]];
    }
  }
}
