
import {PharosBase, PharosSerializer, Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

export class OrthologSerializer implements PharosSerializer {

  constructor () {}

  fromJson(json: any): Ortholog {
    const obj = new Ortholog();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    Ortholog.mapDates(obj);
    return obj;
  }

  toJson(obj: Ortholog): any {
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



export class Ortholog extends PharosBase {
  properties: Array<PharosProperty> = [];
  refid: string;
}
