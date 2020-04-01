import {BaseResource, HasStructureInfo} from './base-resource';

/**
 * extendable data resource class
 */
export class DataResource extends BaseResource {

  /**
   * Dataset name that is descriptive of the data
   */
  title?: string;

  /**
   * creates the DataResource object, initializes this.title, adds institution, authors, and PI to displayed properties list
   * @param data
   */
  constructor(data: any) {
    super(data);

    this.addDisplayProperty(data.Provider_institution, "Institute");
    this.addDisplayProperty(data.Authors,"Authors");
    this.addDisplayProperty(data.PI,"PI");

    if (BaseResource.fieldNotNull(data.Title)) {
      this.title = data.Title;
    }
  }
}

/**
 * main mouse image data class
 */
export class MouseImageData extends DataResource {

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName? = 'mouseImageData';

  /**
   * creates object, adds Data and Strain Info to the list of displayed properties
   * @param data
   */
  constructor(data: any) {
    super(data);
    this.addDisplayProperty(this.dataRepository.repositoryName,"Data",this.dataRepository.repositoryUrl);
    this.addDisplayProperty(this.hostRepository.repositoryName,"Strain Info", this.hostRepository.repositoryUrl);
  }
}

/**
 * main class for NanoBRET, Expression, and probably others
 */
export class Dataset extends DataResource{

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'nanoBRET';

  constructor(data: any) {
    super(data);
    this.addDisplayProperty(data.Assay_ID, "Assay ID");
    this.addDisplayProperty(data.Data_format, "Data Format");
    this.addDisplayProperty(data.Endpoint, "Endpoint");
    this.addDisplayProperty(data.Endpoint_detection, "Endpoint Detection");
    this.addDisplayProperty(data.Description, "Data", this.dataRepository.repositoryUrl);
    this.addDisplayProperty(this.hostRepository.repositoryName,"Repository", this.hostRepository.repositoryUrl);
  }
}

/**
 * main probe data class
 */
export class ProbeData extends DataResource implements HasStructureInfo{

  /**
   * Image of the chemical structure based on SMILES provided by DRGC
   */
  canonicalSmiles: string;

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'probeData';

  constructor(data: any) {
    super(data);

    if(BaseResource.fieldNotNull(data.Canonical_SMILES)){
      this.canonicalSmiles = data.Canonical_SMILES;
    }

    this.addDisplayProperty(data.External_ID, data.External_ID_registration_system);
    this.addDisplayProperty(data.Activity,"Activity");
    this.addDisplayProperty(data.Selectivity,"Selectivity");
    this.addDisplayProperty(data.Negative_control,"Negative Control");
    this.addDisplayProperty(this.dataRepository.repositoryName,"Data",this.dataRepository.repositoryUrl);
    this.addDisplayProperty(this.hostRepository.repositoryName,"Probe Details", this.hostRepository.repositoryUrl);
  }
}




