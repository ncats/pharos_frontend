import {Injectable, InjectionToken, Type} from '@angular/core';
import {EnvironmentVariablesService} from '../pharos-services/environment-variables.service';

/**
 * lookup component list from environment
 * todo: double check what is using it down the line this may be able to be merged into environment (it was taken out for a reason...)
 */
@Injectable()
export class ComponentLookupService {

  /**
   * initialize services
   * @param {EnvironmentVariablesService} environmentVariablesService
   */
  constructor(private environmentVariablesService: EnvironmentVariablesService) { }

  /**
   * get components from environment service
   * this is necessary to avoid circluar dependencies
   * @param {string} path
   * @param {string} subpath
   * @returns {any}
   */
  lookupByPath(path: string, subpath: string): any {
  return this.environmentVariablesService.getComponents(path, subpath);
  }
}
