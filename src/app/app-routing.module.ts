import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataListResolver} from './services/data-list.resolver';
import {DataListComponent} from "./data-list/data-list.component";
import {HomeDashboardComponent} from "src/app/home-dashboard/home-dashboard.component";



const ROUTES: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    resolve: {
      data: DataListResolver
    },
  },
  {
    path: 'targets',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },{
    path: 'diseases',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    DataListResolver
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
