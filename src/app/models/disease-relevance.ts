import {PharosBase} from './pharos-base';
import {Property} from './property';

export class DiseaseRelevance extends PharosBase {
  properties: Array<Property> = [];
  refid: string;

  constructor(obj: any) {
    super(obj);
    this.refid = obj.refid;
    obj.properties.forEach(prop => {
        this.properties.push(new Property(prop));
    });
  }
}
