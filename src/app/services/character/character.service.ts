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
import { Modifier } from './modifier';

import { StorageService } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  public character: Character = new Character();

  public characterUpdated$: BehaviorSubject<Character> = new BehaviorSubject(null);
  public newCharacterCreated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

    // Update the stored character when changes happen
    this.characterUpdated$.pipe(
      filter(value => value !== null)
    ).subscribe((character: Character) => {
      this.storageService.save('character', character.toJSON());
    });

    // Broadcast event when it's a *new* character object. This provides the
    // opportunity for initial character setup to take place.
    if (!savedCharacter) {
      this.newCharacterCreated$.next(true);
    }

    // Apply initial set of modifiers for characters such as Dex bonus to
    // initative
    this.newCharacterCreated$.pipe(
      filter(value => value === true)
    ).subscribe(() => {
      // FIXME: How do we ensure this value updates when the dex mod changes.
      // Should we subscribe to when specific properties change and update
      // these values? Might need to add something to the change event on
      // _what_ changed.

      // Apply Dex Mod to initiative
      this.character = this.character.mergeDeepIn(
        [
          'initiative',
          'modifiers'
        ],
        this.character.initiative.modifiers.push(new Modifier({
          title: 'Dex Mod',
          value: this.character.dexAbility
        }))
      );
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
      // Loop through entries, and merge their new values with the existing
      // data for the given key
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

      // Trigger that the character was updated
      this.characterUpdated$.next(this.character);
    }
  }
}
