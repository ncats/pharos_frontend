import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {map} from 'rxjs/internal/operators';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class QueryResolver  {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private pharosApiService: PharosApiService
  ) {  }

  /**
   * toggle loading modal
   * set path todo: see how much this is still used
   * call api - api returns through different subscriptions, so the data ins't actually returned here
   * hence the empty observable returned
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<PharosBase>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase> {
    this.pharosApiService.flushData();
    const serializer: Serializer = route.data.serializer;
    let ret = of({} as PharosBase);
    try {
      ret = this.pharosApiService.adHocQuery(route.data.fragments.query)
        .pipe(
          map(res => {
            let data = JSON.parse(JSON.stringify(res.data)); // copy readonly object
            const results = data[route.data.rootObject];
            if (Array.isArray(results)) {
              data[`${[route.data.rootObject]}Props`] = [];
              data[route.data.rootObject] = data[route.data.rootObject].map(obj => {
                const tobj = serializer.fromJson(obj);
                data[`${[route.data.rootObject]}Props`].push(serializer._asProperties(tobj));
                return tobj;
              });
            } else {
              const tobj = serializer.fromJson(route.data.rootObject ? data[route.data.rootObject] : data);
              route.data.rootObject ? data[route.data.rootObject] = tobj : data = tobj;
              data[`${[route.data.rootObject]}Props`] = serializer._asProperties(tobj);
            }
            return data;
          })
        );
    } catch (ex) {
      console.log('failed adHocQuery');
      console.log({
        params: route.params,
        fragment: route.fragment,
        data: route.data,
        queryParams: route.queryParams
      });
      console.log(ex);
    }
    return ret;
  }
}
