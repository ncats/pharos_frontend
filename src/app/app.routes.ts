import {Routes} from '@angular/router';
import {PharosHomeComponent} from './pharos-home/pharos-home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: PharosHomeComponent
    }
];
