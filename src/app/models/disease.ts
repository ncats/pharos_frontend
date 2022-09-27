import {PharosBase, Serializer} from './pharos-base';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';
import {DiseaseAssocationSerializer, DiseaseAssociation} from './disease-association';
import {GwasDiseaseAnalytics} from './gwasDiseaseAnalytics';

/**
 * apollo graphQL query fragment to retrieve common fields for a disease list view
 */
export const DISEASELISTFIELDS = gql`
  fragment diseasesListFields on Disease {
    name
    associationCount
    datasource_count
    mondoID
    gard_rare
    directAssociationCount
    targetCounts {
      name
      value
    }
  }
`;
const SERVERDETAILSQUERY = gql`  #import "./diseasesListFields.gql"
query fetchDiseaseDetailsForSSR (
  $term: String
) {
  diseases: disease(
    name: $term,
  ) {
    name
#    associationCount
#    datasource_count
    mondoID
#    directAssociationCount
    targetCounts {
      name
      value
    }
    uniprotDescription
    doDescription
    mondoDescription
    mondoEquivalents {
      id
      name
    }
    mondoID
    diseaseIDs:dids{
      id
      dataSources
      doName
      doDefinition
    }
  }
}
`;
const DISEASEDETAILSQUERY = gql`
  #import "./diseasesListFields.gql"
  query fetchDiseaseDetails(
    $term: String
  ) {
    diseases: disease(
      name: $term,
    ) {
      ...diseasesListFields
      predictions
      uniprotDescription
      doDescription
      mondoDescription
      mondoEquivalents {
        id
        name
      }
      mondoID
      diseaseIDs:dids{
        id
        dataSources
        doName
        doDefinition
      }
      targetCounts {
        name
        value
      }
      parents{
        name
        associationCount
        targetCounts {
          name
          value
        }
      }
      children{
        name
        associationCount
        targetCounts {
          name
          value
        }
      }
      gwasAnalytics {
        efoID
        trait
        geneCount
        studyCount
        associations {
          target {
            name
            gene: sym
            idgTDL: tdl
            idgFamily: fam
            accession: uniprot
            preferredSymbol
          }
          ensgID
          studyCount
          snpCount
          wSnpCount
          traitCountForGene
          studyCountForGene
          medianPvalue
          medianOddsRatio
          betaCount
          meanStudyN
          rcras
          meanRank
          meanRankScore
        }
      }
    }
  }
  ${DISEASELISTFIELDS}
`;


/**
 * main disease object, mainly list of associated targets
 */
export class Disease {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static diseaseListFragments = DISEASELISTFIELDS;

  static diseaseDetailsQuery = DISEASEDETAILSQUERY;
  static serverDetailsQuery = SERVERDETAILSQUERY;
  /**
   * name of disease
   */
  name: string;

  /**
   * number of disease associations
   */
  associationCount: number;
  gard_rare: boolean;
  directAssociationCount: number;
  uniprotDescription: string;
  doDescription: string;
  mondoDescription: string;
  mondoEquivalents: {id: string, name: string}[];
  mondoID: string;

  diseaseIDs: DiseaseID[];

  /**
   * List of disease association objects
   */
  associations: DiseaseAssociation[];
  /**
   * number of targets related to disease association
   */
  targetCounts?: any[];

  targetCountsTotal: number;

  parents?: Disease[];
  children?: Disease[];

  gwasAnalytics: GwasDiseaseAnalytics;
  predictions: {predictions: any[], citation: any}[];

  hasDOID(){
    return !!this.diseaseIDs?.find(id => id.id.toUpperCase().includes('DOID'));
  }
}

export class DiseaseID{
  id: string;
  dataSources: string[];
  doName: string;
  doDefinition: string;
  constructor(obj: DiseaseID) {
    this.id = obj.id;
    this.dataSources = obj.dataSources;
    this.doName = obj.doName;
    this.doDefinition = obj.doDefinition;
    if (this.id.startsWith('MIM:')) {
      this.id = 'O' + this.id;
    }
  }
}
/**
 * serializer for a disease object
 */
export class DiseaseSerializer implements Serializer {

  /**
   * no args constructor
   */
  constructor() {
  }

  /**
   * return disease object from json, mapping sublists
   * @param json
   * @return {Disease}
   */
  fromJson(json: any): Disease {
    const obj = new Disease();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if (json.associations) {
      const associationSerializer = new DiseaseAssocationSerializer();
      obj.associations = json.associations.map(assoc => associationSerializer.fromJson(assoc));
    }

    if (json.targetCounts) {
      obj.targetCountsTotal = json.targetCounts.reduce((prev, cur) => prev + cur.value, 0);
    }

    if (json.diseaseIDs) {
      obj.diseaseIDs = json.diseaseIDs.map(id => new DiseaseID(id));
    }

    if (json.parents){
      obj.parents = json.parents.map(parent => this.fromJson(parent)).sort((a,b) => {return b.targetCountsTotal - a.targetCountsTotal});
    }

    if (json.children){
      obj.children = json.children.map(child => this.fromJson(child)).sort((a,b) => {return b.targetCountsTotal - a.targetCountsTotal});
    }

    if (json.gwasAnalytics) {
      obj.gwasAnalytics = new GwasDiseaseAnalytics(json.gwasAnalytics);
    }

    if (json.predictions && json.predictions.length > 0) {
      obj.predictions = json.predictions[0];
    }
    return obj;
  }

  /**
   * flatten object to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return properties from object
   * @param {Disease} disease
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(obj: Disease): any {
    const newObj: any = this._mapField(obj);


    if (obj.associations) {
      const associationSerializer = new DiseaseAssocationSerializer();
      newObj.associations = obj.associations.map(assoc => associationSerializer._asProperties(assoc));
    }
    newObj.name.internalLink = ['/diseases', obj.name];

    if (obj.gwasAnalytics) {
      newObj.gwasAnalytics = this._mapField(obj.gwasAnalytics);
      newObj.gwasAnalytics.trait.externalLink = `https://www.ebi.ac.uk/gwas/efotraits/${obj.gwasAnalytics.efoID}`;
      newObj.gwasAnalytics.associations = obj.gwasAnalytics.associations.map(assoc => {
        const assocProps: any = this._mapField(assoc);
        assocProps.provLink.externalLink = assocProps.provLink.term;
        assocProps.provLink.term = '';
        const targetProps: any = this._mapField(assoc.target);
        targetProps.name.term = `${assoc.target.name} (${assoc.target.gene})`;
        targetProps.name.internalLink = ['/targets', assoc.target.preferredSymbol];
        return {...assocProps, ...targetProps};
      });
    }
    return newObj;
  }

  /**
   * recursive mapping function
   * @param obj
   * @return {{}}
   * @private
   */
  private _mapField(obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
      }
    });
    return retObj;
  }
}

