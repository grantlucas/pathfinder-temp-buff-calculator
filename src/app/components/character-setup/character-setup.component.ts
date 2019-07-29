import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
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
  debounceTime,
  filter
} from 'rxjs/operators';

import {
  CharacterService,
  Stat
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
      this.characterService.character.level.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
        Validators.max(20),
      ])
    ],
    bab: [
      this.characterService.character.bab.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0),
      ])
    ],
    attackCount: [
      this.characterService.character.attackCount.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    hp: [
      this.characterService.character.hp.value,
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
      this.characterService.character.strAbility.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    dexAbility: [
      this.characterService.character.dexAbility.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    conAbility: [
      this.characterService.character.conAbility.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    intAbility: [
      this.characterService.character.intAbility.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    wisAbility: [
      this.characterService.character.wisAbility.value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
      ])
    ],
    chaAbility: [
      this.characterService.character.chaAbility.value,
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
      this.characterService.character.saves
        .get('fortSave').value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0),
      ])
    ],
    reflexSave: [
      this.characterService.character.saves
        .get('reflexSave').value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0),
      ])
    ],
    willSave: [
      this.characterService.character.saves
        .get('willSave').value,
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0),
      ])
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    public characterService: CharacterService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // Update change detection when the character object changes
    this.characterService.characterUpdated$.pipe(
      filter(value => value !== null)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });

    // Subscribe to the changes of the forms, and write to character
    this.generalSetupForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.generalSetupForm.status === 'VALID') {
        this.characterService.setCharacterStatData(values);
      }
    });

    this.abilityForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.abilityForm.status === 'VALID') {
        this.characterService.setCharacterStatData(values);
      }
    });

    this.savesForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((values) => {
      // Write this data to the character object if valid
      if (this.savesForm.status === 'VALID') {
        this.characterService.setCharacterStatData(values, 'saves');
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
