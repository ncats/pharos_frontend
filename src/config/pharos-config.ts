import {COMPONENTSCONFIG} from "../config/components-config";
import {environment} from "../environments/environment.prod";
import {Injectable} from "@angular/core";

const _HOST = environment.host;
const _API = environment.api;
const PHAROSCONFIG = {
  apiUrl: _HOST + _API,
  suggestUrl: _HOST + _API + 'suggest?q=',
  radarUrl: _HOST + 'hg/data?type=radar-attr_type&q=',
  radarSourcesUrl: _HOST + 'hg/ds?type=radar-attr_type',
  structureImageUrl: _HOST + 'struc/',
  homunculusUrl: _HOST + 'expression/homunculus?acc=_id_&source=',
  molConvertUrl: _HOST + 'smiles',
  autocompleteFields: ['UniProt_Gene', 'Target', 'Disease', 'OMIM_Term', 'UniProt_Name'],
  components: COMPONENTSCONFIG
};

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
   * get search url for typeahead suggestions
   * @returns {string}
   */
  getSuggestPath(): string {
    return PHAROSCONFIG.suggestUrl;
  }

  /**
   * get url to retrieve radar graph data
   * @return {string}
   */
  getRadarPath(): string {
    return PHAROSCONFIG.radarUrl;
  }

  /**
   * get url to retrieve radar graph data sources
   * @return {string}
   */
  getRadarSourcesPath(): string {
    return PHAROSCONFIG.radarSourcesUrl;
  }

  /**
   * get string array of possible autocomplete fields
   * @returns {string[]}
   */
  getAutocompleteFields(): string[] {
    return PHAROSCONFIG.autocompleteFields;
  }

  /**
   * returns the url for the structure image
   * the component finishes the url with the uuid and '.svg':
   * _HOST +'struc',
   * @return {string}
   */
  getStructureImageUrl(): string {
    return PHAROSCONFIG.structureImageUrl;
  }

  /**
   * get url for mol conversion api
   * @returns {string}
   */
  getMolConvertUrl(): string {
    return PHAROSCONFIG.molConvertUrl;
  }


// todo: deprecate
  /**
   * url for homunculus api
   * @param {string} id
   * @returns {string}
   */
  getHomunculusUrl(id: string): string {
    return PHAROSCONFIG.homunculusUrl.replace('_id_', id);
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
   * get filter facets for a specific data type
   * @param {string} path
   * @returns {any[]}
   */
  getFacets(path: string): any[] {
    return PHAROSCONFIG.components.has(path) ? PHAROSCONFIG.components.get(path).facets : null;
  }

  /**
   * returns all chart facets
   * @param {string} path
   * @returns {any[]}
   */
  getAllChartFacets(path: string): any[] {
    return PHAROSCONFIG.components.has(path) ? PHAROSCONFIG.components.get(path).chartFacets : null;
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
    if (PHAROSCONFIG.components.has(path)) {
      if (subpath) {
        const value = subpath
          .split('.')
          .reduce((a, b) => a[b], PHAROSCONFIG.components.get(path));
        return value['components'];
      } else {
        return PHAROSCONFIG.components.get(path);
      }
    } else {
      return null;
    }
  }
}
