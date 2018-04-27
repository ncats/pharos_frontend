import {Property} from './property';

export class Value extends Property {
  numval?: number;
  intval?: number;
  unit?: string;

  constructor (obj: any) {
    super(obj);
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }

  getData(): number {
    return this.numval ? this.numval : this.intval;
  }
}
