import { NgModule } from '@angular/core';
import {PharosDashboardComponent} from './pharos-dashboard/pharos-dashboard.component';
import {RouterModule, Routes} from "@angular/router";



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
    loadChildren: './pharos-topics/pharos-topics.module#PharosTopicsModule',
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
