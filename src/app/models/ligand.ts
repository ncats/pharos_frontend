import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {LigActSerializer, LigandActivity} from './ligand-activity';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';


/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const LIGANDLISTFIELDS = gql`
  fragment ligandsListFields on Ligand {
    ligid
    name
    description
    isdrug
    smiles
    synonyms {
      name
      value
    }
    activityCount:actcnt
  }
`;

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const LIGANDDETAILSFIELDS = gql`
  fragment ligandsDetailsFields on Ligand {
    ...ligandsListFields
    activities(all: false) {
      type
      moa
      value
      reference
      target {
        symbol:sym
        idgTDL:tdl
        name:name
      }
      pubs {
        pmid
      }
    }
  }
  ${LIGANDLISTFIELDS}
`;


const LIGANDDETAILSQUERY = gql`
  #import "./ligandsDetailsFields.gql"
 query fetchDetails(
        $term: String
        ) {
          ligands: ligand(ligid: $term){
       ...ligandsDetailsFields
          }
        }
          ${LIGANDDETAILSFIELDS}
`;


/**
 * ligand object
 */
export class Ligand extends PharosBase {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static ligandListFragments = LIGANDLISTFIELDS;
  static ligandDetailsFragments = LIGANDDETAILSFIELDS;
  static ligandDetailsQuery = LIGANDDETAILSQUERY;

  ligid: string;
  description?: string;
  synonyms?: any[];
  chemblName: string;
  pubChemID?: string;
  smiles?: string;
  activityCount: number;


  /**
   * name of ligand
   */
  name?: string;

  /**
   * list of activities
   * not returned by api
   */
  activities?: any;
  activitiesMap: Map<string, { target: any, activities: LigandActivity[] }>;

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
  constructor() {
  }

  /**
   * create ligand object from json
   * @param json
   * @return {Ligand}
   */
  fromJson(json: any): Ligand {
    const obj = new Ligand();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if (json.synonyms) {
      json.synonyms.forEach(syn => {
        if (syn.name === 'ChEMBL') {
          obj.chemblName = syn.value;
        }
        if (syn.name === 'PubChem') {
          obj.pubChemID = syn.value;
        }
      });
    }

    if (json.activities) {
      const actMap: Map<string, { target: any, activities: LigandActivity[] }> =
        new Map<string, { target: any, activities: LigandActivity[] }>();
      const ligActSerializer: LigActSerializer = new LigActSerializer();
        json.activities.forEach(act => {
        if (actMap.has(act.target.symbol)) {
          const acts = actMap.get(act.target.symbol);
          acts.activities.push(ligActSerializer.fromJson(act));
          actMap.set(act.target.symbol, acts);
        } else {
          actMap.set(act.target.symbol, {target: act.target, activities: [ligActSerializer.fromJson(act)]});
        }
      });
        obj.activities = [...actMap.values()].sort((a, b) => b.activities.length - a.activities.length);
        obj.activitiesMap = actMap;
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
  _asProperties(obj: any): any {
    console.log(obj);
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
