import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {of} from "rxjs/observable/of";
import {PharosApiService} from "./pharos-api.service";
import {LoadingService} from "./loading.service";
import {PathResolverService} from "./path-resolver.service";

@Injectable()
export class DataListResolver implements Resolve<any> {

    constructor(private pathResolverService: PathResolverService,
                private loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      this.loadingService.toggleVisible(true);
      this.pathResolverService.setPath(route.url[0].path);
      this.pharosApiService.getData(route.url[0].path, route.queryParamMap);
         return of([]);
    }
}
