import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import {
  Subscription,
  pipe
} from 'rxjs';

import {
  debounceTime
} from 'rxjs/operators';

import {
  CharacterService,
  Character
} from '../../services/character';

@Component({
  selector: 'app-character-setup',
  templateUrl: './character-setup.component.html',
  styleUrls: ['./character-setup.component.scss']
})
export class CharacterSetupComponent implements OnInit {

  // General setup form
  public generalSetupForm = this.formBuilder.group({
    level: [
      this.characterService.character.get('level'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
        Validators.max(20),
      ])
    ],
    bab: [
      this.characterService.character.get('bab'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    attackCount: [
      this.characterService.character.get('attackCount'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
  });

  // Ability Form
  public abilityForm = this.formBuilder.group({
    strAbility: [
      this.characterService.character.get('strAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    dexAbility: [
      this.characterService.character.get('dexAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    conAbility: [
      this.characterService.character.get('conAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    intAbility: [
      this.characterService.character.get('intAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    wisAbility: [
      this.characterService.character.get('wisAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    chaAbility: [
      this.characterService.character.get('chaAbility'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
  });

  // Saves Form
  public savesForm = this.formBuilder.group({
    fortSave: [
      this.characterService.character.get('fortSave'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    reflexSave: [
      this.characterService.character.get('reflexSave'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    willSave: [
      this.characterService.character.get('willSave'),
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    public characterService: CharacterService
  ) {
  }

  ngOnInit() {
    // Subscribe to the changes of the forms, and write to character
    this.generalSetupForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.generalSetupForm.status === 'VALID') {
        this.characterService.setCharacterData(values);
      }
    });

    this.abilityForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.abilityForm.status === 'VALID') {
        this.characterService.setCharacterData(values);
      }
    });

    this.savesForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.savesForm.status === 'VALID') {
        this.characterService.setCharacterData(values);
      }
    });
  }

  // Generic error message generator for fields that share the common
  // validators
  public getErrorMessage(input: FormControl): string {
    return input.hasError('required') ? 'You must enter a value' :
      input.hasError('min') ? 'Number too small' :
      input.hasError('pattern') ? 'Please enter a whole number' :
      input.hasError('max') ? 'Number too large' :
      '';
  }
}
