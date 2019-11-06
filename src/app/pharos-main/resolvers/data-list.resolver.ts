import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {map} from 'rxjs/internal/operators';
import {PharosBase, Serializer} from '../../models/pharos-base';
import {Facet} from '../../models/facet';
import {SelectedFacetService} from '../data-list/filter-panel/selected-facet.service';

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
   * call api
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<any[]>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase[]> {
      this.loadingService.toggleVisible(true);
      const serializer: Serializer = route.data.serializer;
      return this.pharosApiService.getGraphQlData(route.data.path, route.queryParamMap, route.data.fragments)
        .pipe(
          map(res =>  {
            res.data.results.facets = res.data.results.facets.map(facet => new Facet(facet));
            res.data.results[`${[route.data.path]}Props`] = [];
            res.data.results[route.data.path].map(obj => {
            const tobj = serializer.fromJson(obj);
              res.data.results[`${[route.data.path]}Props`].push(serializer._asProperties(tobj));
              return tobj;
            });
            return res.data.results;
          })
        );
  }
}
