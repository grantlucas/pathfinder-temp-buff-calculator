import {
  Record,
  List
} from 'immutable';

interface ModifierParams {
  title: string;
  value: number;
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
  value: number;
  description?: string;

  // TODO: Add "type" to modifier, enum, deflection, natural etc

  constructor(params?: ModifierParams) {
    params ? super(params) : super();
  }

  public valueOf(): number {
    return this.value;
  }
}
