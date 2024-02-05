import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {catchError, map} from 'rxjs/internal/operators';
import {isPlatformBrowser} from '@angular/common';
import {CentralStorageService} from '../../pharos-services/central-storage.service';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class DataDetailsResolver  {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
    constructor(
                private centralStorageService: CentralStorageService,
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
      let ret: Observable<PharosBase> = of({} as PharosBase);
      try {
        // @ts-ignore
        ret = this.pharosApiService.getDetailsData(route.data.path, route.paramMap, route.data.fragments)
          .pipe(
            map(res => {
              const path = route.data.path;
              const response = JSON.parse(JSON.stringify(res.data[path])); // copy readonly object
              if (!response) {
                return this.logError(route, {message: 'can\'t resolve'});
              }
              const retObj = {};
              const tobj = serializer.fromJson(response);
              retObj[path] = tobj;
              retObj[`${path}Props`] = serializer._asProperties(tobj);
              this.centralStorageService.setTourData('details', retObj);
              return retObj;
            }),
            catchError(err => {
              return this.logError(route, err);
            })
          );
      } catch (ex) {
        return this.logError(route, ex);
      }
      return ret;
    }

    logError(route: ActivatedRouteSnapshot, err: any): Observable<PharosBase> {
      let message = this.errorProperties(err);
      if (err.message === 'Cannot convert undefined or null to object' || err.message === 'can\'t resolve'){
        message = `Can\'t resolve ${route.data.path.slice(0, -1)} "${route.params?.id}"`;
      }
      if (isPlatformBrowser(this.platformID)) {
        alert(message);
      }
      else{
        console.log(this.errorProperties({
          params: route.params,
          fragment: route.fragment,
          data: route.data,
          queryParams: route.queryParams
        }));
        console.log(err);
      }
      return of({} as PharosBase);
    }

    errorProperties(err: any): string {
      let ret = '';
      for (const property in err) {
        ret = ret + `${property}: ${err[property]}\n`;
        if (err[property] instanceof Object) {
          for (const subprop in err[property]) {
            ret = ret + `    ${subprop}: ${err[property][subprop]}\n`;
            if (err[property][subprop] instanceof Object) {
              for (const subsubprop in err[property][subprop]) {
                ret = ret + `        ${subsubprop}: ${err[property][subprop][subsubprop]}\n`;
              }
            }
          }
        }
      }
      return ret;
    }
}
