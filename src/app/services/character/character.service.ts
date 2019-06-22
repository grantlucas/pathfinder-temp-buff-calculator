import { Injectable } from '@angular/core';

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
      this.character = new Character(savedCharacter);
    }

    // Store the character when changes happen
    this.characterUpdated$.pipe(
      filter(value => value !== null)
    ).subscribe((character: Character) => {
      this.storageService.save('character', character);
    });
  }

  public isCharacterSetUp(): boolean {
    // TODO: Update this only when the character changes
    // TODO: Check the validity of the current character object and the
    // base information needed from the character setup area
    return false;
  }

  /**
   * Character Info Setter
   */
  public setCharacterData(data: any): void {
    this.character = this.character.merge(data);
    // FIXME: Only emit if there were changes. This could be tied into
    // some sort of "history" tree to check if it matches the previous
    // version etc.
    this.characterUpdated$.next(this.character);
  }
}
