import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {LigandActivity} from './ligand-activity';

/**
 * ligand object
 */
export class Ligand extends PharosBase {
  lychi?: string;
  isdrug?: boolean;
  synonyms?: any[];
  smiles?: string;


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
  activities?: LigandActivity[];
  /**
   * url for structure image
   */
  imageUrl?: string;

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
  _asProperties<T extends PharosBase>(obj: Ligand): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = {name: field, label: field, term: obj[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}
