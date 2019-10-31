import {Injectable} from '@angular/core';
import {Facet} from '../../../models/facet';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {PharosProfileService} from '../../../auth/pharos-profile.service';

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
   * @param profileService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private profileService: PharosProfileService
  ) {
    this.pharosApiService.facetsData$.subscribe(res => {
      if (res) {
        res.forEach(facet => {
          this.facetMap.set(facet.facet, facet);
        });
        this._facets.next(this.facetMap);
      }
    });
    this.profileService.profile$.subscribe(user => {
      if (user && user.data().savedTargets) {
        this.facetMap.set(user.data().savedTargets.name, user.data().savedTargets);
        this._facets.next(this.facetMap);
      } else {
        this.facetMap.delete('etag');
        this._facets.next(this.facetMap);
      }
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
