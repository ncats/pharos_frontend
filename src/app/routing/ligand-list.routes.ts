import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {Ligand, LigandSerializer} from '../models/ligand';
import {Facet} from '../models/facet';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {TOKENS} from '../../config/component-tokens';
import {LigandTableComponent} from '../pharos-main/data-list/tables/ligand-table/ligand-table.component';
import {commonListProviders} from './common-list.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        data: {
            fragments: {
                ligands: {
                    list: Ligand.ligandListFragments
                },
                facets: Facet.facetFieldsFragments
            },
            serializer: new LigandSerializer()
        },
        resolve: {
            components: ComponentsResolver,
            results: DataListResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            commonListProviders,
            {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent}
        ]
    }
];
