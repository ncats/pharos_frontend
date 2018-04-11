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
  _pathExists(path: string): boolean {
    return this._environment[path] !== undefined;
  }

  getComponents(path: string, subpath?: string) {
    const components = this._environment[path].components;
    if (this._pathExists(path) && subpath) {
      const value = subpath.split('.').reduce((a, b) => a[b], components);
      return value;
    } else {
     return components;
    }
  }
}


