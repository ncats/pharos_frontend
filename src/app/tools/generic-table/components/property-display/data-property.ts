import {InjectionToken} from '@angular/core';

/**
 * main config object for a table cell, contains column/field data nad value info
 */
export class DataProperty {
  /**
   * id of object
   */
  id?: number;

  /**
   * name of field
   */
  name?: string;

  /**
   * readable label
   */
  label: string;

  /**
   * object data property
   */
  term?: string | number | Date;
  /**
   * optional url
   */
  href?: string;

  /**
   * should column be sortable
   */
  sortable?: boolean;

  /**
   * if sorted, then what direction?
   * todo merge with sortable
   */
  sorted?: 'asc' | 'desc' | null;

  /**
   * internal pharos link
   */
  internalLink?: string;

  /**
   * link to external source, displayed with icon
   */
  externalLink?: string;

  /**
   * is column visible. used for show/hide columns
   */
  visible?: boolean;

  /**
   * width of column
   * todo: see if this is used/ works
   */
  width?: number;

  /**
   * token for a custom component
   */
  customComponent?: InjectionToken<any>;

  /**
   * deconstruct json as dataproperty object
   * @param obj
   */
  constructor(obj?: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
