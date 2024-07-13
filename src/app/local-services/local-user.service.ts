import { UserProxy, UserWithPassword } from "../models/proxies/user.proxy";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {
  private readonly localStorageKey: string = 'users';
  private readonly loggedUserKey: string = 'loggedUser';

  public getUsers(): UserProxy[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  public getUserById(id: number): UserProxy | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  public create(user: Omit<UserWithPassword, 'id'>): boolean {
    const users = this.getUsers();
    const userWithSameEmail = users.find(u => u.email === user.email);

    if (userWithSameEmail) {
      return false;
    }

    const newUser: UserProxy = {
      ...user,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    localStorage.setItem(this.loggedUserKey, JSON.stringify(newUser));
    return true;
  }

  public update(id: number, updatedUser: Partial<Omit<UserProxy, 'id'>>): boolean {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
      return false;
    }

    const user = users[index];
    users[index] = { ...user, ...updatedUser, id: user.id, updatedAt: new Date().toISOString() };

    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  public delete(id: number): boolean {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
      return false;
    }

    users.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  private setUser(user: UserProxy): void {
    localStorage.setItem(this.loggedUserKey, JSON.stringify(user));
  }

  public getLoggedUser(): UserProxy | null {
    const user = localStorage.getItem(this.loggedUserKey);
    return user ? JSON.parse(user) : null;
  }

  public logout(): void {
    localStorage.removeItem(this.loggedUserKey);
  }
}