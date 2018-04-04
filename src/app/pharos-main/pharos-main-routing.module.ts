import { NgModule } from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from "./data-list/target-table/target-table.component";
import {DataDetailsComponent} from "./data-details/data-details.component";
import {DataDetailsResolver} from "./services/data-details.resolver";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {TargetDetailsComponent} from "./data-details/target-details/target-details.component";
import {TdarkViewerComponent} from "./data-details/target-details/tdark-viewer/tdark-viewer.component";
import {TbioViewerComponent} from "./data-details/target-details/tbio-viewer/tbio-viewer.component";
import {TchemViewerComponent} from "./data-details/target-details/tchem-viewer/tchem-viewer.component";
import {TclinViewerComponent} from "./data-details/target-details/tclin-viewer/tclin-viewer.component";

const pharosMainRoutes: Routes = [
  {
    path: '',
     component: PharosMainComponent,
     resolve: {
       data: DataListResolver
     },
     // this reloads the component/resolver when the url changes from pagination or sort
     runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }, {
    path: ':id',
     component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];



@NgModule({
  imports: [
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataListResolver,
    DataDetailsResolver
  ],
  entryComponents: [
    TargetTableComponent,
    TargetDetailsComponent,
    TdarkViewerComponent,
    TbioViewerComponent,
    TchemViewerComponent,
    TclinViewerComponent
  ],
  declarations: [

  ]
})
export class PharosMainRoutingModule { }
