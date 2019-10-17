import {Serializer} from '../pharos-base';
import {DataProperty} from '../../tools/generic-table/components/property-display/data-property';
import {Antibody, Cell, GeneticConstruct, Mouse, Peptide, Reagent, SmallMolecule} from './reagent';
import {MouseImageData, ProbeData} from './data-resource';

/**
 * extendable base resource class
 */
export class BaseResource {
  /**
   * name of reagent
   */
  name: string;

  /**
   * Antibody, Cell, Genetic Construct, Mouse, Small Molecule
   */
  resourceType: string;

  /**
   * GPCR, Ion-Channel, Kinase
   */
  generatingIC: string;

  constructor(data: any) {
    if (data.name) {
      this.name = data.name;
    }
    if (data.resourceType) {
      this.resourceType = data.resourceType.replace(' ', '')[0].toLowerCase();
    }
    if (data.generatingIC) {
      this.generatingIC = data.generatingIC;
    }
  }
}

/**
 * helper repository class
 */
export class Repository {
  /**
   * Name of the external repository where the construct was registered
   * Repository where the data has been released (e.g. GEO, dbGaP, PubChem, Synapse, etc.)
   */
  repositoryName: string;

  /**
   * Link to the external repository where the construct was registered
   * Link to external data repository containing key dataset metadata
   */
  repositoryUrl: string;

  constructor(data: any) {

    if (data.Repository) {
      this.repositoryName = data.Repository;
    }
    if (data['Repository page link']) {
      this.repositoryUrl = data['Repository page link'];
    }
  }
}


/**
 * serializer for reagent object operations
export class IDGResourceSerializer <T extends BaseResource> implements Serializer {

  /!**
   * no args - chemicals don't have any main level vocabulary terms
   *!/
  constructor () {}

  /!**
   * create reagent from json object
   * @param json
   * @return {Reagent}
   *!/
  fromJson(json: any): T {
    let obj: any;
    switch (json.resourceType.toLowerCase()) {
      case 'antibody': {
        obj = new Antibody();
        break;
      }
      case 'cell': {
        obj = new Cell();
        break;
      }
      case 'genetic construct': {
        obj = new GeneticConstruct();
        break;
      }
      case 'mouse': {
        obj = new Mouse();
        break;
      }
      case 'small molecule': {
        obj = new SmallMolecule();
        break;
      }
      case 'peptide': {
        obj = new Peptide();
        break;
      }
      case 'mouse image data': {
        obj = new MouseImageData();
        break;
      }
      case 'probe data': {
        obj = new ProbeData();
        break;
      }
      case 'dataset': {
        obj = new ProbeData();
        break;
      }
    }
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  /!**
   * flatten reagent
   * @param {Reagent} obj
   * @return {any}
   *!/
  toJson(obj: Reagent): any {
    return [];
  }

  /!**
   * return reagent as properties
   * @param {Reagent} T
   * @return {any}
   * @private
   *!/
  _asProperties(datadata: T): any {
    const newObj: any = {};
    Object.keys(T).map(field => {
      const property: DataProperty = {name: field, label: field, term: T[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}*/
