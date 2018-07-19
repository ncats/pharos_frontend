export class Property {
  id: number;
  label: string;
  term?: string;
  href?: string;
  numval?: number;
  intval?: number;
  unit?: string;
  exponential? : string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
    if(this.numval || this.intval) {
      this.exponential = this.numval ? Number.parseFloat(this.numval.toString()).toExponential(1) : Number.parseFloat(this.intval.toString()).toExponential(1);
    }
  }

  getData(): string {
    if(this.label ==='pvalue'){
      return this.exponential;
    } else if (!this.term && this.numval) {
        return this.numval.toFixed(2).toString();
      }
      else if(!this.term && this.intval) {
      return this.intval.toFixed(2).toString();
    } else {
      return this.term;
    }
  }
}
