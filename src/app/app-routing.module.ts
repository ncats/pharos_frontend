import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToiDashboardComponent} from './pharos-dashboard/toi-dashboard/toi-dashboard.component';
import {PharosDashboardComponent} from './pharos-dashboard/pharos-dashboard.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {IdgLevelIndicatorComponent} from './tools/idg-level-indicator/idg-level-indicator.component';



const ROUTES: Routes = [
  {
    path: 'index',
    component: PharosDashboardComponent
  },
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'topics',
    component: ToiDashboardComponent
  },
  {
    path: 'targets',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'targets' }

   /* component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'*/
  }, {
    path: 'diseases',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'diseases' }

  /*  component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'*/
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  entryComponents: [IdgLevelIndicatorComponent],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
