import {Routes} from '@angular/router';
import {AboutPageComponent} from '../about-page/about-page.component';
import {QueryResolver} from '../pharos-main/resolvers/query.resolver';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {DataSourceSerializer} from '../models/dataSource';

export const routes: Routes = [
    {
        path: '',
        component: AboutPageComponent,
        resolve: {
            results: QueryResolver
        },
        data: {
            fragments: {
                query: PharosApiService.dataSourceQuery
            },
            serializer: new DataSourceSerializer(),
            rootObject: 'dataSourceCounts'
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }
];
