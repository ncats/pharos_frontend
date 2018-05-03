import { Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class EnvironmentVariablesService {
private _environment: any;
constructor( ) {
  this._environment = environment;
}

  getApiPath(): string {
  return this._environment.apiUrl;
  }

  getSuggestPath(): string {
  return this._environment.suggestUrl;
  }

  getDefaultUrl(path: string): string {
    return this._pathExists(path) ? this._environment[path].default : null;
  }

  getTableFields(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].fields : null;
  }

  getFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].facets : null;
  }
  getAllChartFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[path].chartFacets : null;
  }

  getChartFacetByName(path: string, chart: string): any[] {
    if (this._pathExists(path) && this._environment[path].chartFacets[chart]) {
      return this._environment[path].chartFacets[chart];
    } else {
      return null;
    }
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
        return value;
      } else {
        console.log(this);
        return this._environment[path].components;
      }
    } else {
      return null;
    }
  }
}


