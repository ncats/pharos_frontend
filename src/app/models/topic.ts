import {PharosBase, Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

export class TopicSerializer implements Serializer {

  constructor () {}

  fromJson(json: any): Topic {
    const obj = new Topic();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    Topic.mapDates(obj);
    return obj;
  }

  toJson(obj: Topic): any {
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


export class Topic extends PharosBase {
name: string;
description: string;
class: string;
kind = 'ix.idg.models.Topic';
targetCt?: any;
diseaseCt?: any;
ligandCt?: any;
publicationCt?: any;
  displayTargets?: any;
  targetList?: string[];
}
