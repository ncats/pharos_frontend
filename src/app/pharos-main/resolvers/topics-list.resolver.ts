import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {Message} from '../../pharos-home/news-panel/news-panel.component';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * resolver to retrieve list of data happens on every main level (/targets, /diseases, /ligands, etc) change
 */
@Injectable()
export class TopicsListResolver implements Resolve<any> {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param db
   * @param {PharosApiService} pharosApiService
   */
    constructor(
                private loadingService: LoadingService,
                private db: AngularFirestore,
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
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      this.loadingService.toggleVisible(true);

    return of(this.db.collection<any>('topics', ref => ref.where('topicId', '==', 1)));


   //   return this.pharosApiService.getData(route.data.path, route.queryParamMap);
  }
}
