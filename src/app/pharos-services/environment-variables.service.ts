import { Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';

/**
 * Returns sectinos fo the environment configuration obejct
 */
@Injectable()
export class EnvironmentVariablesService {
  /**
   * single local environment object
   */
  private _environment: any;

  /**
   * set instance to import
   */
  constructor( ) {
  this._environment = environment;
}

  /**
   * return main api url
   * @returns {string}
   */
  getApiPath(): string {
  return this._environment.apiUrl;
  }

  /**
   * get search url for typeahead suggestions
   * @returns {string}
   */
  getSuggestPath(): string {
  return this._environment.suggestUrl;
  }

  /**
   * get url to retrieve radar graph data
   * @return {string}
   */
  getRadarPath(): string {
  return this._environment.radarUrl;
  }

  /**
   * returns default api url
   * todo: this returns the empty search string, so it will need to be changed
   * @param {string} path
   * @returns {string}
   */
  getDefaultUrl(path: string): string {
    return this._pathExists(path) ? this._environment[path].default : null;
  }

  /**
   * get configurable table fields from environment
   * todo: check usage
   * @param {string} path
   * @returns {any[]}
   */
  getTableFields(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].fields : null;
  }

  /**
   * get filter facets for a specific data type
   * @param {string} path
   * @returns {any[]}
   */
  getFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].facets : null;
  }

  /**
   * returns all chart facets
   * @param {string} path
   * @returns {any[]}
   */
  getAllChartFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].chartFacets : null;
  }

  /**
   * returns group of facets associated with a chart for each data type
   * @param {string} path
   * @param {string} chart
   * @returns {any[]}
   */
  getChartFacetByName(path: string, chart: string): any[] {
    if (this._pathExists(path) && this._environment[path].chartFacets[chart]) {
      return this._environment[path].chartFacets[chart];
    } else {
      return null;
    }
  }

  /**
   * returns the list of apis that a search query hits
   * @return {any[]}
   */
  getSearchPaths(): any[] {
    return this._environment.search.api;
  }

  /**
   * returns the url for the homunculus image, sets the id in the url string.
   * the component finishes the url with the source:
   * _HOST +'expression/homonculus?acc=_id_&source=',
   * @param {string} id
   * @return {string}
   */
  getHomunculusUrl(id: string): string {
    return this._environment.homunculusUrl.replace('_id_', id);
  }

  /**
   * returns the url for the structure image
   * the component finishes the url with the uuid and '.svg':
   * _HOST +'struc',
   * @return {string}
   */
  getStructureImageUrl(): string {
    return this._environment.structureImageUrl;
  }

  /**
   * Checks to see if a path returns a defined array of components
   * @param {string} path
   * @returns {boolean}
   * @private
   */
  _pathExists(path: string): boolean {
    return this._environment[path] !== undefined;
  }

  /**
   * fetches components by main level path, and subpath if provided.
   * If there are no associated components null is returned
   * @param {string} path The top level path for the environment object
   * @param {string} subpath (optional) sub path for a smaller subset of components
   * @returns {any[]} array of component tokens/api calls or null
   *
   */
  getComponents(path: string, subpath?: string): any[] {
    if (this._pathExists(path)) {
      if (subpath) {
        const value = subpath.split('.').reduce((a, b) => a[b], this._environment[path].components);
        return value['components'];
      } else {
        return this._environment[path].components;
      }
    } else {
      return null;
    }
  }
}


