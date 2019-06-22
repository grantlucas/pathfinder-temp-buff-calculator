import {
  Record
} from 'immutable';

interface CharacterParams {
  /****** User Defined ******/
  level: number;
  bab: number;
  attackCount: number;

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
}
