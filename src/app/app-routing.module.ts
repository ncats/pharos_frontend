import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToiDashboardComponent} from './pharos-topics/toi-dashboard/toi-dashboard.component';
import {PharosDashboardComponent} from './pharos-dashboard/pharos-dashboard.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {IdgLevelIndicatorComponent} from './tools/idg-level-indicator/idg-level-indicator.component';
import {DataListResolver} from "./pharos-main/services/data-list.resolver";



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
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'topics' }
  },
  {
    path: 'targets',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'targets' }
  }, {
    path: 'diseases',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'diseases' }
  }, {
    path: 'search',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'search' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  entryComponents: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
