import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';

/**
 * resolves the details for a specific object
 */
@Injectable()
export class DataDetailsResolver implements Resolve<any> {

  /**
   * create services
   * @param {PathResolverService} pathResolverService
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
    constructor(private pathResolverService: PathResolverService,
                private loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api retruns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<any[]>}
   */
    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      console.log("going in")
      this.loadingService.toggleVisible(true);
      this.pharosApiService.flushData();
      this.pathResolverService.setPath(route.data.path);
      this.pharosApiService.getDetails(route.data.path, route.paramMap);
         return of([]);
    }

  /**
   * get specific deetails from an object,
   * todo: this may not be the best place for this, but this is the primary way the api is called
   * @param {string} url
   * @param {string} origin
   */
    getDetailsByUrl(url: string, origin: string): void {
      this.pharosApiService.getDetailsByUrl(url, origin);
    }
}
