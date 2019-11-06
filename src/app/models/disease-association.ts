import {Serializer} from './pharos-base';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

export class DiseaseAssociation {
  disassid?: number;
  type?: string;
  name?: string;
  did?: string;
  description?: string;
  zscore?: number;
  evidence?: string;
  conf?: number;
  reference?: string;
  drug?: string;
  log2foldchange?: number;
  pvalue?: number;
  score?: number;
  source?: string;
  targetCounts?: number;

}

/**
 * serializer for a disease object
 */
export class DiseaseAssocationSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * return disease object from json, mapping sublists
   * @param json
   * @return {Disease}
   */
  fromJson(json: any): DiseaseAssociation {
    const obj = new DiseaseAssociation();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    return obj;
  }

  /**
   * flatten object to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: DiseaseAssociation): any {
    return [];
  }

  /**
   * return properties from object
   * @return {any}
   * @private
   * @param obj
   */
  _asProperties(obj: DiseaseAssociation): any {
    const newObj: any = this._mapField(obj);

    //  newObj.name.internalLink = ['/diseases', obj.id];
    //  newObj.id.internalLink = ['/diseases', obj.id];
    delete newObj.__typename;
    return newObj;
  }

  private _mapField (obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        if (obj[objField] !== null) {
          retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
        } else {
          delete  retObj[objField];
        }
      }
    });
    return retObj;
  }
}
