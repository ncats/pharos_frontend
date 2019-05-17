import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TOKENS} from '../../config/component-tokens';

import {TargetDetailsModule} from './data-details/target-details/target-details.module';
import {CommonToolsModule} from '../tools/common-tools.module';

import {PharosMainComponent} from './pharos-main.component';
import {DataDetailsResolver} from './data-details/data-details.resolver';

import {LoadingService} from '../pharos-services/loading.service';

import {SharedModule} from '../shared/shared.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {SharedListModule} from '../shared/shared-list.module';
import {DiseaseTableModule} from './data-list/tables/disease-table/disease-table.module';
import {LigandDetailsModule} from './data-details/ligand-details/ligand-details.module';


import {DataDetailsComponent} from './data-details/data-details.component';

import {DiseaseDetailsComponent} from './data-details/disease-details/disease-details.component';
import {DiseaseHeaderComponent} from './data-details/disease-details/disease-header/disease-header.component';
import {TargetListPanelComponent} from './data-details/disease-details/target-list-panel/target-list-panel.component';

import {TopicDetailsComponent} from './data-details/topic-details/topic-details.component';
import {TopicHeaderComponent} from './data-details/topic-details/topic-header/topic-header.component';
import {TopicGraphPanelComponent} from './data-details/topic-details/panels/topic-graph-panel/topic-graph-panel.component';
import {NodeDisplayComponent} from './data-details/topic-details/panels/node-display/node-display.component';

import {DiseaseCardComponent} from './data-list/cards/disease-card/disease-card.component';

import {TopicTableComponent} from './data-list/tables/topic-table/topic-table.component';
import {PharosD3Service} from './data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service';
import {NcatsFdgModule} from '../tools/force-directed-graph/ncats-fdg.module';



const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    loadChildren: './data-list/data-list.module#DataListModule'
  },
  {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    CommonToolsModule,
    SharedListModule,
    DiseaseTableModule,
    SharedDetailsModule,
    TargetDetailsModule,
    LigandDetailsModule,
    NcatsFdgModule,
    RouterModule.forChild(pharosMainRoutes)

  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoadingService,
    PharosD3Service,

    // topics
    {provide: TOKENS.TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent},
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent},
    {provide: TOKENS.TOPIC_HEADER_COMPONENT, useValue: TopicHeaderComponent},
    {provide: TOKENS.TOPIC_GRAPH_PANEL, useValue: TopicGraphPanelComponent},
    {provide: TOKENS.NODE_DISPLAY_PANEL, useValue: NodeDisplayComponent},

    // diseases
    {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent},
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
    {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent},

  ],
  entryComponents: [
    PharosMainComponent,

    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    DiseaseCardComponent,
    TopicGraphPanelComponent,


  ],
  declarations: [
    PharosMainComponent,
    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent,
    DiseaseCardComponent,
    NodeDisplayComponent
  ]
})
export class PharosMainRoutingModule {
}

