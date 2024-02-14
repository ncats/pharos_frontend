import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {Target, TargetSerializer} from '../models/target';
import {Facet} from '../models/facet';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {TOKENS} from '../../config/component-tokens';
import {
    TargetTableComponent
} from '../pharos-main/data-list/tables/target-table/target-table.component';
import {IdgLevelIndicatorComponent} from '../tools/idg-level-indicator/idg-level-indicator.component';
import {
    InjectedRadarChartComponent
} from '../pharos-main/data-list/tables/target-table/injected-radar-chart/injected-radar-chart.component';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {commonListProviders} from './common-list.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        data: {
            fragments: {
                targets: {
                    list: Target.targetListFragments,
                    extras: Target.targetListExtras
                },
                facets: Facet.facetFieldsFragments
            },
            serializer: new TargetSerializer()
        },
        resolve: {
            components: ComponentsResolver,
            results: DataListResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            ...commonListProviders,
            {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
            {provide: TOKENS.RADAR_CHART_TOKEN, useValue: InjectedRadarChartComponent}
        ]
    }
];
