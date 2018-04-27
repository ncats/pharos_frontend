
import {PharosBase} from './pharos-base';
import {Property} from './property';
import {Value} from './value';
import {Term} from './term';

export class Ortholog extends PharosBase {
  properties: Array<Value | Term> = [];
  refid: string;

  constructor(obj: any) {
    super();
    this.refid = obj.refid;
    obj.properties.forEach(prop => {
      if (prop.term) {
        this.properties.push(new Term(prop));
      } else if (prop.numval || prop.intval ) {
        this.properties.push(new Value(prop));
      } else {
        console.error(prop);
      }
    });
  }
}
