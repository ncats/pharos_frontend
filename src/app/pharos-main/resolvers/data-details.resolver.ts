import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {catchError, map} from 'rxjs/internal/operators';

/**
 * resolves the details for a specific object
 */
@Injectable()
export class DataDetailsResolver implements Resolve<any> {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
    constructor(
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
      const serializer: Serializer = route.data.serializer;
      return this.pharosApiService.getDetailsData(route.data.path, route.paramMap, route.data.fragments)
      .pipe(
        map(res =>  {
          const tobj = serializer.fromJson(res.data[route.data.path]);
          res.data[route.data.path] = tobj;
          res.data[`${[route.data.path]}Props`] = serializer._asProperties(tobj);
          return res.data;
        }),
        catchError(err => {
          console.error(JSON.stringify(err));
          return null;
        })
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
