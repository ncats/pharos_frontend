import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';
import {PharosMainComponent} from "./pharos-main/pharos-main.component";


const ROUTES: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./pharos-home/pharos-home.module').then(m => m.PharosHomeModule),
    data: { path: 'home' }
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
 /* {
    path: 'search',
    loadChildren: () => import('./pharos-main/modules/search/search.module').then(m => {
      console.log(m);
      return m.SearchModule
    }),
    data: { path: 'search' }
  },*/
  {
    path: 'topics',
    loadChildren: () => import('./pharos-main/modules/topics/topics.module').then(m => m.TopicsModule),
    data: { path: 'topics' }
  },
  {
    path: 'targets',
    loadChildren: () => import('./pharos-main/modules/targets/targets.module').then(m => m.TargetsModule),
    data: { path: 'targets' }
  }, {
    path: 'diseases',
    loadChildren: () => import('./pharos-main/modules/diseases/diseases.module').then(m => m.DiseasesModule),
    data: { path: 'diseases' }
  }, {
    path: 'ligands',
    loadChildren: () => import('./pharos-main/modules/ligands/ligands.module').then(m => m.LigandsModule),
    data: { path: 'ligands' }
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
      // preloadingStrategy: PreloadAllModules
      })
  ],
  providers: [],
  entryComponents: [],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
