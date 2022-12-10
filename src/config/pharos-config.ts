import {COMPONENTSCONFIG, PharosPanel} from '../config/components-config';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';

/**
 * main bundle of api calls used in pharos
 * @type {any}
 */
const PHAROSCONFIG: any = {
  components: COMPONENTSCONFIG,
  graphqlUrl: environment.graphqlUrl
};

/**
 * main config object bundled with helper functions, because the object is private
 */
@Injectable({
  providedIn: 'root'
})
export class PharosConfig {
  /**
   * return main api url
   * @returns {string}
   */
  getApiPath(): string {
    return PHAROSCONFIG.apiUrl;
  }

  /**
   * returns the url for the structure image
   * the component finishes the url with the uuid and '.svg':
   * @return {string}
   */
  getStructureImageUrl(): string {
    return PHAROSCONFIG.structureImageUrl;
  }

  /**
   * returns the list of apis that a search query hits
   * @return {any[]}
   */
  getSearchPaths(): any[] {
    return PHAROSCONFIG.components.has('search') ? PHAROSCONFIG.components.get('search').api : null;
  }

  /**
   * returns default api url
   * @param {string} path
   * @returns {string}
   */
  getDefaultUrl(path: string): string {
    return PHAROSCONFIG.components.has(path) ? PHAROSCONFIG.components.get(path).default : null;
  }

  /**
   * fetches components by main level path, and subpath if provided.
   * If there are no associated components null is returned
   * @param {string} path The top level path for the environment object
   * @param {string} subpath (optional) sub path for a smaller subset of components
   * @returns {any[]} array of component tokens/api calls or null
   *
   */
  getComponents(path: string, subpath?: string): PharosPanel[] {
    if (PHAROSCONFIG.components.has(path)) {
      if (subpath) {
        const value = subpath
          .split('.')
          .reduce((a, b) => a[b], PHAROSCONFIG.components.get(path));
        return value.components;
      } else {
        return PHAROSCONFIG.components.get(path);
      }
    } else {
      return null;
    }
  }
}
