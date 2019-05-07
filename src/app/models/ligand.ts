import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';

/**
 * ligand object
 */
export class Ligand extends PharosBase {

  /**
   * name of ligand
   */
  name?: string;

  /**
   * activity type of ligand
   * not returned by api
   */
  activityType?: string;

  /**
   * ligand activity
   * not returned by api
   */
  activity?: any;

  /**
   * list of activities
   * not returned by api
   */
  activities?: any;
  /**
   * url for structure image
   */
  imageUrl?: string;

  /**
   * sublist object for links
   */
  _links: PharosSubList;

  /**
   * links count
   */
  _linksCount: number;
  /**
   * sublist object for properties
   */
  _properties: PharosSubList;

  /**
   * properties count
   */
  _propertiesCount: number;
  /**
   * sublist object for synonyms
   */
  _synonyms: PharosSubList;

  /**
   * synonyms count
   */
  _synonymsCount: number;

  /**
   * sublist object for publications
   */
  _publications: PharosSubList;

  /**
   * count of publications
   */
  _publicationsCount: number;
}

/**
 * serializer for ligand object operations
 */
export class LigandSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create ligand object from json
   * @param json
   * @return {Ligand}
   */
  fromJson(json: any): Ligand {
    const obj = new Ligand();
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

  /**
   * flatten object to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return objec as pharos properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = {name: field, label: field, term: obj[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}
