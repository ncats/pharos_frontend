import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TOKENS} from '../../config/component-tokens';

import {TargetDetailsModule} from "./data-details/target-details/target-details.module";
import {CommonToolsModule} from "../tools/common-tools.module";

import {PharosMainComponent} from './pharos-main.component';
import {DataDetailsResolver} from './data-details/data-details.resolver';

import {LoadingService} from '../pharos-services/loading.service';

import {SharedModule} from '../shared/shared.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {SharedListModule} from "../shared/shared-list.module";
import {DiseaseTableModule} from "./data-list/tables/disease-table/disease-table.module";
import {LigandDetailsModule} from "./data-details/ligand-details/ligand-details.module";


import {DataDetailsComponent} from './data-details/data-details.component';

import {DiseaseDetailsComponent} from './data-details/disease-details/disease-details.component';
import {DiseaseHeaderComponent} from './data-details/disease-details/disease-header/disease-header.component';
import {TargetListPanelComponent} from './data-details/disease-details/target-list-panel/target-list-panel.component';

import {TopicDetailsComponent} from './data-details/topic-details/topic-details.component';
import {TopicHeaderComponent} from './data-details/topic-details/topic-header/topic-header.component';
import {TopicGraphPanelComponent} from './data-details/topic-details/panels/topic-graph-panel/topic-graph-panel.component';
import {NodeDisplayComponent} from './data-details/topic-details/panels/node-display/node-display.component';

import {DiseaseCardComponent} from './data-list/cards/disease-card/disease-card.component';

import {ClickableNodeDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/clickable-node.directive';
import {GraphClickDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/graph-click.directive';
import {GraphMenuComponent} from '../tools/force-directed-graph/force-directed-graph/graph-component/shared-components/graph-menu/graph-menu.component';
import {ForceDirectedGraphComponent} from '../tools/force-directed-graph/force-directed-graph/force-directed-graph.component';
import {SearchComponent} from '../tools/force-directed-graph/tools/search-component/search.component';
import {HoverableNodeDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/hoverable-node.directive';
import {HighlightPipe} from '../tools/force-directed-graph/tools/search-component/highlight.pipe';
import {ZoomableDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/zoomable.directive';
import {NodeDetailsBoxComponent} from '../tools/force-directed-graph/force-directed-graph/graph-component/shared-components/node-details-box/node-details-box.component';
import {RangeSliderComponent} from '../tools/force-directed-graph/tools/range-slider/range-slider.component';
import {TopicGraphComponent} from '../tools/force-directed-graph/topic-graph.component';
import {NodeVisualComponent} from '../tools/force-directed-graph/force-directed-graph/graph-component/shared-components/node-visual/node-visual.component';
import {DraggableDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/draggable.directive';
import {HoverableLinkDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/hoverable-link.directive';
import {D3ColorLegendComponent} from '../tools/force-directed-graph/tools/d3-color-legend/d3-color-legend.component';
import {LinkVisualComponent} from '../tools/force-directed-graph/force-directed-graph/graph-component/shared-components/link-visual/link-visual.component';
import {ClickableLinkDirective} from '../tools/force-directed-graph/force-directed-graph/graph-component/directives/clickable-link.directive';
import {PharosNodeService} from './data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service';
import {GraphDataService} from '../tools/force-directed-graph/force-directed-graph/graph-component/services/graph-data.service';
import {LinkService} from '../tools/force-directed-graph/force-directed-graph/graph-component/services/event-tracking/link.service';
import {PharosD3Service} from './data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service';
import {NodeMenuControllerService} from '../tools/force-directed-graph/force-directed-graph/graph-component/services/event-tracking/node-menu-controller.service';
import {NodeMenuComponent} from '../tools/visualizations/force-directed-graph/components/shared/node-menu/node-menu.component';
import {GraphComponent} from '../tools/visualizations/force-directed-graph/components/graph/graph.component';
import {TopicTableComponent} from './data-list/tables/topic-table/topic-table.component';



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
      target: DataDetailsResolver
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
    RouterModule.forChild(pharosMainRoutes)

  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoadingService,
    PharosNodeService,
    PharosD3Service,
    LinkService,
    GraphDataService,
    NodeMenuControllerService,

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
    NodeDisplayComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ForceDirectedGraphComponent,
    NodeDetailsBoxComponent,
    GraphMenuComponent,
    RangeSliderComponent,
    D3ColorLegendComponent,
    TopicGraphComponent
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
    NodeDisplayComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    DraggableDirective,
    ClickableNodeDirective,
    ClickableLinkDirective,
    GraphClickDirective,
    ForceDirectedGraphComponent,
    NodeDetailsBoxComponent,
    GraphMenuComponent,
    RangeSliderComponent,
    D3ColorLegendComponent,
    HighlightPipe,
    SearchComponent,
    TopicGraphComponent,
    NodeDisplayComponent,
    NodeMenuComponent,
    GraphComponent
  ]
})
export class PharosMainRoutingModule {
}

