import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';

/**
 * resolver to retrieve list of data happens on every main level (/targets, /diseases, /ligands, etc) change
 */
@Injectable()
export class DataListResolver implements Resolve<any> {

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
      this.loadingService.toggleVisible(true);
      this.pathResolverService.setPath(route.data.path);
      this.pharosApiService.getData(route.data.path, route.queryParamMap);
         return of([]);
    }

  /**
   * get specific deetails from an object,
   * todo: this may not be the best place for this, but this is the primary way the api is called without a url change
   * @param {string} url
   * @param {string} origin
   */
  getDataByUrl(url: string): void {
    this.pharosApiService.getDataByUrl(url);
  }
}
