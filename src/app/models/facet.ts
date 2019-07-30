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
  label?: string;

  /**
   * list of facet values
   */
  values: Field[];

  /**
   * show or hide the facet panel by default
   */
  open?: boolean;
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
   * facet-able field
   */
  name?: string;

  /**
   * facet-able field
   */
  value?: string;

  /**
   * cound of facetable values
   */
  count?: number;
}
