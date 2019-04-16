import {DataProperty} from "../tools/generic-table/components/property-display/data-property";

export class PharosProperty extends DataProperty {
  constructor(obj: any) {
   super(obj);
    if(obj.numval && !this.term) {this.term = obj.numval}
    if(obj.intval && !this.term) {this.term = obj.intval}
    if(obj.text && !this.term) {this.term = obj.text}
    /*if (this.numval || this.intval) {
      this.exponential = this.numval ? Number.parseFloat(this.numval.toString()).toExponential(1) :
        Number.parseFloat(this.intval.toString()).toExponential(1);
    }*/
  }

}
