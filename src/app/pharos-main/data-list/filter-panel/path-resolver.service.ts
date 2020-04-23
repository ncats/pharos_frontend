import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router} from '@angular/router';

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
   * creates url string to pass as a query parameter from a list of facets
   * creates {Router} {NavigationExtras} object
   * navigates to url, which updates data
   * optional path allows traversal up the path
   * @param params
   * @param route
   */
  navigate(params: any, route: ActivatedRoute, queries?: any): void {
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

      if(queries) {
        for (let i = 0; i < queries.length; i++) {
          if (queries[i]) {
            navigationExtras.queryParams[queries[i].facet] = queries[i].values.map(val => val.name);
          }
        }
      }
      navigationExtras.queryParams.facet = params.length > 0 ? params : null;
      this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
      this._router.navigate([], navigationExtras);
    }
}
