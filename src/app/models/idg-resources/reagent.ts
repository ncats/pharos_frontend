import {BaseResource, Repository} from './base-resource';
import {Serializer} from '../pharos-base';
import {DataProperty} from '../../tools/generic-table/components/property-display/data-property';

/**
 * main extendable reagent class
 */
export class Reagent extends BaseResource {

  /**
   * External link to published images or data relevant for the current Pharos page
   */
  dataPageLink: string;

  /**
   * list of vendor names/links for purchasing
   */
  vendors: Vendor[];
}

/**
 * vendor helper object class
 */
export class Vendor {
  /**
   * Physical repository from which resource can be purchased
   */
  vendorName: string;
  /**
   * External link to physical and/or digital repositories containing key metadata and ordering information for the resource
   */
  vendorPageLink: string;

  /**
   * vendor specific identifier for a resource
   */
  resourceID: string;
}

/**
 * antibody class
 */
export class Antibody extends Reagent {
  /**
   * Experiments and assays for which the antibodies have been tested and validated
   */
  usage: string[];
}

/**
 * Cell class
 */
export class Cell extends Reagent {
  /**
   * Identifier as registered by repository/ontology (e.g. CLO ID, RRID, etc.)
   */
  cellID: string;

  /**
   * Type of modification (if any) performed on the cells
   */
  modificationType: string;

  /**
   * IDG Identifier of the vector utilized to modify the cells for experimental purposes
   */
  vectorID: string;
}

/**
 * Genetic Construct class
 */
export class GeneticConstruct extends Reagent {
  /**
   * Genetic construct RRID
   */
  RRID: string;
  /**
   *As registered with repository
   */
  vectorName: string;
  /**
   * Purpose/type of construct associated with gene
   */
  vectorType: string;
}

/**
 * mouse cell line class
 */
export class Mouse extends Reagent {
  /**
   * ID as registered with MMRRC
   */
  MMRRCID: string;

  /**
   * Specific nature of genetic modification made (modificationType?)
   */
  allele: string;

  /**
   * Link to the external repository where the construct was described
   */
  constructDetails: Repository;

  /**
   * Link to the external repository where the construct was registered
   */
  correspondingConstruct: Repository;
}

/**
 * small molecule class
 */
export class SmallMolecule extends Reagent {
  /**
   * Batch SMILES sequence (including salt and other modifications) of molecule
   */
  batchSmiles: string;

  /**
   * Canonical SMILES sequence of molecule
   */
  canonicalSmiles: string;

  /**
   * External ID (PubChem, CheBI, ZINC, etc.) corresponding to the canonical representation
   */
  externalID: string;

  /**
   * Repository corresponding to the external ID
   */
  externalIDRegistrationSystem: string;
}

/**
 * peptide class
 */
export class Peptide extends Reagent {
  /**
   * Is the peptide used in PRM-based experiments
   */
  prmType: string;
}

/**
 * serializer for reagent object operations
 */
export class ReagentSerializer implements Serializer {

  /**
   * no args - chemicals don't have any main level vocabulary terms
   */
  constructor () {}

  /**
   * create reagent from json object
   * @param json
   * @return {Reagent}
   */
  fromJson(json: any): Reagent {
    let obj: Reagent;
    switch (json.resourceType) {
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
    }
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  /**
   * flatten reagent
   * @param {Reagent} obj
   * @return {any}
   */
  toJson(obj: Reagent): any {
    return [];
  }

  /**
   * return reagent as properties
   * @param {Reagent} T
   * @return {any}
   * @private
   */
  _asProperties<T extends Reagent>(T: Reagent): any {
    const newObj: any = {};
    Object.keys(T).map(field => {
      const property: DataProperty = {name: field, label: field, term: T[field]};
      newObj[field] = property;
    });
    return newObj;
  }
}



