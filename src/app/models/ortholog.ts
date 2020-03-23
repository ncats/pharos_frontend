import {PharosBase, Serializer} from './pharos-base';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

/**
 * similar to a disease source, a name and list of properties
 */
export class Ortholog {
  /**
   * ortholog species
   */
  species: string;

  /**
   * ortholog gene symbol
   */
  sym: string;

  /**
   * ortholog name
   */
  name: string;

  /**
   * internal db id
   */
  dbid: string;

  /**
   * id for related gene
   */
  geneid: string;

  /**
   * list of ortholog sources (not links)
   */
  source: any[];
}

/**
 * serializer for ortholog object
 */
export class OrthologSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * generatate ortholog from json
   * @param json
   * @return {Ortholog}
   */
  fromJson(json: any): Ortholog {
    const obj = new Ortholog();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    obj.source = obj.source.map(source => source = {name: source});
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
  _asProperties(obj: Ortholog): any {
    const newObj: any = this._mapField(obj);
    newObj.source = newObj.source.map(source => source.name);
    return newObj;
  }

  /**
   * recursive mapping function
   * @param obj
   * @return {{}}
   * @private
   */
  private _mapField(obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
      }
    });
    return retObj;
  }
}




