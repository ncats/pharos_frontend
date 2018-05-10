import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable , of} from 'rxjs';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {PathResolverService} from '../../pharos-services/path-resolver.service';

@Injectable()
export class DataDetailsResolver implements Resolve<any> {

    constructor(private pathResolverService: PathResolverService,
                private loadingService: LoadingService,
                private pharosApiService: PharosApiService) {  }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      this.loadingService.toggleVisible(true);
      this.pathResolverService.setPath(route.data.path);
      this.pharosApiService.getDetails(route.data.path, route.paramMap);
         return of([]);
    }

    getDetailsByUrl(url: string, origin: string): void {
      this.pharosApiService.getDetailsByUrl(url, origin);
    }
}
