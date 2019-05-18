import {Injectable} from '@angular/core';
import {Facet} from '../../../models/facet';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PharosApiService} from "../../../pharos-services/pharos-api.service";

/**
 * Service to parse and filter facets from api responses
 */
@Injectable({
  providedIn: 'root'
})
export class FacetRetrieverService {

  /**
   * map of facet names to facet
   * @type {Map<string, any>}
   */
  facetMap: Map<string, Facet> = new Map<string, Facet>();

  /**
   * return the facets map as behavior subject
   * @type {Subject<any>}
   * @private
   */
  _facets = new BehaviorSubject<Map<string, Facet>>(null);

  /**
   * observable to return facets array
   * @type {Observable<Facet[]>}
   */
  facets$ = this._facets.asObservable();

  /**
   * set up subscription to parse the response object from the response service
   * @param {PharosApiService} pharosApiService
   */
  constructor(private pharosApiService: PharosApiService) {
    this.pharosApiService.facetsData$.subscribe(res => {
      res.forEach(facet => {
        this.facetMap.set(facet.name, facet);
      });
      this._facets.next(this.facetMap);
    });
  }

  /**
   * return all facets
   * @return {Observable<any>}
   */
  getAllFacets(): Observable<Map<string, Facet>> {
    return this.facets$;
  }
}
