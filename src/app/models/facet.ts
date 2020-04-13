import gql from 'graphql-tag';

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
const FACETFIELDS =  gql`
  fragment facetFields on Facet {
    facet
    count
    values {
      name
      count:value
    }
  }`;

const FACETFIELDSTOP = gql`
  fragment facetFieldsTop on Facet {
    facet
    count
    values(top:$facetTop){
      name
      count:value
    }
  }`;

/**
 * field object for facets
 */
export class Field {
  /**
   * facet-able field
   */
  name: string;

  /**
   * facet-able field
   * optional for filter flattening
   */
  value?: string;

  count?: number;


  constructor(json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}

/**
 * Facet object from api
 */
export class Facet {

  /**
   * The character what separates the facet name from its options in the query string: note this used to be '/' which messed up the "JAX/MGI Phenotype" facet
   */
  static separator = '!';

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static facetFieldsFragments = FACETFIELDS;

  /**
   * name of facet
   */
  facet: string;

  /**
   * readable label for facet
   */
  label?: string;

  description?: string;

  /**
   * Total number of facet options under the current settings
   */
  count: number;

  /**
   * list of facet values
   */
  values: Field[];


  constructor(json: any) {
    this.count = json.count;
    this.facet = json.facet;
    this.label = json.label;
    this.description = json.description;
    this.values = json.values.map(val => new Field(val));
  }

  /**
   * retrieve the full list of facets for each of the paths
   * @param path
   */
  static getFacetList(path){
    if (path == "targets") {
      return Facet.TargetFacets;
    } else if (path == "diseases") {
      return Facet.DiseaseFacets;
    } else if (path == "ligands") {
      return Facet.LigandFacets;
    }
  }
  /**
   * List of all facets to collect when opening the Full Page panel of facets of targets
   */
  static TargetFacets = [
    "Target Development Level",
    "UniProt Keyword",
    "Family",
    "Indication",
    "Monarch Disease",
    "UniProt Disease",
    "Ortholog",
    "IMPC Phenotype",
    "JAX/MGI Phenotype",
    "GO Process",
    "GO Component",
    "GO Function",
    "GWAS",
    "Expression: CCLE",
    "Expression: HCA RNA",
    "Expression: HPM Protein",
    "Expression: HPA",
    "Expression: JensenLab Experiment HPA",
    "Expression: HPM Gene",
    "Expression: JensenLab Experiment HPA-RNA",
    "Expression: JensenLab Experiment GNF",
    "Expression: Consensus",
    "Expression: JensenLab Experiment Exon array",
    "Expression: JensenLab Experiment RNA-seq",
    "Expression: JensenLab Experiment UniGene",
    "Expression: UniProt Tissue",
    "Expression: JensenLab Knowledge UniProtKB-RC",
    "Expression: JensenLab Text Mining",
    "Expression: JensenLab Experiment Cardiac proteome",
    "Expression: Cell Surface Protein Atlas"];


  /**
   * List of all facets to collect when opening the Full Page panel of facets of diseases
   */
  static DiseaseFacets = ["Data Source", "Drug", "Target Development Level"];


  /**
   * List of all facets to collect when opening the Full Page panel of facets of ligands
   */
  static LigandFacets = ["type", "activity"];

  /**
   * retrieves a query object for getting all the facet options for a single facet for a list of targets / diseases / ligands
   * @param path
   */
  static getAllFacetOptionsQuery(path) {
    if(path == "targets"){
      return gql`
        #import "./facetFieldsTop.gql"
        query getAllFacetOptions($batchIDs:[String], $filter:IFilter, $facetTop:Int, $facet:String!){
          results: targets(facets:[$facet], filter:$filter, targets:$batchIDs){
            facets{
                ...facetFieldsTop
            }
          }
        }${FACETFIELDSTOP}`;
    }
    return gql`
      #import "./facetFieldsTop.gql"
      query getAllFacetOptions($filter:IFilter, $facetTop:Int, $facet:String!){
        results: ${path}(filter:$filter){
          facets(include:[$facet]){
            ...facetFieldsTop
          }
      }
      }${FACETFIELDSTOP}`;
  }

  /**
   * retrieves a query object for getting all the facets for a list of targets / diseases / ligands
   * @param path
   */
  static getAllFacetsQuery(path) {
    if(path == "targets"){
      return gql`
        #import "./facetFields.gql"
        query getAllFacets($batchIDs:[String], $facets:[String!], $filter:IFilter) {
          results: targets(facets:$facets, filter:$filter, targets:$batchIDs) {
            facets {
                ...facetFields
            }
          }
        }${FACETFIELDS}`;
    }
    return gql`
      #import "./facetFields.gql"
      query getAllFacets($facets:[String!], $filter:IFilter) {
        results: ${path}(filter:$filter) {
          facets(include:$facets) {
            ...facetFields
          }
        }
      }${FACETFIELDS}`;
  }
}
