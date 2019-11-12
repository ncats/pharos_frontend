import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

/**
 * service to parse and resolve the url path to retrieve api info
 */
@Injectable({
  providedIn: 'root'
})
export class PathResolverService {

  /**
   * initialize router
   * @param {Router} _router
   */
  constructor(private _router: Router) {
  }


  /**
   * creates url string to pass as a quey parameter from a list of facets
   * creates {Router} {NavigationExtras} object
   * navigates to url, which updates data
   * optional path allows traversal up the path
   * @param params
   * @param query
   * @param {string} path
   */
  navigate(params: any, query?: string, path?: string): void {
      /*this._facets.forEach(facet => {
        if (facet.facet === 'query') {
          q = facet.fields[0];
        } else if (facet.facet === 'etag') {
          q = `etag:${facet.fields[0]}`;
          //   this._facetMap.delete('etag');
        } else {
          facet.values.forEach(field => facetList.push(this._makeFacetString(facet.facet, field)));
        }
      });*/
      /**
       * forces to first page on facet changes
       * @type {NavigationExtras}
       */
      const navigationExtras: NavigationExtras = {
        queryParams: {
          top: null,
          skip: null
        },
        queryParamsHandling: ''
      };

      if (query) {
        navigationExtras.queryParams.q = query;
        navigationExtras.queryParams.facet = params.length > 0 ? params : null;
      } else {
        navigationExtras.queryParams.facet = params.length > 0 ? params : null;
      }
      this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
      if (path) { // move up a level
        this._router.navigate([path], navigationExtras);
      } else { // lateral navigation
        this._router.navigate([], navigationExtras);
      }
    }
}
