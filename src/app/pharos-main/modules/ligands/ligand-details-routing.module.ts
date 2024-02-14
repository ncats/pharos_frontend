import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';

import {Ligand, LigandSerializer} from '../../../models/ligand';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {TOKENS} from '../../../../config/component-tokens';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {LigandHeaderComponent} from '../../data-details/ligand-details/ligand-header/ligand-header.component';
import {LigandDetailsComponent} from '../../data-details/ligand-details/panels/ligand-details/ligand-details.component';
import {
    TargetRelevancePanelComponent
} from '../../data-details/ligand-details/panels/target-relevance-panel/target-relevance-panel.component';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';

const routes: Routes = [
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
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // ligands
        {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
        {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
        {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
        {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
        {provide: TOKENS.IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}
    ]
})

export class LigandDetailsRoutingModule {
}
