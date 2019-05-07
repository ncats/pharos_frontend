/**
 * Facet object from api
 */
export class Facet {

  /**
   * name of facet
   */
  name: string;

  /**
   * readable label for facet
   */
  label: string;

  /**
   * list of facet values
   */
  values: Field[];
}

/**
 * field object for facets
 */
export class Field {
  /**
   * facet-able field
   */
  label: string;

  /**
   * cound of facetable values
   */
  count: number;
}
