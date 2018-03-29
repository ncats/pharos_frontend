import { NgModule } from '@angular/core';
import {DataListResolver} from "./services/data-list.resolver";
import {RouterModule, Routes} from "@angular/router";
import {PharosMainComponent} from "./pharos-main.component";

const pharosMainRoutes: Routes = [
  {
    path: '',
     component: PharosMainComponent,
     resolve: {
       data: DataListResolver
     },
     // this reloads the component/resolver when the url changes from pagination or sort
     runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
]



@NgModule({
  imports: [
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataListResolver
  ],
  declarations: [

  ]
})
export class PharosMainRoutingModule { }
