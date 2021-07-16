import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {catchError, map, mergeMap, take} from 'rxjs/internal/operators';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {Facet} from '../../models/facet';
import {TargetListService} from '../../pharos-services/target-list.service';
import {isPlatformBrowser} from '@angular/common';

/**
 * resolver to retrieve list of data happens on every main level (/targets, /diseases, /ligands, etc) change
 */
@Injectable({
  providedIn: 'root'
})
export class DataListResolver implements Resolve<Observable<any>> {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private targetListService: TargetListService,
    private pharosApiService: PharosApiService,
    @Inject(PLATFORM_ID) private platformID: any) {
  }

  /**
   * toggle loading modal
   * call api
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<any[]>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase[]> {
    const navigation = this.router.getCurrentNavigation();
    this.loadingService.toggleVisible(true);
    const serializer: Serializer = route.data.serializer;
    if (route.queryParamMap.has('collection') && !navigation.extras.state) {
      const docid: string = route.queryParamMap.get('collection');
      const docidObs = this.targetListService.getList(docid)
        .pipe(
          take(1),
          mergeMap(targetList => {
            return this.pharosApiService.getGraphQlData(route, {batchIds: targetList});
          }))
        .pipe(
          map(res => {
            return this.parseResponse(route, res, serializer);
          }),
          catchError(err => {
            return this.logError(err);
          })
        );
      return docidObs;
    } else {
      return this.pharosApiService.getGraphQlData(route, navigation.extras.state)
        .pipe(
          map(res => {
            return this.parseResponse(route, res, serializer);
          }),
          catchError(err => {
            return this.logError(err);
          })
        );
    }
  }

  private logError(err) {
    const message = (err.message || 'no message') + '\n' + (err.stack || 'no stack trace');
    if (isPlatformBrowser(this.platformID)) {
      alert(JSON.stringify(message));
    } else {
      console.log(JSON.stringify(message));
    }
    return null;
  }

  private parseResponse(route: ActivatedRouteSnapshot, res, serializer: Serializer) {
    const path = route.data.path;
    const results: any = JSON.parse(JSON.stringify(res.data.batch.results));
    results.facets = results.facets.map(facet => new Facet(facet));
    results[`${[path]}Props`] = [];
    results[path] = results[path].map(obj => {
      const tobj = serializer.fromJson(obj);
      results[`${[path]}Props`].push(serializer._asProperties(tobj));
      return tobj;
    });
    if (serializer.parseExtras) {
      results.extras = serializer.parseExtras(results);
    }
    return results;
  }
}
