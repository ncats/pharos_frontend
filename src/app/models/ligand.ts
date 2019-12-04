import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {LigandActivity} from './ligand-activity';
import gql from 'graphql-tag';

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const LIGANDDETAILSFIELDS =  gql`
  fragment ligandsDetailsFields on Ligand {
    name
    description
    isdrug
    smiles
    synonyms {
      name
      value
    }
    activities(all: false) {
      type
      moa
      value
      reference
      target {
        sym
      }
    }
  }
`;
/**
 * ligand object
 */
export class Ligand extends PharosBase {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static ligandListFragments = LIGANDDETAILSFIELDS;
  static ligandDetailsFragments = LIGANDDETAILSFIELDS;

  description?: string;
  synonyms?: any[];
  chemblName?: string;
  pubChemID?: string;
  smiles?: string;


  /**
   * name of ligand
   */
  name?: string;

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

    if (obj.synonyms) {
      obj.synonyms.forEach(syn => {
        if (syn.name === 'ChEMBL') {
          obj.chemblName = syn.value;
        }
        if (syn.name === 'PubChem') {
          obj.pubChemID = syn.value;
        }
      });
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
  _asProperties<T extends PharosBase>(obj: Ligand): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = {name: field, label: field, term: obj[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}
