import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from "../../data-details/data-details.resolver";
import {DataDetailsComponent} from "../../data-details/data-details.component";

const routes: Routes = [
  {
    path: '',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseDetailsRoutingModule { }
