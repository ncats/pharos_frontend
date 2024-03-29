import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase} from '../../models/pharos-base';
import {Facet, Field} from '../../models/facet';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class SearchResolver  {

  /**
   * create services
   * @param {LoadingService} loadingService
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private router: Router
  ) {  }

  resolve(route: ActivatedRouteSnapshot): Observable<PharosBase[]> {
    const navigation = this.router.getCurrentNavigation();
    this.pharosApiService.flushData();
    return this.pharosApiService.searchQuery(route, navigation.extras.state)
      .pipe(
      map(res => {
        const output = JSON.parse(JSON.stringify(res.data));
        const targetFacets = [];
        const diseaseFacets = [];
        const ligandFacets = [];
        res.data.search.forEach(f => {
          switch (f.model) {
            case 'Target':
              targetFacets.push(new Facet(f));
              break;
            case 'Disease':
              diseaseFacets.push(new Facet(f));
              break;
            case 'Ligand':
              ligandFacets.push(new Facet(f));
              break;
          }
        });
        output.targetFacets = targetFacets;
        output.diseaseFacets = diseaseFacets;
        output.ligandFacets = ligandFacets;
        return output;
      }));
  }
}
