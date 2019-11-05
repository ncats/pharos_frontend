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

  // this handles graphql facet object, parses them to the url, and stores them as separate objects
  setFacets(facetObj: any) {
    const facet: Facet = this._facetObjMap.get(facetObj.name);
    if (facet) {
      if (facetObj.change.added) {
    facet.values = [...new Set(facet.values.concat(facetObj.change.added.map(add => add = new Field({name: add}))))];
        this._facetObjMap.set(facetObj.name, facet);
      }
        if (facetObj.change.removed) {
          facet.values = facet.values.map(value => value.name)
            .filter(val => ! facetObj.change.removed.includes(val))
            .map(newVal =>  new Field({name: newVal}));
          this._facetObjMap.set(facetObj.name, facet);
           }
      this._facetObjMap.set(facetObj.name, facet);
    } else {
      this._facetObjMap.set(facetObj.name,
        new Facet({facet: facetObj.name, values: facetObj.change.added.map(field => field = {name: field})})
      );
    }
    this.getFacetsAsUrlStrings();
  }

  getFacetsAsUrlStrings(): string[] {
    const retArr: string[] = [];
    const facets: Facet[] = Array.from(this._facetObjMap.values());
    facets.forEach(facet => facet.values.forEach(value => retArr.push(this._makeFacetString(facet.facet, value.name))));
    console.log(retArr);
    return retArr;
  }

  getFacetsAsObjects(): Facet[] {
    return Array.from(this._facetObjMap.values());
  }




  /**
   * creates url string to pass as a quey parameter from a list of facets
   * creates {Router} {NavigationExtras} object
   * navigates to url, which updates data
   * optional path allows traversal up the path
   * @param {string} path
   */
  navigate(path?: string): void {
      const facetList = this.getFacetsAsUrlStrings();
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
      console.log(facetList);
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
        navigationExtras.queryParams.facet = facetList.length > 0 ? facetList : null;
      } else {
        navigationExtras.queryParams.facet = facetList.length > 0 ? facetList : null;
      }

      this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
    console.log(navigationExtras);
      if (path) { // move up a level
        this._router.navigate([path], navigationExtras);
      } else { // lateral navigation
        this._router.navigate([], navigationExtras);
      }
    }

  /**
   * converts a facet name and field into url readable string
   * @param {string} facet
   * @param {string} field
   * @returns {string}
   * @private
   */
  private _makeFacetString(facet: string, field: string): string {
    return facet.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString());
  }

  /**
   * this converts previous queries into an array of object that can be consumed by a component
   * gets {ParamMap} from {Route} snapshot and converts it to a map
   * @param {ParamMap} map
   */
  mapToFacets(map: ParamMap): void {
    if (map.keys.length === 0) {
      this._facetMap.clear();
    } else {
      const fList = map.getAll('facet');
      fList.forEach(facet => {
        const fArr = facet.split('/');
        const facetName: string = fArr[0].replace(/\+/g, ' ');
        const fieldName: string = decodeURI(fArr[1])
          .replace('%2F', '/')
          .replace('%2C', ',')
          .replace('%3A', ':');
        const fields = this._facetMap.get(facetName);
        if (fields) {
          fields.push(fieldName);
          this._facetMap.set(facetName, Array.from(new Set(fields)));
        } else {
          this._facetMap.set(facetName, [fieldName]);
        }
      });
      let qList = map.getAll('q');
      // this cleans up the emtpy searches that return blank facets
      if (qList.length > 0) {
        qList = qList.map(q => q.replace(/"/g, '').replace(/\+/g, ' '));
        if (qList[0].includes('etag')) {
          this._facetMap.set('etag', [qList[0].split(':')[1]]);
        } else {
          this._facetMap.set('query', qList);
        }
      }
      this._flattenMap();
    }
  }

  /**
   * takes a listof facet changes and adds them to the main facet map
   * clears duplicates
   * @param facet
   */
  mapSelection(facet: any): void {
    console.log(facet);
    let fields = this._facetMap.get(facet.name);
    if (fields) {
      if (facet.change.removed) {
        fields = fields.filter(field => {
          return !facet.change.removed.includes(field);
        });
      }
      fields.push(...facet.change.added);
      this._facetMap.set(facet.name, Array.from(new Set(fields)));
    } else {
      this._facetMap.set(facet.name, facet.change.added);
    }
    this._flattenMap();
  }

  /**
   * converts facet map which prevents duplicates to an array of facets
   * broadcasts array to subscribers
   * @private
   */
  private _flattenMap(): void {
    this._facets = [];
    this._facetMap.forEach((value, key) => {
      if (value.length > 0) {
        this._facets.push({facet: key, values: value});
      }
    });
    this._facetSource.next(this._facets);
  }

  /**
   * remove entire group of facet values from query string
   * @param facet
   */
  removefacetFamily(facet: any ): void {
    this._facetMap.delete(facet.facet);
    this._flattenMap();
  }

  /**
   * remove specific filter/query field from url
   * delete tracked facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: any, field: string ): void {
    const ffields = this._facetMap.get(facet).filter(fField => fField !== field);
    if (ffields.length > 0) {
      this._facetMap.set(facet, ffields);
    } else {
      this._facetMap.delete(facet);
    }
    this._flattenMap();
  }

  /**
   * removes all facets from the service
   * broadcasts empty facets to subscribers
   * navigates to url without parameters
   */
  removeAll(): void {
    this._facets = [];
    this._facetMap.clear();
    this._facetSource.next(this._facets);
    this.navigate();
  }


}
