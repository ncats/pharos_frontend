export class BaseResource {
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
