import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DataLoaderService} from './data-loader.service';

@Injectable()
export class DataListResolver implements Resolve<any> {
    constructor(private dataLoaderService: DataLoaderService) {  }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
      console.log(route);
        return this.dataLoaderService.getData(route.url[0].path, route.queryParamMap);
    }
}
