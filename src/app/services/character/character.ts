import {
  Record,
  Map,
  List
} from 'immutable';

import {
  Stat
} from './stat';

import {
  Modifier
} from './modifier';

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
  initiative: Stat;
  ac: Stat;
  flatFootedAc: Stat;
  touchAc: Stat;
}

// Factory record
const characterRecord: CharacterParams = {
  // General Stats
  level: new Stat({
    base: 0,
    value: 1,
    title: 'Level',
    shortName: 'Level',
  }),

  bab: new Stat({
    base: 0,
    value: 1,
    title: 'Base Attack Bonus',
    shortName: 'BAB',
  }),

  attackCount: new Stat({
    base: 0,
    value: 1,
    title: 'Attack Count',
    shortName: 'Attack Count',
  }),

  hp: new Stat({
    base: 0,
    value: 1,
    title: 'Hit Points',
    shortName: 'HP',
  }),

  initiative: new Stat({
    base: 0,
    value: 2,
    title: 'Initiative',
    shortName: 'Initiative',
  }),

  ac: new Stat({
    base: 10,
    value: 0,
    title: 'Armor Class',
    shortName: 'AC',
  }),

  flatFootedAc: new Stat({
    base: 10,
    value: 0,
    title: 'Flat Footed Armour Class',
    shortName: 'Flat Footed',
  }),

  touchAc: new Stat({
    base: 10,
    value: 0,
    title: 'Touch Armour Class',
    shortName: 'Touch',
  }),

  // Ability Scores
  strAbility: new Stat({
    base: 0,
    value: 10,
    title: 'Strength',
    shortName: 'STR',
  }),
  dexAbility: new Stat({
    base: 0,
    value: 15,
    title: 'Dexterity',
    shortName: 'DEX',
  }),
  conAbility: new Stat({
    base: 0,
    value: 10,
    title: 'Constitution',
    shortName: 'CON',
  }),
  intAbility: new Stat({
    base: 0,
    value: 10,
    title: 'Intelligence',
    shortName: 'INT',
  }),
  wisAbility: new Stat({
    base: 0,
    value: 10,
    title: 'Wisdom',
    shortName: 'WIS',
  }),
  chaAbility: new Stat({
    base: 0,
    value: 10,
    title: 'Charisma',
    shortName: 'CHA',
  }),

  // Saves
  saves: Map({
    fortSave: new Stat({
      base: 0,
      value: 0,
      title: 'Fortitude Save',
      shortName: 'Fortitude',
    }),
    reflexSave: new Stat({
      base: 0,
      value: 0,
      title: 'Reflex Save',
      shortName: 'Reflex',
    }),
    willSave: new Stat({
      base: 0,
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

  initiative: Stat;
  ac: Stat;
  flatFootedAc: Stat;
  touchAc: Stat;

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
}
