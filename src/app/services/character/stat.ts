import {
  Record,
  List
} from 'immutable';

import {
  Modifier
} from './modifier';

interface StatParams {
  value: number;
  title: string;
  shortName?: string;
  description?: string;
  modifiers?: List<Modifier>;
}

// Factory record
const statRecord: StatParams = {
  value: 0,
  title: '',
  shortName: '',
  description: '',
  modifiers: List(),
};

export class Stat extends Record(statRecord) {
  value: number;
  title: string;
  shortName?: string;
  description?: string;
  modifiers?: List<Modifier>;

  constructor(params?: StatParams) {
    params ? super(params) : super();
  }

  public valueOf(): number {
    // TODO: Change this to be the original value with modifiers applied
    return this.value;
  }

  public toJSON(): any {
    return {
      value: this.value,
      modifiers: this.modifiers,
    };
  }

  /**
   * Modifier based on 10
   */
  public get base10Mod(): number {
      return Math.floor((this.value - 10) / 2);
  }
}
