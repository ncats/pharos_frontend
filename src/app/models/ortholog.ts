import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

/**
 * similar to a disease source, a name and list of properties
 */
export class Ortholog extends PharosBase {
  /**
   * list of object properties for an ortholog
   * @type {any[]}
   */
  properties: Array<PharosProperty> = [];

  /**
   * name id for ortholog
   */
  refid: string;
}

/**
 * serializer for ortholog object
 */
export class OrthologSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * generatate ortholog from json
   * @param json
   * @return {Ortholog}
   */
  fromJson(json: any): Ortholog {
    const obj = new Ortholog();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    Ortholog.mapDates(obj);
    return obj;
  }

  /**
   * flatten ortholog
   * @param {Ortholog} obj
   * @return {any}
   */
  toJson(obj: Ortholog): any {
    return [];
  }

  /**
   * ortholog as properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = new PharosProperty({name: field, label: field, term: obj[field]});
      newObj[field] = property;
    });
    return newObj;
  }
}




