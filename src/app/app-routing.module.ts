import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";



const ROUTES: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./pharos-home/pharos-home.module').then(m => m.PharosHomeModule),
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
    loadChildren: () => import('./pharos-main/pharos-main.module').then(m => m.PharosMainModule),
    data: { path: 'targets' }
  }, {
    path: 'diseases',
    loadChildren: () => import('./pharos-main/pharos-main.module').then(m => m.PharosMainModule),
    data: { path: 'diseases' }
  }, {
    path: 'ligands',
    loadChildren: () => import('./pharos-main/pharos-main.module').then(m => m.PharosMainModule),
    data: { path: 'ligands' }
  },
  {
    path: 'topics',
    loadChildren: () => import('./pharos-main/pharos-main.module').then(m => m.PharosMainModule),
    data: { path: 'topics' }
  },
  {
    path: 'search',
    loadChildren: () => import('./pharos-main/pharos-main.module').then(m => m.PharosMainModule),
    data: { path: 'search' }
  },
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/index'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      //onSameUrlNavigation: 'reload',
      scrollOffset: [0, 120],
      preloadingStrategy: PreloadAllModules
      })
  ],
  providers: [],
  entryComponents: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
