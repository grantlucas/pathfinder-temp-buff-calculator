import {
  Record,
  List
} from 'immutable';

import {
  Stat
} from './stat';

interface ModifierParams {
  title: string;
  value: number|Stat;
  description?: string;
}

// Factory record
const modifierRecord: ModifierParams = {
  title: '',
  value: 0,
  description: '',
};

export class Modifier extends Record(modifierRecord) {
  title: string;
  value: number|Stat;
  description?: string;

  // TODO: Add "type" to modifier, enum, deflection, natural etc

  constructor(params?: ModifierParams) {
    params ? super(params) : super();
  }

  public valueOf(): number {
    // Return the Stat value if it's a Stat object
    if (this.value instanceof Stat) {
      // TODO: Get this returning the "modifier" for things like Dex ability etc
      return this.value.valueOf();
    }

    // Return just the number value if it's a number
    return this.value;
  }
}
