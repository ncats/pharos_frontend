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
}
`;

/**
 * Facet object from api
 */
export class Facet {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static facetFieldsFragments  = FACETFIELDS;

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
   * list of facet values
   */
  values: Field[];


  constructor (json: any) {
    this.facet = json.facet;
    this.label = json.label;
    this.description = json.description;
    this.values = json.values.map(val => new Field(val));
  }
}

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


  constructor (json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
