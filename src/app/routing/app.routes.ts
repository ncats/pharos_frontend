import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [{path: 'idg/api',          redirectTo: 'api'},
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
        loadComponent: () => import('../pharos-home/pharos-home.component').then(m => m.PharosHomeComponent),
        data: {path: 'home'}
    },
    {
        path: 'toolbox',
        loadComponent: () => import('../api-tools/toolbox/toolbox.component').then(m => m.ToolboxComponent),
        data: {
            title: 'Tools for integrating data into Pharos',
            path: 'toolbox'
        }
    },
    {
        path: 'about',
        loadChildren: () => import('./about-page.routes').then(m => m.routes),
        data: {title: 'About'}
    },
    {
        path: 'changelog',
        loadComponent: () => import('../changelog/changelog.component').then(m => m.ChangelogComponent),
        data: {title: 'Changelog'}
    },
    {
        path: 'help',
        redirectTo: '/about',
        pathMatch: 'full'
    },
    {
        path: 'structure',
        loadComponent: () => import('../structure-search-page/structure-search-page.component').then(m => m.StructureSearchPageComponent),
        data: {title: 'Structure Search'}
    },
    {
        path: 'sketcher',
        redirectTo: '/structure',
        pathMatch: 'full'
    },
    {
        path: 'sequence',
        loadComponent: () => import('../sequence-search-page/sequence-search-page.component').then(m => m.SequenceSearchPageComponent),
        data: {title: 'Sequence Search'}
    },
    {
        path: 'faq',
        loadComponent: () => import('../faq-page/faq-page.component').then(m => m.FaqPageComponent),
        data: {title: 'Frequently Asked Questions'}
    },
    {
        path: 'usecases',
        loadComponent: () => import('../use-cases/use-cases.component').then(m => m.UseCasesComponent),
        data: {title: 'Use Cases'}
    },
    {
        path: 'usecases/:id',
        loadComponent: () => import('../use-cases/use-cases.component').then(m => m.UseCasesComponent),
        data: {title: 'Use Cases'}
    },
    {
        path: 'search',
        loadChildren: () => import('./search-page.routes').then(m => m.routes),
        data: {
            path: 'search',
            subpath: 'list',
            preload: true,
            title: 'Search Results for Targets, Ligands, and Diseases'
        }
    },
    {
        path: 'analyze/targets',
        loadChildren: () => import('./analyze-list.routes').then(m => m.routes),
        data: {
            path: 'targets',
            subpath: 'analyze',
            preload: true
        }
    },
    {
        path: 'analyze/diseases',
        loadChildren: () => import('./analyze-list.routes').then(m => m.routes),
        data: {
            path: 'diseases',
            subpath: 'analyze',
            preload: true
        }
    },
    {
        path: 'analyze/ligands',
        loadChildren: () => import('./analyze-list.routes').then(m => m.routes),
        data: {
            path: 'ligands',
            subpath: 'analyze',
            preload: true
        }
    },
    {
        path: 'targets',
        loadChildren: () => import('./target-list.routes').then(m => m.routes),
        data: {
            path: 'targets',
            subpath: 'list',
            preload: true,
            title: 'Target List'
        }
    },
    {
        path: 'targets/:id',
        loadChildren: () => import('./target-details.routes').then(m => m.routes),
        data: {
            path: 'targets',
            subpath: 'details',
            preload: true,
            title: 'Target Details'
        }
    },
    {
        path: 'diseases',
        loadChildren: () => import('./disease-list.routes').then(m => m.routes),
        data: {
            path: 'diseases',
            subpath: 'list',
            preload: true,
            title: 'Disease List'
        }
    },
    {
        path: 'diseases/:id',
        loadChildren: () => import('./disease-details.routes').then(m => m.routes),
        data: {
            path: 'diseases',
            subpath: 'details',
            preload: true,
            title: 'Disease Details'
        }
    },
    {
        path: 'ligands',
        loadChildren: () => import('./ligand-list.routes').then(m => m.routes),
        data: {
            path: 'ligands',
            subpath: 'list',
            preload: true,
            title: 'Ligand List'
        }
    },
    {
        path: 'ligands/:id',
        loadChildren: () => import('./ligand-details.routes').then(m => m.routes),
        data: {
            path: 'ligands',
            subpath: 'details',
            preload: true,
            title: 'Ligand Details'
        }
    },
    {
        path: 'profile',
        loadComponent: () => import('../profile/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'api',
        loadComponent: () => import('../api-page/api-page.component').then(m => m.ApiPageComponent),
        data: {title: 'GraphQL API'}
    },
    {
        path: 'stats',
        loadComponent: () => import('../stats-page/stats-page.component').then(m => m.StatsPageComponent),
        data: {title: 'Feature Usage Statistics'}
    },
    { path: 'sitemap',
        loadComponent: () => import('../sitemap-page/sitemap-page.component').then(m => m.SitemapPageComponent),
        data: {title: 'Sitemap'}
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
