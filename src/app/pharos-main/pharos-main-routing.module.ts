import { NgModule } from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from "./data-list/target-table/target-table.component";
import {DataDetailsComponent} from "./data-details/data-details.component";
import {DataDetailsResolver} from "./services/data-details.resolver";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";

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
    },
  //  runGuardsAndResolvers: 'always'
     // this reloads the component/resolver when the url changes from pagination or sort
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
    DataDetailsResolver,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  entryComponents: [
    TargetTableComponent
  ],
  declarations: [

  ]
})
export class PharosMainRoutingModule { }
