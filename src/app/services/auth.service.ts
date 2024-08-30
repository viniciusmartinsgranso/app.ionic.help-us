import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../modules/http-async/services/http-async.service";
import { JwtTokenProxy } from "../models/proxies/jwt-token.proxy";
import { environment } from "../../environments/environment";
import { StorageService } from './storage.service';
import { getCrudErrors } from '../utils/functions';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  private readonly storage: StorageService = inject(StorageService);

  private readonly userService: UserService = inject(UserService);

  private readonly router: Router = inject(Router);

  public async login(username: string, password: string): Promise<[boolean, string]> {
    const { error, success: token } = await this.http.post<JwtTokenProxy>(environment.api.routes.auth.login, {
      username,
      password,
    });

    if (error || !token)
      return [false, getCrudErrors(error)[0]];

    await this.storage.setItem<JwtTokenProxy>(environment.keys.token, token);
    await this.userService.getMeAndSaveInStorage();

    return [true, `Bem-vindo de volta!`];
  }

  public async invited(): Promise<[boolean, string]> {
    const { error, success } = await this.http.post<JwtTokenProxy>(environment.api.routes.auth.invited, {});

    if (error || !success)
      return [false, getCrudErrors(error)[0]];

    await this.storage.setItem<JwtTokenProxy>(environment.keys.token, success);
    await this.userService.getMeAndSaveInStorage();

    return [true, `Bem-vindo ao HelpUs!`];
  }

  public async logout(): Promise<void> {
    await Promise.all([
      this.storage.remove(environment.keys.token),
      this.storage.remove(environment.keys.user),
    ]);

    await this.router.navigateByUrl('/login');
  }
}
