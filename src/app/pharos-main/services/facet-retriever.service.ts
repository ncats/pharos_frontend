import { Injectable } from '@angular/core';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {Facet} from '../../models/facet';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

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
   * wait for facets to be loaded before returning response
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  _loaded = new BehaviorSubject<boolean>(false);

  /**
   * facets subject
   * @type {BehaviorSubject<Facet[]>}
   * @private
   */
  _facets = new BehaviorSubject<Facet[]>([]);

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
   * @param {ResponseParserService} responseParserService
   */
  constructor(private responseParserService: ResponseParserService) {
    this.responseParserService.facetsData$.subscribe(res => {
      console.log(res);
     // this.facets = res;
     // this._loaded.next(true);
      this._facets.next(res);
    });
  }

  // todo: pick one
  /**
   * return facets as a plain object
   * @param {string} name
   * @returns {any}
   */
  getFacet(name: string): any {
    return this.facets.filter(facet => facet.name === name).pop();
  }

  getAllFacets(): Observable<any> {
    return this.facets$
  }

  /**
   * return facets as an observable
   * @param {string} name
   * @returns {Observable<any>}
   */
  getFacetObservable(name: string): Observable<any> {
    return this.facets$
      .pipe(
        map(res => {
        if (res.length > 0) {
          const fac = res.filter(facet => facet.name === name).pop();
         if (fac) {
           return fac;
         }
        }
      })
    );
  }

}
