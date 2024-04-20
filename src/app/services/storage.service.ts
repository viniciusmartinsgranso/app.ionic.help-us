import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public async setItem<T>(key: string, item: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public async getItem<T>(key: string): Promise<T | null> {
    const result = localStorage.getItem(key);

    if (!result) return null;

    try {
      return JSON.parse(result);
    } catch (e) {
      return result as T;
    }
  }

  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  public async clear(): Promise<void> {
    localStorage.clear();
  }
}
