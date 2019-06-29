import {
  Record
} from 'immutable';

interface CharacterParams {
  /****** User Defined ******/
  level: number;
  bab: number;
  attackCount: number;
  hp: number;

  // Ability Scores
  strAbility: number;
  dexAbility: number;
  conAbility: number;
  intAbility: number;
  wisAbility: number;
  chaAbility: number;

  // Saves
  fortSave: number;
  reflexSave: number;
  willSave: number;

  /****** Calculated ******/
}

const characterRecord: CharacterParams = {
  // General Stats
  level : 1,
  bab: 1,
  attackCount: 1,
  hp: 0,

  // Ability Scores
  strAbility: 10,
  dexAbility: 10,
  conAbility: 10,
  intAbility: 10,
  wisAbility: 10,
  chaAbility: 10,

  // Saves
  fortSave: 0,
  reflexSave: 0,
  willSave: 0,
};

export class Character extends Record(characterRecord) {
  level: number;
  bab: number;
  attackCount: number;
  hp: number;

  // Ability Scores
  strAbility: number;
  dexAbility: number;
  conAbility: number;
  intAbility: number;
  wisAbility: number;
  chaAbility: number;

  // Saves
  fortSave: number;
  reflexSave: number;
  willSave: number;

  constructor(params?: CharacterParams) {
    params ? super(params) : super();
  }

  public get initiative(): number {
    return this.getAbilityMod('dexAbility');
  }

  /**
   * Armor Class (AC)
   */
  public get ac(): number {
    // Base 10
    // Armor
    // Shield
    // Dex
    // Size
    // Natural
    // Deflection
    // Misc

    // TODO: Implement the rest
    return 10 + this.getAbilityMod('dexAbility');
  }

  /**
   * Flat Footed AC
   *
   * This is AC without the Dex modifier or **Dodge** based bonuses
   */
  public get flatFootedAc(): number {
    return 10;
  }

  /**
   * Touch AC
   *
   * This is AC without armor, shields, or natural armor
   */
  public get touchAc(): number {
    // Base 10
    // Dex
    // Size
    // Deflection
    // Misc
    return 10 + this.getAbilityMod('dexAbility');
  }


  /**
   * Get Ability Modifier
   *
   * Calculate ability modifier given an ability key
   */
  public getAbilityMod(key: string): number {
    if (this.has(key)) {
      return Math.floor((this[key] - 10) / 2);
    }

    return 0;
  }
}
