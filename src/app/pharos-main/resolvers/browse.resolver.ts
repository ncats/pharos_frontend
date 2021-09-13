import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosBase} from '../../models/pharos-base';
import {map} from 'rxjs/internal/operators';
import {Facet, Field} from '../../models/facet';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class BrowseResolver implements Resolve<any> {

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
    return this.pharosApiService.browseQuery(route, navigation.extras.state)
      .pipe(
      map(res => {
        const output = JSON.parse(JSON.stringify(res.data));
        function pushValue(facet, val) {
          const existingField = facet.values.find(v => v.name === val);
          if (existingField) {
            existingField.count++;
          } else {
            facet.values.push(new Field({name: val, count: 1}));
          }
        }
        const entityFacet = new Facet({facet: 'Type', elapsedTime: 0, noNavigate: true, singleResponse: true});

        output.targets.facets = output.targets.facets.map(f => new Facet(f));

        entityFacet.values = [
          // {name: 'Ligands', count: output.ligands.count},
          // {name: 'Targets', count: output.targets.count},
          // {name: 'Diseases', count: output.diseases.count},
        ];

        output.browse?.entries?.forEach(entry => {
          pushValue(entityFacet, entry.entityType);
        });
        entityFacet.values.sort((a, b) => b.count - a.count);
        output.facets = [entityFacet];
        return output;
      }));
  }
}
