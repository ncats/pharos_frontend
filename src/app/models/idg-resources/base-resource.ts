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
}

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
}
