export class Property {
  id: number;
  label: string;
  term?: string;
  href?: string;
  internalHref?: string;
  externalHref?: string;
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
    let ret ='';
    if(this.label ==='pvalue'){
      ret = this.exponential;
    } else if (!this.term && this.numval) {
      ret = this.numval.toFixed(2).toString();
      }
      else if(!this.term && this.intval) {
      ret = this.intval.toFixed(2).toString() || '0';
    } else if(!this.term){
     // ret = '0';
    }
    else {
      ret = this.term;
    }
return ret;
  }
}
