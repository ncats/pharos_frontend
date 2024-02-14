import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {Disease, DiseaseSerializer} from '../models/disease';
import {Facet} from '../models/facet';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {TOKENS} from '../../config/component-tokens';
import {DiseaseTableComponent} from '../pharos-main/data-list/tables/disease-table/disease-table.component';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {commonListProviders} from './common-list.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        data: {
            fragments: {
                diseases: {
                    list: Disease.diseaseListFragments
                },
                facets: Facet.facetFieldsFragments
            },
            serializer: new DiseaseSerializer()
        },
        resolve: {
            components: ComponentsResolver,
            results: DataListResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            commonListProviders,
            {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
        ]
    }
];
