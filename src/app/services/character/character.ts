import {
  Record,
  Map
} from 'immutable';

import {
  Stat
} from './stat';

interface CharacterParams {
  /****** User Defined ******/
  level: Stat;
  bab: Stat;
  attackCount: Stat;
  hp: Stat;

  // Ability Scores
  strAbility: Stat;
  dexAbility: Stat;
  conAbility: Stat;
  intAbility: Stat;
  wisAbility: Stat;
  chaAbility: Stat;

  // Saves
  saves: Map<string, Stat>;

  /****** Calculated ******/
}

// Factory record
const characterRecord: CharacterParams = {
  // General Stats
  level: new Stat({
    value: 1,
    title: 'Level',
    shortName: 'Level',
  }),
  bab: new Stat({
    value: 1,
    title: 'Base Attack Bonus',
    shortName: 'BAB',
  }),
  attackCount: new Stat({
    value: 1,
    title: 'Attack Count',
    shortName: 'Attack Count',
  }),
  hp: new Stat({
    value: 1,
    title: 'Hit Points',
    shortName: 'HP',
  }),

  // Ability Scores
  strAbility: new Stat({
    value: 10,
    title: 'Strength',
    shortName: 'STR',
  }),
  dexAbility: new Stat({
    value: 10,
    title: 'Dexterity',
    shortName: 'DEX',
  }),
  conAbility: new Stat({
    value: 10,
    title: 'Constitution',
    shortName: 'CON',
  }),
  intAbility: new Stat({
    value: 10,
    title: 'Intelligence',
    shortName: 'INT',
  }),
  wisAbility: new Stat({
    value: 10,
    title: 'Wisdom',
    shortName: 'WIS',
  }),
  chaAbility: new Stat({
    value: 10,
    title: 'Charisma',
    shortName: 'CHA',
  }),

  // Saves
  saves: Map({
    fortSave: new Stat({
      value: 0,
      title: 'Fortitude Save',
      shortName: 'Fortitude',
    }),
    reflexSave: new Stat({
      value: 0,
      title: 'Reflex Save',
      shortName: 'Reflex',
    }),
    willSave: new Stat({
      value: 0,
      title: 'Will Save',
      shortName: 'Will',
    }),
  }),
};

export class Character extends Record(characterRecord) {
  level: Stat;
  bab: Stat;
  attackCount: Stat;
  hp: Stat;

  // Ability Scores
  strAbility: Stat;
  dexAbility: Stat;
  conAbility: Stat;
  intAbility: Stat;
  wisAbility: Stat;
  chaAbility: Stat;

  // Saves
  fortSave: Stat;
  reflexSave: Stat;
  willSave: Stat;

  constructor(params?: CharacterParams) {
    params ? super(params) : super();
  }

  public get initiative(): number {
    return this.dexAbility.base10Mod;
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
    return 10 + this.dexAbility.base10Mod;
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
    return 10 + this.dexAbility.base10Mod;
  }
}
