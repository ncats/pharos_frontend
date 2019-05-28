import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {PharosBase} from "../../models/pharos-base";

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
      console.log("resolving")
      this.loadingService.toggleVisible(true);
      this.pharosApiService.flushData();
      this.pathResolverService.setPath(route.data.path);
      console.log("return resolve");
       return this.pharosApiService.getDataObject(route.data.path, route.paramMap);
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
