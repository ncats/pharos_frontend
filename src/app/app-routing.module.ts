import {Inject, Injectable, NgModule, PLATFORM_ID} from '@angular/core';
import {PreloadingStrategy, Route, RouterModule, Routes} from '@angular/router';
import {CommonModule, isPlatformServer} from '@angular/common';
import {CommonToolsModule} from './tools/common-tools.module';
import {SharedModule} from './shared/shared.module';
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
class PharosPreloader implements PreloadingStrategy {
  constructor(@Inject(PLATFORM_ID) private platformID: Object) {
  }

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (isPlatformServer(this.platformID)) {
      return of(null);
    }
    return route.data && route.data.preload ? fn() : of(null);
  }
}

const ROUTES: Routes = [
  {
    path: 'index',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pharos-home/pharos-home.module').then(m => m.PharosHomeModule),
    data: {path: 'home'}
  },
  {
    path: 'about',
    loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule)
  },
  {
    path: 'help',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'structure',
    loadChildren: () => import('./structure-search-page/structure-search-page.module').then(m => m.StructureSearchPageModule),
  },
  {
    path: 'sketcher',
    redirectTo: '/structure',
    pathMatch: 'full'
  },
  {
    path: 'sequence',
    loadChildren: () => import('./sequence-search-page/sequence-search.module').then(m => m.SequenceSearchModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq-page/faq-page.module').then(m => m.FaqPageModule)
  },
  {
    path: 'targets',
    loadChildren: () => import('./pharos-main/modules/targets/target-list.module').then(m => m.TargetTableModule),
    data: {
      path: 'targets',
      subpath: 'list',
      preload: true
    }
  },
  {
    path: 'targets/:id',
    loadChildren: () => import('./pharos-main/modules/targets/target-details.module').then(m => m.TargetDetailsModule),
    data: {
      path: 'targets',
      subpath: 'details',
      preload: true
    }
  },
  {
    path: 'diseases',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-list.module').then(m => m.DiseaseListModule),
    data: {
      path: 'diseases',
      subpath: 'list',
      preload: true
    }
  },
  {
    path: 'diseases/:id',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-details.module').then(m => m.DiseaseDetailsModule),
    data: {
      path: 'diseases',
      subpath: 'details',
      preload: true
    }
  },
  {
    path: 'ligands',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-list.module').then(m => m.LigandListModule),
    data: {
      path: 'ligands',
      subpath: 'list',
      preload: true
    }
  },
  {
    path: 'ligands/:id',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-details.module').then(m => m.LigandDetailsModule),
    data: {
      path: 'ligands',
      subpath: 'details',
      preload: true
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'api',
    loadChildren: () => import('./api-page/api-page.module').then(m => m.ApiPageModule),
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 120],
      initialNavigation: 'enabled',
      preloadingStrategy: PharosPreloader
    })
  ],
  providers: [PharosPreloader],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

