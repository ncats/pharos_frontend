export class PharosProperty {
  id?: number;
  label?: string;
  name?: string;
  term?: string;
  href?: string;
  internalLink?: string;
  externalLink?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  visible?: boolean;
  width?: number;
  customComponent?: any;

  constructor(obj: any) {
    Object.entries(obj).forEach(prop => {
        this[prop[0]] = prop[1];
    });

    if(obj.numval && !this.term) {this.term = obj.numval}
    if(obj.intval && !this.term) {this.term = obj.intval}
    if(obj.text && !this.term) {this.term = obj.text}
    /*if (this.numval || this.intval) {
      this.exponential = this.numval ? Number.parseFloat(this.numval.toString()).toExponential(1) :
        Number.parseFloat(this.intval.toString()).toExponential(1);
    }*/
  }

}

  /* numval?: number;
   intval?: number;
   text?: string;
   _term?: any;

  set term(val: any) {
    console.log(this);
    let ret = '';
    if (this.label && this.label === 'pvalue') {
      ret = val ? Number.parseFloat(val.toString()).toExponential(1) :
        Number.parseFloat(val.toString()).toExponential(1);
    }
    else if (!this._term && val) {
      ret = val.toFixed(2).toString() || '0';
    } else {
      ret = val;
    }
    this._term = ret;
  }

  get term() {
    console.log(this);
   /!* let ret = '';
    if (this.label === 'pvalue') {
      ret = this.numval ? Number.parseFloat(this.numval.toString()).toExponential(1) :
        Number.parseFloat(this.intval.toString()).toExponential(1);
    } else if (!this.term && this.numval) {
      ret = this.numval.toFixed(2).toString();
    } else if (!this.term && this.intval) {
      ret = this.intval.toFixed(2).toString() || '0';
    } else if (!this.term) {
      // ret = '0';
    } else {
      ret = this.term;
    }
    return ret;*!/
   if(this.numval && !this._term) {this._term = this.numval}
   if(this.intval && !this._term) {this._term = this.intval}
   if(this.text && !this._term) {this._term = this.text}
   return this._term;
  }
*/



/*  // todo this could probably be modified to getters and setters
  getData?(): string {
    let ret = '';
    if (this.label === 'pvalue') {
      ret = this.exponential;
    } else if (!this.term && this.numval) {
      ret = this.numval.toFixed(2).toString();
      } else if (!this.term && this.intval) {
      ret = this.intval.toFixed(2).toString() || '0';
    } else if (!this.term) {
     // ret = '0';
    } else {
      ret = this.term;
    }
return ret;
  }*/
// }
/*




export interface DataProperty {
  id?: number;
  name?: string;
  label: string;
  term?: string | number | Date;
  href?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  internalLink?: string;
  externalLink?: string;
  visible?: boolean;
  width?: number;
  customComponent?: any;


}*/
