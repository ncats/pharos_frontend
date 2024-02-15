import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {SearchResolver} from '../pharos-main/resolvers/search.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {TOKENS} from '../../config/component-tokens';
import {SearchPageComponent} from '../pharos-main/search/search-component/search-page.component';
import {commonListProviders} from './common-list.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        resolve: {
            results: SearchResolver,
            components: ComponentsResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            ...commonListProviders,
            {provide: TOKENS.BROWSE_TABLE_COMPONENT, useValue: SearchPageComponent}
        ]
    }
];
