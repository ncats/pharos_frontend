import {BaseResource, Repository} from './base-resource';

/**
 * extendable data resource class
 */
export class DataResource extends BaseResource {
  /**
   * List of data generators
   */
  authors?: string[]; // todo: is this just strings, or needs links?

  /**
   * Identifier as registered by a repository (e.g. GEO ID, PubChem AID, Synpase ID, etc.)
   */
  datasetID?: string; // todo: can there be multiple?

  /**
   * Date when the data was publicly released (to the external repository)
   */
  releaseDate?: string | number | Date;

  /**
   * data type: AP-MS, Channel Activity, CyCIF, Fluorescence imaging, IHC, KINOMEScan, Mouse Phenotype Data, NanoBRET, RNA-seq
   */
  resourceType?: string;

  /**
   * Dataset name that is descriptive of the data
   */
  title?: string;

  /**
   * base resource type
   */
  baseType = 'datasource';

  constructor(data: any) {
    super(data);

    if (data.Authors && data.Authors !== 'null') {
      this.authors = data.Authors;
    }
    if (data.Dataset_ID && data.Dataset_ID !== 'null') {
      this.datasetID = data.Dataset_ID;
    }
    if (data.Release_date && data.Release_date !== 'null') {
      this.releaseDate = data.Release_date;
    }

    if (data.Title && data.Title !== 'null') {
      this.title = data.Title;
    }
  }
}

/**
 * main mouse image data class
 */
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

  resourceType = 'mouseImageData';


  constructor(data: any) {
    super(data);

    if (data.dataPageLink) {
      this.dataPageLink = data.dataPageLink;
    }
    if (data.geneExpressed) {
      this.geneExpressed = data.geneExpressed;
    }
    if (data.mmrrcId) {
      this.mmrrcId = data.mmrrcId;
    }
    if (data.strainName) {
      this.strainName = data.strainName;
    }
    if (data.tissue) {
      this.tissue = data.tissue;
    }
    if (data.tissueID) {
      this.tissueID = data.tissueID;
    }
    if (data.geneExpressed) {
      this.geneExpressed = data.geneExpressed;
    }
  }
}


export class Dataset extends DataResource {
  /**
   * internal assay id
   */
  assayID?: string;

  /**
   * format of assay data
   */
  dataFormat?: string;

  /**
   * link to data
   */
  dataLink?: string;

  /**
   * link to repository for data
   */
  dataRepository?: string;

  /**
   * description of assay
   */
  description?: string;

  /**
   * assay endpoint
   */
  endpoint?: string;

  /**
   * endpoint detection
   */
  endpointDetection?: string;

  /**
   * default resource type
   * @type {string}
   */
  resourceType = 'nanoBRET';

  /**
   * iterate over values. they need to be renamed due to the RSS api
   * @param data
   */
  constructor(data: any) {
    super(data);

    if (data.Assay_ID && data.Assay_ID !== 'null') {
      this.assayID = data.Assay_ID;
    }
    if (data.Data_format && data.Data_format !== 'null') {
      this.dataFormat = data.Data_format;
    }
    if (data.Data_link && data.Data_link !== 'null') {
      this.dataLink = data.Data_link;
    }
    if (data.Data_repository && data.Data_repository !== 'null') {
      this.dataRepository = data.Data_Repository;
    }
    if (data.Description && data.Description !== 'null') {
      this.description = data.Description;
    }
    if (data.Endpoint && data.Endpoint !== 'null') {
      this.endpoint = data.Endpoint;
    }
    if (data.Endpoint_detection && data.Endpoint_detection !== 'null') {
      this.endpointDetection = data.Endpoint_detection;
    }

    if (data.Title && data.Title !== 'null') {
      this.title = data.Title;
    }
  }
}

/**
 * main probe data class
 */
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
   * Structure of inactive analog (probe is the active analog in the "probe pair")
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

  resourceType = 'probe';

  constructor(data: any) {
    super(data);

    if (data.activity) {
      this.activity = data.activity;
    }

    if (data['External ID']) {
      this.externalID = data['External ID'];
    }
    if (data['External ID registration system']) {
      this.externalIDRegistrationSystem = data['External ID registration system'];
    }

    if (data.moleculeName) {
      this.moleculeName = data.moleculeName;
    }
    if (data.negativeControlName) {
      this.negativeControlName = data.negativeControlName;
    }
    if (data.negativeControlStructure) {
      this.negativeControlStructure = data.negativeControlStructure;
    }
    if (data.probePage) {
      this.probePage = data.probePage;
    }
    if (data.selectivity) {
      this.selectivity = data.selectivity;
    }
    if (data.structure) {
      this.structure = data.structure;
    }
    if (data.Repository) {
      this.repository = new Repository(data);
    }
  }
}




