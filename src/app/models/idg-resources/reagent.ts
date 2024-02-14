import {BaseResource, HasStructureInfo} from './base-resource';


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
    if (BaseResource.fieldNotNull(data.Vendor_cat)){
      this.vendorUrl = data.Vendor_cat;
    }
    if (BaseResource.fieldNotNull(data.resource_ID)) {
      this.resourceID = data.resource_ID;
    }
  }
}

/**
 * main extendable reagent class
 */
export class Reagent extends BaseResource {

  /**
   * list of vendor names/links for purchasing
   */
  vendors?: Vendor[] = [];

  constructor(data: any) {
    super(data);

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
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'antibody';

  constructor(data: any) {
    super(data);
    this.addDisplayProperty(data.usage, 'Usage');
    this.addDisplayProperty(data.Species_origin, 'Origin');
    this.addDisplayProperty(data.Target_species, 'Species');
    this.addDisplayProperty(data.Target_protein, 'Target');
    this.addDisplayProperty(data.Function, 'Function');
    this.addDisplayProperty(data.Clonality, 'Clonality');
    this.addDisplayProperty(data.Status_Milestone_Antibody, 'Milestone');
  }
}

/**
 * Cell class
 */
export class Cell extends Reagent {
  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'cell';

  constructor(data: any) {
    super(data);

    this.addDisplayProperty(data.Vector_ID, 'Vector');
    this.addDisplayProperty(data.Mod_type, 'Modification');
    this.addDisplayProperty(data.Knockout, 'Knockout');
    this.addDisplayProperty(data.RRID, 'RRID');
    this.addDisplayProperty(data.Cellosaurus_ID, 'Cellosaurus ID');
    // this.addDisplayProperty(data.Tissue,"Tissue");  // Some HEK cells were giving me spleen, so i took this out
    this.addDisplayProperty(data.Species, 'Species');
  }
}

/**
 * Genetic Construct class
 */
export class GeneticConstruct extends Reagent {

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'geneticConstruct';

  constructor(data: any) {
    super(data);

    this.addDisplayProperty(data.RRID, 'RRID');
    this.addDisplayProperty(data.Vector_ID, 'Vector', data.Vector_page_link);
    this.addDisplayProperty(data.Vector_type, 'Vector type');
    this.addDisplayProperty(data.Vector_backbone_id, 'Vector backbone');
    this.addDisplayProperty(data.Promoter, 'Promoter');
    this.addDisplayProperty(data.Tag, 'Tag');
  }
}

/**
 * mouse cell line class
 */
export class Mouse extends Reagent {

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'mouse';

  constructor(data: any) {
    super(data);
    this.addDisplayProperty(data.MMRRC_ID, 'MMRRC ID');
    this.addDisplayProperty(data.Allele, 'Allele');
    this.addDisplayProperty(data.Corresponding_construct, 'Construct', data.Corresponding_construct);
  }
}

/**
 * small molecule class
 */
export class SmallMolecule extends Reagent implements HasStructureInfo{
  /**
   * Batch SMILES sequence (including salt and other modifications) of molecule
   */
  smiles: string;

  /**
   * Canonical SMILES sequence of molecule
   */
  canonicalSmiles: string;

  constructor(data: any) {
    super(data);
    if (data.SMILES) {
      this.smiles = data.SMILES;
    }
    if (data.Canonical_SMILES) {
      this.canonicalSmiles = data.Canonical_SMILES;
    }
    this.addDisplayProperty(data.External_ID, data.External_ID_registration_system);
    this.addDisplayProperty(data.Provider_institution, 'Provider');
    this.addDisplayProperty(data.Activity, 'Activity');
    this.addDisplayProperty(data.Selectivity, 'Selectivity');
  }
}

/**
 * peptide class
 */
export class Peptide extends Reagent {

  /**
   * name of the image to show on the resource cards for each implementing class
   * ./assets/images/resource-types/{{reagent.resourceImageName}}.png
   */
  resourceImageName = 'peptide';

  constructor(data: any) {
    super(data);
    this.addDisplayProperty(data.PRM_type, 'PRM Type');
  }
}





