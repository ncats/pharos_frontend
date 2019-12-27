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
    if (data.Repository_page_link) {
      this.repositoryUrl = data.Repository_page_link;
    }
  }
}

/**
 * extendable base resource class
 */
export class BaseResource {
  /**
   * name of reagent
   */
  name?: string;

  /**
   * Antibody, Cell, Genetic Construct, Mouse, Small Molecule
   */
  resourceType?: string;

  repository?: Repository;

  constructor(data: any) {
    if (data.Name) {
      this.name = data.Name;
    }
    if (data.resourceType) {
      this.resourceType = data.resourceType.replace(' ', '')[0].toLowerCase();
    }

    if ((data.Repository && (data.Repository !== 'null')) || data.Repository_page_link && (data.Repository_page_link !== 'null')) {
      this.repository = new Repository((data));
    }
  }
}
