import { Injectable } from '@angular/core';

import {
  ReplaySubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public saved$: ReplaySubject<string>   = new ReplaySubject<string>(10);
  public removed$: ReplaySubject<string> = new ReplaySubject<string>(10);

  constructor() { }

  public save(key: string, data: any): void {
    if (key && data !== null) {
      sessionStorage.setItem(key, JSON.stringify(data));

      // Emit that an item was saved
      this.saved$.next(key);
    }
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
    this.removed$.next(key);
  }

  public get(key: string): any {
    if (key) {
      const data = sessionStorage.getItem(key);

      try {
        // Try to decode the data
        return JSON.parse(data);
      } catch (e) {
        // If decoding fails for some reason, return the raw value
        return data;
      }
    }

    return null;
  }
}
