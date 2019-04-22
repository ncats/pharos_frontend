import {BaseResource, Repository} from "./base-resource";

export class MouseImageData extends DataResource {
  /**
   * Link to the corresponding preselected images to support the conclusion
   */
  dataPageLink: string;

  /**
   * Is the gene expressed or not?
   */
  geneExpressed: boolean;

  /**
   * ID as registered with MMRRC
    */
  mmrrcId: string;

  /**
   * Appropriate strain name as registered with repository
   */
  strainName: string;

  /**
   * Standardized name (from UBERON)
   */
  tissue: string;

  /**
   * UBERON ID
   */
  tissueID: string;
}

export class ProbeData extends DataResource {
  /**
   * On target activity as reported to chemicalprobes.org
   */
  activity: string;
  /**
   * External ID (PubChem, CheBI, ZINC, etc.) corresponding to the canonical representation
   */
  externalID: string;

  /**
   * Repository corresponding to the external ID
   */
  externalIDRegistrationSystem: string;

  /**
   * Mode of action towards given gene
   */
  ligandType: string;

  /**
   * Canonical (trade or IUPAC) name of molecule
   */
  moleculeName: string;

  /**
   * Name and structure of inactive analog (probe is the active analog in the "probe pair")
   */
  negativeControlName: string;

  /**
   *Structure of inactive analog (probe is the active analog in the "probe pair")
   */
  negativeControlStructure: string;

  /**
   * Link to chemicalprobes.org where the probe is registered
   */
  probePage: string;

  /**
   * Link to the vendor for the physical sample
   */
  repository: Repository;

  /**
   * Selectivity against similar genes as reported to chemicalprobes.org
   */
  selectivity: string;

  /**
   * Image of the chemical structure based on SMILES provided by DRGC
   */
  structure: string;
}



export class DataResource extends BaseResource {
  /**
   * List of data generators
   */
    authors: string[]; // todo: is this just strings, or needs links?

  /**
   * Identifier as registered by a repository (e.g. GEO ID, PubChem AID, Synpase ID, etc.)
   */
   datasetID: string; //todo: can there be multiple?

  /**
   * Date when the data was publicly released (to the external repository)
   */
  releaseDate: string | number | Date;

  /**
   * repository where the data was released
   */
  repository: Repository;

  /**
   * data type: AP-MS, Channel Activity, CyCIF, Fluorescence imaging, IHC, KINOMEScan, Mouse Phenotype Data, NanoBRET, RNA-seq
   */
  resourceType: string;

  /**
   * Dataset name that is descriptive of the data
   */
  title: string;
}
