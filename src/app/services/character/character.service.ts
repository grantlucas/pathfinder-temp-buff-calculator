import { Injectable } from '@angular/core';

import {
  fromJS
} from 'immutable';

import {
  BehaviorSubject
} from 'rxjs';

import {
  filter
} from 'rxjs/operators';

import { Character } from './character';

import { StorageService } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  public character: Character = new Character();

  public characterUpdated$: BehaviorSubject<Character> = new BehaviorSubject(null);

  constructor(
    private storageService: StorageService
  ) {
    // Load the character from storage on initial load
    const savedCharacter = this.storageService.get('character');
    if (savedCharacter) {
      // Build new blank character and then deep merge the saved data
      const savedData = fromJS(savedCharacter);
      const baseCharacter = new Character();
      this.character = this.character.mergeDeepIn([], savedData);
    }

    // Store the character when changes happen
    this.characterUpdated$.pipe(
      filter(value => value !== null)
    ).subscribe((character: Character) => {
      this.storageService.save('character', character.toJSON());
    });
  }

  public isCharacterSetUp(): boolean {
    // TODO: Update this only when the character changes
    // TODO: Check the validity of the current character object and the
    // base information needed from the character setup area
    return false;
  }

  /**
   * Set character stat data, or complex object data that's nested within a
   * list or map on the character object
   */
  public setCharacterStatData(data: any, characterKey?: string): void {
    if (data) {
      Object.keys(data).forEach(key => {
        const value = data[key];

        // Build object route
        const route: Array<string> = [];

        if (characterKey) {
          route.push(characterKey);
        }

        route.push(key);

        this.character = this.character.mergeDeepIn(route, { value });
      });

      // Loop through entries, and merge their new values with the existing
      // data for the given key
      this.characterUpdated$.next(this.character);
    }
  }
}
