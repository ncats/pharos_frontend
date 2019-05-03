import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';

export class DiseaseSerializer implements PharosSerializer {

  constructor () {}

  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if (obj._links) {
      obj._links = new PharosSubList(obj._links);
      obj._linksCount = obj._links.count;
    }
    if (obj._properties) {
      obj._properties = new PharosSubList(obj._properties);
      obj._propertiesCount = obj._properties.count;
    }
    if (obj._synonyms) {
      obj._synonyms = new PharosSubList(obj._synonyms);
      obj._synonymsCount = obj._synonyms.count;
    }
    if (obj._publications) {
      obj._publications = new PharosSubList(obj._publications);
      obj._publicationsCount = obj._publications.count;
    }
    return obj;
  }

  toJson(obj: PharosBase): any {
    return [];
  }

  _asProperties<T extends PharosBase>(T: PharosBase): any {
    const newObj: any = {};
    Object.keys(T).map(field => {
      const property: PharosProperty = {name: field, label: field, term: T[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}

export class Disease extends PharosBase {
  name: string;
  description: string;
  _links: PharosSubList;
  _linksCount: number;
  _properties: PharosSubList;
  _propertiesCount: number;
  _synonyms: PharosSubList;
  _synonymsCount: number;
  _publications: PharosSubList;
  _publicationsCount: number;
}
