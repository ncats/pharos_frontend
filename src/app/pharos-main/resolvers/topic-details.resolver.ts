
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {PharosBase} from '../../models/pharos-base';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * resolves the details for a specific object
 */
@Injectable()
export class TopicDetailsResolver implements Resolve<any> {

  /**
   * create services
   * @param {PathResolverService} pathResolverService
   * @param {LoadingService} loadingService
   * @param db
   * @param {PharosApiService} pharosApiService
   */
  constructor(private pathResolverService: PathResolverService,
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
    return of(
     //
      // this.db.collection('topics', ref => ref.where("topicId", "==", 1))
      this.db.collection('topics').doc(route.paramMap.get('id')).get()
    );
   //   .doc(route.paramMap.get('id')).get());
  }
}
