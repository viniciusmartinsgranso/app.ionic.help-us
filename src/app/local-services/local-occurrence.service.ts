import { LocalUserService } from "./local-user.service";
import { OccurrenceProxy } from "../models/proxies/occurrence.proxy";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalOccurrenceService {
  private readonly localStorageKey: string = 'occurrences';

  constructor(private userService: LocalUserService) {}

  public getOccurrences(): OccurrenceProxy[] {
    const occurrences = localStorage.getItem(this.localStorageKey);
    return occurrences ? JSON.parse(occurrences) : [];
  }

  public getOccurrenceById(id: number): OccurrenceProxy | undefined {
    const occurrences = this.getOccurrences();
    return occurrences.find(occurrence => occurrence.id === id);
  }

  public create(occurrence: Omit<OccurrenceProxy, 'id' | 'userId'>): boolean {
    const loggedUser = this.userService.getLoggedUser();
    if (!loggedUser) {
      return false;
    }

    const occurrences = this.getOccurrences();
    const newId = occurrences.length > 0 ? occurrences[occurrences.length - 1].id + 1 : 1;

    const newOccurrence: OccurrenceProxy = {
      ...occurrence,
      id: newId,
      userId: loggedUser.id,
    };

    occurrences.push(newOccurrence);
    localStorage.setItem(this.localStorageKey, JSON.stringify(occurrences));
    return true;
  }

  public update(id: number, updatedOccurrence: Partial<Omit<OccurrenceProxy, 'id' | 'userId'>>): boolean {
    const occurrences = this.getOccurrences();
    const index = occurrences.findIndex(occurrence => occurrence.id === id);

    if (index === -1) {
      return false;
    }

    const occurrence = occurrences[index];
    occurrences[index] = { ...occurrence, ...updatedOccurrence, id: occurrence.id, userId: occurrence.userId };

    localStorage.setItem(this.localStorageKey, JSON.stringify(occurrences));
    return true;
  }

  public delete(id: number): boolean {
    const occurrences = this.getOccurrences();
    const index = occurrences.findIndex(occurrence => occurrence.id === id);

    if (index === -1) {
      return false;
    }

    occurrences.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(occurrences));
    return true;
  }
}