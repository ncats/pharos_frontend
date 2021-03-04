import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {catchError, map} from 'rxjs/internal/operators';
import {isPlatformBrowser} from '@angular/common';

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
                private pharosApiService: PharosApiService,
                @Inject(PLATFORM_ID) private platformID: any) {  }

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
          const path = route.data.path;
          const response = JSON.parse(JSON.stringify(res.data[path])); // copy readonly object
          if (!response){
            return this.logError(route, {message: 'can\'t resolve'});
          }
          const retObj = {};
          const tobj = serializer.fromJson(response);
          retObj[path] = tobj;
          retObj[`${path}Props`] = serializer._asProperties(tobj);
          return retObj;
        }),
        catchError(err => {
          return this.logError(route, err);
        })
      );
    }

    logError(route: ActivatedRouteSnapshot, err: any){
      let message = JSON.stringify(err);
      if (err.message === 'Cannot convert undefined or null to object' || err.message === 'can\'t resolve'){
        message = `Can\'t resolve ${route.data.path.slice(0, -1)} "${route.params?.id}"`;
      }
      if (isPlatformBrowser(this.platformID)) {
        alert(message);
      }
      else{
        console.log(message);
      }
      return null;
    }
}
