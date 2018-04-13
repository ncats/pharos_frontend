import {Injectable, InjectionToken, Type} from '@angular/core';
import {EnvironmentVariablesService} from '../pharos-services/environment-variables.service';

@Injectable()
export class ComponentLookupService {

  constructor(private environmentVariablesService: EnvironmentVariablesService) { }

  // this is necessary to avoid circluar dependencies
  lookupByPath(path: string, subpath: string): any {
  return this.environmentVariablesService.getComponents(path, subpath);
  }
}
