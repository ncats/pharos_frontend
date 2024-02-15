import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PharosBase} from '../../models/pharos-base';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyzeResolver implements Resolve<any> {

  /**
   * create services
   */
  constructor(
  ) {  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api returns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<PharosBase>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase[]> {
    return of([new PharosBase()]);
  }
}
