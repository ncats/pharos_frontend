import {Injectable} from '@angular/core';
import {Facet} from '../../../models/facet';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PharosApiService} from "../../../pharos-services/pharos-api.service";

/**
 * Service to parse and filter facets from api responses
 */
@Injectable()
export class FacetRetrieverService {
  /**
   * array of facet objects
   */
  facets: Facet[];

  /**
   * map of facet names to facet
   * @type {Map<string, any>}
   */
  facetMap: Map<string, any> = new Map<string, any>();

  /**
   * wait for facets to be loaded before returning response
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  _loaded = new BehaviorSubject<boolean>(false);

  /**
   * return the facets map as behavior subject
   * @type {BehaviorSubject<any>}
   * @private
   */
  _facets = new BehaviorSubject<any>(this.facetMap);

  /**
   * observable to return loaded boolean
   * @type {Observable<boolean>}
   */
  loaded$ = this._loaded.asObservable();

  /**
   * observable to return facets array
   * @type {Observable<Facet[]>}
   */
  facets$ = this._facets.asObservable();

  /**
   * set up subscription to parse the response object from the response service
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private pharosApiService: PharosApiService
  ) {
    this.pharosApiService.facetsData$.subscribe(res => {
      res.forEach(facet => {
        this.facetMap.set(facet.name, facet);
      });
      this._facets.next(this.facetMap);
    });
  }

  // todo: pick one
  /**
   * return facets as a plain object
   * @param {string} name
   * @returns {any}
   */
  getFacet(name: string): any {
    return this.facetMap.get(name);
  }

  /**
   * return all facets
   * @return {Observable<any>}
   */
  getAllFacets(): Observable<any> {
    return this.facets$;
  }

  /**
   * return facets as an observable
   * @param {string} name
   * @returns {Observable<any>}
   */
  getFacetObservable(name: string): Observable<any> {
    if (name) {
      return this.facets$
        .pipe(
          map(res => {
            return res.get(name);
          })
        );
    }
  }
}
