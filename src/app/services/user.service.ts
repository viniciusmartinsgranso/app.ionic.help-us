import { inject, Injectable } from '@angular/core';
import { LoginPayload } from '../models/payloads/login.payload';
import { CreateUserPayload } from '../models/payloads/register.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { environment } from "../../environments/environment";
import { HttpAsyncService } from "../modules/http-async/services/http-async.service";
import { HelperService } from "./helper";
import { getCrudErrors } from "../utils/functions";
import { JwtTokenProxy } from "../models/proxies/jwt-token.proxy";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly storage: StorageService = inject(StorageService);

  public user: CreateUserPayload[] = [
    {
      name: '',
      password: '',
      email: '',
    },
  ];

  public get(): void {
    // const list = JSON.parse(localStorage.getItem('users'));
    //
    // if (!list) {
    //   localStorage.setItem('users', JSON.stringify(this.user));
    // }
  }

  public async create(user: CreateUserPayload): Promise<[boolean, string]> {
    const url = environment.api.routes.users.create;

    const { success, error } = await this.http.post<boolean>(url, user);

    if (!success || error)
      return [false, getCrudErrors(error)[0]]

    return [true, 'Usuário criado com sucesso!'];
  }

  public update(user: UserProxy): void {
    // const storage = JSON.parse(localStorage.getItem('users'));
    //
    // storage.push(user[0]);
    // localStorage.setItem('users', JSON.stringify(storage));
  }

  public async delete(user: number): Promise<void> {
    // const storage = JSON.parse(localStorage.getItem('users'));
    // console.log(storage);
    //
    // const newList = storage.filter(userStorage => {
    //   if (userStorage.id !== user) {
    //     return userStorage;
    //   }
    // });
    //
    // storage.push(newList);
    // localStorage.setItem('users', JSON.stringify(newList));
  }

  public login(user: LoginPayload): void {
    // localStorage.removeItem('loggedUser');
    // const storage = JSON.parse(localStorage.getItem('users'));
    //
    // const loggedUser = storage.map(currentUser => {
    //   if (currentUser.email === user.email && currentUser.password === user.password) {
    //     return currentUser;
    //   }
    // });
    //
    // if(loggedUser[0] === undefined) {
    //   return false;
    // } else {
    //   localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    //   return true;
    // }
  }

  public invitedLogin(user: CreateUserPayload): void {
    // localStorage.removeItem('loggedUser');
    // const storageUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    // console.log(storageUsers);
    //
    // storageUsers.push(user);
    // localStorage.setItem('users', JSON.stringify(storageUsers));
    // localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  private readonly currentUser$: BehaviorSubject<UserProxy | null> =
    new BehaviorSubject<UserProxy | null>(null);

  public getCurrentUser$(): Observable<UserProxy | null> {
    return this.currentUser$.asObservable();
  }

  public setCurrentUser(user: UserProxy | null): void {
    return this.currentUser$.next(user);
  }

  public async getCurrentUserFromStorage(): Promise<UserProxy | null> {
    const result = await this.storage.getItem<UserProxy>(environment.keys.user);

    if (!result) return null;

    this.currentUser$.next(result);

    return result;
  }

  public getCurrentUser(): UserProxy | null {
    return this.currentUser$.getValue();
  }

  public async getMe(): Promise<UserProxy> {
    const { error, success } = await this.http.get<UserProxy>(
      environment.api.routes.users.me,
    );

    if (error || !success) throw new Error(getCrudErrors(error)[0]);

    return success!;
  }

  public async isLogged(): Promise<boolean> {
    const result = await this.storage.getItem<UserProxy>(
      environment.keys.token,
    );

    return !!result;
  }

  public async getUserToken(): Promise<JwtTokenProxy | null> {
    const token = await this.storage.getItem<JwtTokenProxy>(
      environment.keys.token,
    );

    if (!token) return null;

    return token;
  }

}
