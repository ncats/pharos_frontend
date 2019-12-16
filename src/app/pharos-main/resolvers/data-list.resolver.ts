import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {concat, from, Observable, of, zip} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {concatMap, map, mergeMap, take, zipAll} from 'rxjs/internal/operators';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {Facet} from '../../models/facet';
import {SelectedFacetService} from '../data-list/filter-panel/selected-facet.service';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * resolver to retrieve list of data happens on every main level (/targets, /diseases, /ligands, etc) change
 */
@Injectable()
export class DataListResolver implements Resolve<Observable<any>> {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(
              private loadingService: LoadingService,
              private router: Router,
              private firebaseService: AngularFirestore,
              private pharosApiService: PharosApiService) {
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
      const docidObs = this.firebaseService.collection<any>('target-collection')
        .doc(docid)
        .valueChanges()
        .pipe(
          take(1),
          mergeMap( response => {
          return this.pharosApiService.getGraphQlData(route, {batchIds: response['targetList'].map(target => target.trim())})
        .pipe(
          map(res => {
            res.data.batch.results.facets = res.data.batch.results.facets.map(facet => new Facet(facet));
            res.data.batch.results[`${[route.data.path]}Props`] = [];
            res.data.batch.results[route.data.path].map(obj => {
              const tobj = serializer.fromJson(obj);
              res.data.batch.results[`${[route.data.path]}Props`].push(serializer._asProperties(tobj));
              return tobj;
            });
            return res.data.batch.results;
          })
          );
          })
        );
     return docidObs;
    } else {
      return this.pharosApiService.getGraphQlData(route, navigation.extras.state)
        .pipe(
          map(res => {
            res.data.batch.results.facets = res.data.batch.results.facets.map(facet => new Facet(facet));
            res.data.batch.results[`${[route.data.path]}Props`] = [];
            res.data.batch.results[route.data.path].map(obj => {
              const tobj = serializer.fromJson(obj);
              res.data.batch.results[`${[route.data.path]}Props`].push(serializer._asProperties(tobj));
              return tobj;
            });
            return res.data.batch.results;
          })
        );
    }
  }
}
