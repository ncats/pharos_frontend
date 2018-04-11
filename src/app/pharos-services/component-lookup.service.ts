import {Injectable, Type} from '@angular/core';
import {EnvironmentVariablesService} from "../pharos-services/environment-variables.service";

@Injectable()
export class ComponentLookupService {

  constructor(private environmentVariablesService: EnvironmentVariablesService) { }

/*  lookup(component: string): Type<any> {
  // return COMPONENTS.get(component);
  }*/

  lookupByPath(path: string, subpath: string): string {
   const ret =  this.environmentVariablesService.getComponents(path, subpath);
   console.log(ret);
   return ret;
  }
}

/*const COMPONENTS: Map<string, Type<any>> = new Map<string, any>(
  [
    ['TargetTableComponent', TargetTableComponent],
    ['TargetDetailsComponent', TargetDetailsComponent],
    ['TdarkViewerComponent', TdarkViewerComponent],
    ['TbioViewerComponent', TbioViewerComponent],
    ['TchemViewerComponent', TchemViewerComponent],
    ['TclinViewerComponent', TclinViewerComponent],
    ['DiseaseTableComponent', DiseaseTableComponent],
    ['DiseaseDetailsComponent', DiseaseDetailsComponent]
  ]
);*/
