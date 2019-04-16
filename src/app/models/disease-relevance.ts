import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {Serializer} from "./pharos-base";

export class DiseaseRelevanceSerializer implements PharosSerializer {

  constructor () {}

  fromJson(json: any): DiseaseRelevance {
    const obj = new DiseaseRelevance();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    DiseaseRelevance.mapDates(obj);
    obj.properties = obj.properties.map(prop => prop = new PharosProperty(prop));
    return obj;
  }

  toJson(obj: DiseaseRelevance): any {
    return [];
  }

  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = new PharosProperty({name: field, label: field, term: obj[field]});
      newObj[field] = property;
    });
    // newObj._name.internalLink = obj.uuid;
    return newObj;
  }
}

export class DiseaseRelevance extends PharosBase {
  properties: Array<PharosProperty> = [];
  refid: string;
}
