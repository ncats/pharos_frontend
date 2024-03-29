import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {PharosConfig} from '../../../config/pharos-config';
import {PharosPanel} from '../../../config/components-config';

/**
 * resolves the details for a specific object
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentsResolver  {

  /**
   * create services
   * @param pharosConfig
   */
    constructor(
      private pharosConfig: PharosConfig
  ) {}

  /**
   * retrieve components for section based on path and subpath
   * @param {ActivatedRouteSnapshot} route
   * @returns {Observable<PharosBase>}
   */
    resolve(route: ActivatedRouteSnapshot): Observable<PharosPanel[]> {
      return of(this.pharosConfig.getComponents(route.data.path, route.data.subpath));
    }
}
