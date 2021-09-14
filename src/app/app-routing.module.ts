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
  {path: 'idg/api',          redirectTo: 'api'},
  {path: 'idg/targets',      redirectTo: 'targets'},
  {path: 'idg/targets/:id',  redirectTo: 'targets/:id'},
  {path: 'idg/diseases',     redirectTo: 'diseases'},
  {path: 'idg/diseases/:id', redirectTo: 'diseases/:id'},
  {path: 'idg/ligands',      redirectTo: 'ligands'},
  {path: 'idg/ligands/:id',  redirectTo: 'ligands/:id'},
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
    loadChildren: () => import('./about-page/about-page.module').then(m => m.AboutPageModule),
    data: {title: 'About'}
  },
  {
    path: 'changelog',
    loadChildren: () => import('./changelog/changelog.module').then(m => m.ChangelogModule),
    data: {title: 'Changelog'}
  },
  {
    path: 'help',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'structure',
    loadChildren: () => import('./structure-search-page/structure-search-page.module').then(m => m.StructureSearchPageModule),
    data: {title: 'Structure Search'}
  },
  {
    path: 'sketcher',
    redirectTo: '/structure',
    pathMatch: 'full'
  },
  {
    path: 'sequence',
    loadChildren: () => import('./sequence-search-page/sequence-search.module').then(m => m.SequenceSearchModule),
    data: {title: 'Sequence Search'}
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq-page/faq-page.module').then(m => m.FaqPageModule),
    data: {title: 'Frequently Asked Questions'}
  },
  {
    path: 'search',
    loadChildren: () => import('./pharos-main/modules/search/search.module').then(m => m.SearchModule),
    data: {
      path: 'search',
      subpath: 'list',
      preload: true,
      title: 'Search Results for Targets, Ligands, and Diseases'
    }
  },
  {
    path: 'targets',
    loadChildren: () => import('./pharos-main/modules/targets/target-list.module').then(m => m.TargetTableModule),
    data: {
      path: 'targets',
      subpath: 'list',
      preload: true,
      title: 'Target List'
    }
  },
  {
    path: 'targets/:id',
    loadChildren: () => import('./pharos-main/modules/targets/target-details.module').then(m => m.TargetDetailsModule),
    data: {
      path: 'targets',
      subpath: 'details',
      preload: true,
      title: 'Target Details'
    }
  },
  {
    path: 'diseases',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-list.module').then(m => m.DiseaseListModule),
    data: {
      path: 'diseases',
      subpath: 'list',
      preload: true,
      title: 'Disease List'
    }
  },
  {
    path: 'diseases/:id',
    loadChildren: () => import('./pharos-main/modules/diseases/disease-details.module').then(m => m.DiseaseDetailsModule),
    data: {
      path: 'diseases',
      subpath: 'details',
      preload: true,
      title: 'Disease Details'
    }
  },
  {
    path: 'ligands',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-list.module').then(m => m.LigandListModule),
    data: {
      path: 'ligands',
      subpath: 'list',
      preload: true,
      title: 'Ligand List'
    }
  },
  {
    path: 'ligands/:id',
    loadChildren: () => import('./pharos-main/modules/ligands/ligand-details.module').then(m => m.LigandDetailsModule),
    data: {
      path: 'ligands',
      subpath: 'details',
      preload: true,
      title: 'Ligand Details'
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'api',
    loadChildren: () => import('./api-page/api-page.module').then(m => m.ApiPageModule),
    data: {title: 'GraphQL API'}
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
      scrollPositionRestoration: 'top',
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

