import {Serializer} from './pharos-base';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

export class DiseaseAssociation {
  /**
   * internal disease association id
   */
  disassid?: number;

  /**
   * disease association type
   */
  type?: string;

  /**
   * disease name
   */
  name?: string;

  /**
   * disease id
   */
  did?: string;
  /**
   * disease descriptions
   */
  description?: string;

  /**
   * disease association z-score
   */
  zscore?: number;

  /**
   * disease association evidence
   */
  evidence?: string;

  /**
   * disease association confidence
   */
  conf?: number;

  /**
   * disease association reference
   */
  reference?: string;

  /**
   * disease association relevant drug name
   */
  drug?: string;

  /**
   * disease assocaition log2 fold change
   */
  log2foldchange?: number;

  /**
   * disease association p value
   */
  pvalue?: number;

  /**
   * disease association score
   */
  score?: number;

  /**
   * disease association source
   */
  source?: string;

  O2S?: number;
  S2O?: number;
}

/**
 * serializer for a disease object
 */
export class DiseaseAssocationSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor() {}

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
