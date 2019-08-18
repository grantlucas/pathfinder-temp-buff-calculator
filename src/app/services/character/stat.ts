import {
  Record,
  List
} from 'immutable';

import {
  Modifier
} from './modifier';

interface StatParams {
  base: number;
  value: number;
  title: string;
  useBase10ModAsValue?: boolean;
  shortName?: string;
  description?: string;
  modifiers?: List<Modifier>;
}

// Factory record
const statRecord: StatParams = {
  base: 0,
  value: 0,
  title: '',
  useBase10ModAsValue: false,
  shortName: '',
  description: '',
  modifiers: List(),
};

export class Stat extends Record(statRecord) {
  base: number;
  value: number;
  title: string;
  useBase10ModAsValue?: boolean;
  shortName?: string;
  description?: string;
  modifiers?: List<Modifier>;

  constructor(params?: StatParams) {
    params ? super(params) : super();
  }

  public valueOf(): number {
    let modifierSum = 0;

    if (this.modifiers.size > 0) {
      // Sum up all modifier values
      modifierSum = this.modifiers
        .map((modifier) => modifier.valueOf())
        .reduce((prev: number, current: number): number => prev + current);
    }

    console.log(modifierSum);

    // TODO: Change this to be the original value with modifiers applied
    return this.base + this.value + modifierSum;
  }

  public toJSON(): any {
    return {
      base: this.base,
      value: this.value,
      modifiers: this.modifiers,
      useBase10ModAsValue: this.useBase10ModAsValue,
    };
  }

  /**
   * Modifier based on 10
   */
  public get base10Mod(): number {
      return Math.floor((this.value - 10) / 2);
  }
}
