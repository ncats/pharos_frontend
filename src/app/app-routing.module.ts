import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';
import {PharosMainComponent} from "./pharos-main/pharos-main.component";
import {DataDetailsResolver} from "./pharos-main/resolvers/data-details.resolver";
import {DataDetailsComponent} from "./pharos-main/data-details/data-details.component";


const ROUTES: Routes = [
  { path: 'index',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
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
  {
    path: 'search',
    loadChildren: () => import('./pharos-main/modules/search/search.module').then(m => m.SearchModule),
    data: { path: 'search' }
  },
  {
    path: 'topics',
    loadChildren: () => import('./pharos-main/modules/topics/topic-list.module').then(m => m.TopicListModule),
    data: { path: 'topics' }
  },
  {
    path: 'topics/:id',
    loadChildren: () => import('./pharos-main/modules/topics/topic-details.module').then(m => m.TopicDetailsModule),
    data: { path: 'topics' }
  },
  {
    path: 'targets',
    loadChildren: () => import('./pharos-main/modules/targets/target-list.module').then(m => m.TargetTableModule),
    data: { path: 'targets' }
  },
  {
    path: 'targets/:id',
    loadChildren: () => import('./pharos-main/modules/targets/target-details.module').then(m => m.TargetDetailsModule),
    data: { path: 'targets' }
  },
  {
    path: 'diseases',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-list.module').then(m => m.DiseaseListModule),
    data: { path: 'diseases' }
  },
  {
    path: 'diseases/:id',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-details.module').then(m => m.DiseaseDetailsModule),
    data: { path: 'diseases' }
  },
  {
    path: 'ligands',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-list.module').then(m => m.LigandListModule),
    data: { path: 'ligands' }
  },
  {
    path: 'ligands/:id',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-details.module').then(m => m.LigandDetailsModule),
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
