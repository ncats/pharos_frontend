import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {Ligand, LigandSerializer} from '../models/ligand';
import {TOKENS} from '../../config/component-tokens';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {LigandHeaderComponent} from '../pharos-main/data-details/ligand-details/ligand-header/ligand-header.component';
import {
    LigandDetailsComponent
} from '../pharos-main/data-details/ligand-details/panels/ligand-details/ligand-details.component';
import {
    TargetRelevancePanelComponent
} from '../pharos-main/data-details/ligand-details/panels/target-relevance-panel/target-relevance-panel.component';
import {IdgLevelIndicatorComponent} from '../tools/idg-level-indicator/idg-level-indicator.component';
import {commonDetailsProviders} from './common-details.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        resolve: {
            results: DataDetailsResolver,
            components: ComponentsResolver
        },
        data: {
            fragments: {
                details: Ligand.ligandDetailsFragments,
                query: Ligand.ligandDetailsQuery,
                serverQuery: Ligand.serverDetailsQuery
            },
            serializer: new LigandSerializer()
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            ...commonDetailsProviders,
            {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
            {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
            {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent}
        ]
    }
];
