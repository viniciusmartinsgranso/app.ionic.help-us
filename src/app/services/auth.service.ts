import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../modules/http-async/services/http-async.service";
import { JwtTokenProxy } from "../models/proxies/jwt-token.proxy";
import { environment } from "../../environments/environment";
import { StorageService } from './storage.service';
import { getCrudErrors } from '../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  private readonly storage: StorageService = inject(StorageService);

  public async login(username: string, password: string): Promise<[boolean, string]> {
    const { error, success: token } = await this.http.post<JwtTokenProxy>(environment.api.routes.auth.login, {
      username,
      password,
    });

    if (error || !token)
      return [false, getCrudErrors(error)[0]];

    await this.storage.setItem<JwtTokenProxy>(environment.keys.token, token);

    return [true, `Bem-vindo de volta!`];
  }
}
