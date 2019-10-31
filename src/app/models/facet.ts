/**
 * Facet object from api
 */

export class Facet {

  /**
   * name of facet
   */
  facet: string;

  /**
   * readable label for facet
   */
  label?: string;

  /**
   * list of facet values
   */
  values: Field[];

  constructor (json: any) {
    this.facet = json.facet;
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
  value?: number;

  constructor (json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
