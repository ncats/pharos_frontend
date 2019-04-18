import {Repository} from "./base-resource";

export class Antibody extends Reagent {
  /**
   * Experiments and assays for which the antibodies have been tested and validated
   */
  usage: string[];
}

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

export class Peptide extends Reagent {
  /**
   * Is the peptide used in PRM-based experiments
   */
  prmType: string;
}

export class Reagent {
  /**
   * name of reagent
   */
  name: string;

  /**
   * Antibody, Cell, Genetic Construct, Mouse, Small Molecule
   */
  resourceType: string;
  /**
   * External link to published images or data relevant for the current Pharos page
   */
  dataPageLink: string;

  /**
   * list of vendor names/links for purchasing
   */
  vendors: Vendor[];

  /**
   * GPCR, Ion-Channel, Kinase
   */
  generatingIC: string;
}

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


