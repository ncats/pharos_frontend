import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {PharosBase} from '../../models/pharos-base';
import {map} from 'rxjs/internal/operators';

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
                public loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api returns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<PharosBase>}
   */
    resolve(route: ActivatedRouteSnapshot): Observable<PharosBase> {
      this.loadingService.toggleVisible(true);
      this.pharosApiService.flushData();
      console.log(route);
    //  this.pathResolverService.setPath(route.data.path);
     // return this.pharosApiService.getDataObject(route.data.path, route.paramMap);
    return this.pharosApiService.getDetailsData(route.data.path, route.paramMap, route.data.fragments)
      .pipe(
        map(res =>  res.data[route.data.path])
      );
    }

  /**
   *  calls a specific url to retrieve data
   *  todo: this may not be needed after May 2019 pharosconfig changes
   *  originally done to avoid circular dependencies
   * @param {string} url
   * @param {string} origin
   */
    getDetailsByUrl(url: string, origin: string): void {
      this.pharosApiService.getDetailsByUrl(url, origin);
    }
}
