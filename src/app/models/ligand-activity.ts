import {Ligand} from './ligand';
import {Publication, PublicationSerializer} from './publication';
import {Serializer} from './pharos-base';
import {Target} from './target';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

/**
 * Ligand Activity class, acts as a wrapper around a Ligand object
 */
export class LigandActivity {
  /**
   * optional internal activity ID
   */
  actid?: number;

  /**
   * ligand Activity type
   */
  type?: string;

  /**
   * activity value
   */
  value?: number;

  /**
   * ligand Mechanism of Action
   */
  moa?: string;

  /**
   * activity reference
   */
  reference?: string;

  /**
   * ligand object itself
   */
  ligand?: Ligand;

  /**
   * list of publications that this ligand activity is relevant to
   */
  pubs?: Publication[];
  /**
   * aggregate of PubMed IDs for table display
   */
  pmids?: string;
}

export class LigActSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * create target object from json
   * @param json
   * @return {Target}
   */
  fromJson(json: any): LigandActivity {
    const obj = new LigandActivity();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if (json.pubs && json.pubs.length){
      const publicationSerializer = new PublicationSerializer();
      obj.pubs = json.pubs.map(p => publicationSerializer.fromJson(p));
      obj.pmids = json.pubs.map(p => p.pmid).join(', ');
    }
    obj.value = obj.value ? Math.round(obj.value * 100) / 100 : obj.value;
    return obj;
  }

  toJson(object: any): any {
  }

  _asProperties(obj: any): any {
      const newObj: any = this._mapField(obj);
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
