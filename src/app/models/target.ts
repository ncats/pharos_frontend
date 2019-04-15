import {PharosBase, Serializer, PharosSubList} from './pharos-base';
import {PharosProperty} from "./pharos-property";

export class TargetSerializer implements Serializer {

  constructor () {}

  fromJson(json: any): Target {
    const obj = new Target();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    Target.mapDates(obj);
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

  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = {name: field, label: field, term: obj[field]};
      newObj[field] = property;
    });
   // newObj._name.internalLink = obj.uuid;
    return newObj;
  }
}

export class Target extends PharosBase {
  name: string;
  gene: string;
  accession: string;
  description: string;
  idgFamily: string;
  idgTDL: string;
  novelty:  number;
  antibodyCount:  number;
  monoclonalCount: number;
  pubmedCount:  number;
  jensenScore:  number;
  patentCount:  number;
  grantCount:  number;
  grantTotalCost:  number;
  r01Count:  number;
  ppiCount:  number;
  knowledgeAvailability:  number;
  pubTatorScore:  number;
 // self: string;
  _organism: string;
  _links: PharosSubList;
  _linksCount: number;
  _properties: PharosSubList;
  _propertiesCount: number;
  _synonyms: PharosSubList;
  _synonymsCount: number;
  _publications: PharosSubList;
  _publicationsCount: number;
}


