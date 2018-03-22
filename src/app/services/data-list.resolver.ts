import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {TablePaginationService} from "./table-pagination.service";
import {of} from "rxjs/observable/of";
import {FacetService} from "./facet.service";
import {PharosApiService} from "./pharos-api.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class DataListResolver implements Resolve<any> {

    constructor(private tablePaginationService: TablePaginationService,
                private loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      console.log(route);
      this.loadingService.toggleVisible(true);
     // this.tablePaginationService.navigateTo(route.url[0].path, route.queryParamMap);
      this.pharosApiService.getData(route.url[0].path, route.queryParamMap);
         return of([]);
    }
}
