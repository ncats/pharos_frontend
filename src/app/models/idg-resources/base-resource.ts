/**
 * helper repository class
 */
import {DataProperty} from "../../tools/generic-table/components/property-display/data-property";
import {PharosConfig} from "../../../config/pharos-config";

/**
 * Interface to implement for resources that contain structural information, in order to show the structure on the cards
 */
export interface HasStructureInfo {
  smiles?: string;
  canonicalSmiles?: string;
}

/**
 * Class to hold data for repositories that can be linked to
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

  constructor(name, url) {
    if (BaseResource.fieldNotNull(name)) {
      this.repositoryName = name;
      if (BaseResource.fieldNotNull(url)) {
        this.repositoryUrl = url;
      }
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
   * method to determine if the object implements the HasStructureInfo interface
   */
  public hasStructureInfo() {
    return this.hasOwnProperty("smiles") || this.hasOwnProperty("canonicalSmiles");
  }

  /**
   * helper function to determine if the resource API has returned meaningful data
   * @param field
   */
  public static fieldNotNull(field) {
    return !!field && field != 'null';
  }

  /**
   * Antibody, Cell, Genetic Construct, Mouse, Small Molecule
   */
  resourceType?: string;

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName?: string;

  /**
   * repository information for links to the data represented by a resource
   */
  dataRepository?: Repository;

  /**
   * repository information for links to the hosting repository for the data
   */
  hostRepository?: Repository;

  /**
   * array of DataProperties to show on the resource cards
   * use addDisplayProperty
   */
  displayProperties?: DataProperty[];

  addDisplayProperty(field, label?, link?) {
    if (BaseResource.fieldNotNull(field)) {
      this.displayProperties.push({label: label, term: field, externalLink: link});
    }
  }

  /**
   * retrieves a path to render smiles for an object that has implemented HasStructureInfo
   */
  parseSmiles()
  {
    if(this.hasStructureInfo()){
      let smiles: string;
      if (this['smiles']) {
        smiles = this['smiles'];
      }
      if (this['canonicalSmiles']) {
        smiles = this['canonicalSmiles'];
      }

      return `${this.pharosConfig.getApiPath()}render/${encodeURIComponent(smiles)}?size=250`;
    }
    return null;
  }

  /**
   * needed for parseSmiles
   */
  pharosConfig : PharosConfig;

  /**
   * creates a BaseResource object. sets this.name and this.resourceType
   * @param data
   */
  constructor(data: any) {
    this.displayProperties = new Array<DataProperty>();
    this.pharosConfig = new PharosConfig();
    if (data.Name || data.name) {
      this.name = data.Name ? data.Name : data.name;
    }
    if (data.resourceType) {
      this.resourceType = data.resourceType;
    }

    this.dataRepository = new Repository(data.Title || this.name, data.Data_Link || data.Data_page_link);
    this.hostRepository = new Repository(data.Repository || data.Repository_page_link, data.Repository_page_link);
  }
}
