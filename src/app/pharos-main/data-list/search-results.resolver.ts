import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';

/**
 * resolver to retrieve list of data happens on every main level (/targets, /diseases, /ligands, etc) change
 */
@Injectable()
export class SearchResultsResolver implements Resolve<any> {

  /**
   * create services
   * @param {PathResolverService} pathResolverService
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(private pathResolverService: PathResolverService,
              private loadingService: LoadingService,
              private pharosApiService: PharosApiService) {
  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api returns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<any[]>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    this.loadingService.toggleVisible(true);
    if (route.data.path === 'search' && !route.queryParamMap.get('q')) {
      this.pathResolverService.navigate('targets');
    } else {
      this.pathResolverService.setPath(route.data.path);
      return this.pharosApiService.search(route.queryParamMap);
    }
  }
}
