import {Property} from './property';

export class Value extends Property {
  numval?: number;
  intval?: number;
  unit?: string;
  term? : string;

  constructor (obj: any) {
    super(obj);
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
    this.term = this.numval ? this.numval.toString() : this.intval.toString();
  }

  getData(): string {
    return this.numval ? this.numval.toExponential(1) : this.intval.toExponential(1);
  }
}
