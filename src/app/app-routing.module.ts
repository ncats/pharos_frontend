import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';



const ROUTES: Routes = [
  {
    path: 'index',
    loadChildren: './pharos-home/pharos-home.module#PharosHomeModule',
  },
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  { path: 'help',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'structure',
    component: StructureSearchPageComponent
  },
  { path: 'sketcher',
    redirectTo: '/structure',
    pathMatch: 'full'
  },
  {
    path: 'sequence',
    component: SequenceSearchPageComponent
  },
  {
    path: 'faq',
    component: FaqPageComponent
  },
  {
    path: 'api',
    component: ApiPageComponent
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
    path: 'ligands',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'ligands' }
  },
  {
    path: 'topics',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'topics' }
  },
  {
    path: 'search',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'search' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 120]
      })
  ],
  providers: [],
  entryComponents: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
