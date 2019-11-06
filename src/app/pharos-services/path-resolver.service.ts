import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {NavigationExtras, ParamMap, Router} from '@angular/router';
import {Facet, Field} from '../models/facet';

/**
 * service to parse and resolve the url path to retrieve api info
 */
@Injectable({
  providedIn: 'root'
})
export class PathResolverService {
  /**
   * main list of facets for navigation
   * @type {any[]}
   * @private
   */
  private _facets: any[] = [];

  /**
   * map of facets, converted to {_facets}
   * @type {Map<string, string[]>}
   * @private
   */
  private _facetMap: Map<string, string[]> = new Map<string, string[]>();

  private _facetObjMap: Map<string, Facet> = new Map<string, Facet>();

  /**
   * RxJs Behavior subject to broadcast changes in selected facets
   * @type {BehaviorSubject<any[]>}
   * @private
   */
  private _facetSource = new Subject<any[]>();

  /**
   * Observable stream for facet changes
   * @type {Observable<any[]>}
   */
  facets$ = this._facetSource.asObservable();

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
   * @param {string} path
   */
  navigate(params: any, path?: string): void {
    console.log(params);
      let q: string;
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
      console.log(params);
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

      if (q) {
        navigationExtras.queryParams.q = q;
        navigationExtras.queryParams.facet = params.length > 0 ? params : null;
      } else {
        navigationExtras.queryParams.facet = params.length > 0 ? params : null;
      }

      this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
    console.log(navigationExtras);
      if (path) { // move up a level
        this._router.navigate([path], navigationExtras);
      } else { // lateral navigation
        this._router.navigate([], navigationExtras);
      }
    }
}
