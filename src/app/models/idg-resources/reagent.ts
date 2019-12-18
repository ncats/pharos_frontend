import {BaseResource} from './base-resource';


/**
 * vendor helper object class
 */
export class Vendor {
  /**
   * Physical repository from which resource can be purchased
   */
  vendor: string;
  /**
   * External link to physical and/or digital repositories containing key metadata and ordering information for the resource
   */
  vendorUrl: string;

  /**
   * vendor specific identifier for a resource
   */
  resourceID?: string;

  constructor(data: any) {
    this.vendor = data.Vendor;
    this.vendorUrl = data.Vendor_cat;
    if (data.resource_ID) {
      this.resourceID = data.resource_ID;
    }
  }
}

/**
 * main extendable reagent class
 */
export class Reagent extends BaseResource {

  /**
   * External link to published images or data relevant for the current Pharos page
   */
  dataPageLink?: string;

  /**
   * list of vendor names/links for purchasing
   */
  vendors?: Vendor[] = [];

  /**
   * base resource type
   */
  baseType = 'reagent';

  constructor(data: any) {
    super(data);

    if (data.Data_page_link) {
      this.dataPageLink = data.Data_page_link;
    }
    if (data.Vendor) {
      this.vendors.push(new Vendor(data));
    }
  }
}

/**
 * antibody class
 */
export class Antibody extends Reagent {
  /**
   * Experiments and assays for which the antibodies have been tested and validated
   */
  usage: string[];

  resourceType = 'antibody';

  constructor(data: any) {
    super(data);

    if (data.usage) {
      this.usage = data.usage;
    }
  }
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

  resourceType = 'cell';


  constructor(data: any) {
    super(data);

    if (data.cellID) {
      this.cellID = data.cellID;
    }
    if (data.modificationType) {
      this.modificationType = data.modificationType;
    }
    if (data.vectorID) {
      this.vectorID = data.vectorID;
    }
  }
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
   * As registered with repository
   */
  vectorName: string;
  /**
   * Purpose/type of construct associated with gene
   */
  vectorType: string;

  resourceType = 'geneticConstruct';


  constructor(data: any) {
    super(data);

    if (data.RRID) {
      this.RRID = data.RRID;
    }
    if (data.vectorName) {
      this.vectorName = data.vectorName;
    }
    if (data.RRID) {
      this.vectorType = data.vectorType;
    }
  }
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
  constructDetails: any; // Repository;

  /**
   * Link to the external repository where the construct was registered
   */
  correspondingConstruct: any; // Repository;

  resourceType = 'mouse';


  constructor(data: any) {
    super(data);

    if (data.MMRRCID) {
      this.MMRRCID = data.MMRRCID;
    }
    if (data.allele) {
      this.allele = data.allele;
    }
    if (data.constructDetails) {
      this.constructDetails = data.constructDetails;
    }

    if (data.correspondingConstruct) {
      this.correspondingConstruct = data.correspondingConstruct;
    }
  }
}

/**
 * small molecule class
 */
export class SmallMolecule extends Reagent {
  /**
   * Batch SMILES sequence (including salt and other modifications) of molecule
   */
  smiles: string;

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

  resourceType = 'Small Molecule';


  constructor(data: any) {
    super(data);
    if (data.SMILES) {
      this.smiles = data.SMILES;
    }

    if (data.Canonical_SMILES) {
      this.canonicalSmiles = data.Canonical_SMILES;
    }
    if (data.External_ID) {
      this.externalID = data.External_ID;
    }
    if (data.External_ID_registration_system) {
      this.externalIDRegistrationSystem = data.External_ID_registration_system;
    }
  }
}

/**
 * peptide class
 */
export class Peptide extends Reagent {
  /**
   * Is the peptide used in PRM-based experiments
   */
  prmType: string;

  resourceType = 'peptide';

  constructor(data: any) {
    super(data);

    if (data.prmType) {
      this.prmType = data.prmType;
    }
  }
}





