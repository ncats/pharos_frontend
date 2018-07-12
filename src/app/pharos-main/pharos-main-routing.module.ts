import {NgModule} from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from './data-list/target-table/target-table.component';
import {DataDetailsComponent} from './data-details/data-details.component';
import {DataDetailsResolver} from './services/data-details.resolver';
import {TargetDetailsComponent} from './data-details/target-details/target-details.component';
import {SummaryPanelComponent} from './data-details/target-details/panels/summary-panel/summary-panel.component';
import {TargetHeaderComponent} from './data-details/target-details/target-header/target-header.component';
import {SharedModule} from '../shared/shared.module';
import {DiseaseTableComponent} from './data-list/disease-table/disease-table.component';
import {ReferencesPanelComponent} from './data-details/target-details/panels/references-panel/references-panel.component';
import {ExpressionPanelComponent} from './data-details/target-details/panels/expression-panel/expression-panel.component';
import {DiseaseSourceComponent} from './data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {OrthologPanelComponent} from './data-details/target-details/panels/ortholog-panel/ortholog-panel.component';
import {TargetFacetPanelComponent} from './data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {DiseaseDetailsComponent} from './data-details/disease-details/disease-details.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedListModule} from '../shared/shared-list.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {LoadingService} from '../pharos-services/loading.service';
import {RadarChartComponent} from '../tools/visualizations/radar-chart/radar-chart.component';
import {TOKENS} from '../../environments/component-tokens';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';
import {AaSequencePanelComponent} from './data-details/target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {GeneRifPanelComponent} from './data-details/target-details/panels/gene-rif-panel/gene-rif-panel.component';
import {AssayPanelComponent} from './data-details/target-details/panels/assay-panel/assay-panel.component';
import {LigandsPanelComponent} from './data-details/target-details/panels/ligands-panel/ligands-panel.component';
import {LigandTableComponent} from "./data-list/ligand-table/ligand-table.component";
import {LigandDetailsComponent} from "./data-details/ligand-details/ligand-details.component";
import {MolecularDefinitionPanelComponent} from "./data-details/ligand-details/molecular-definition-panel/molecular-definition-panel.component";
import {TargetRelevancePanelComponent} from "./data-details/ligand-details/target-relevance-panel/target-relevance-panel.component";
import {StructureViewPanelComponent} from "./data-details/ligand-details/structure-view-panel/structure-view-panel.component";
import {SynonymsPanelComponent} from "./data-details/ligand-details/synonyms-panel/synonyms-panel.component";
import {LigandHeaderComponent} from "./data-details/ligand-details/ligand-header/ligand-header.component";
import {DiseaseHeaderComponent} from "./data-details/disease-details/disease-header/disease-header.component";
import {TargetListPanelComponent} from "./data-details/disease-details/target-list-panel/target-list-panel.component";
import {WebSocketService} from "../tools/visualizations/force-directed-graph/services/connection/websocket.service";
import {DataConnectionService} from "../tools/visualizations/force-directed-graph/services/connection/data-connection.service";
import {D3Service} from "../tools/visualizations/force-directed-graph/services/event-tracking/d3.service";
import {NodeService} from "../tools/visualizations/force-directed-graph/services/event-tracking/node.service";
import {LinkService} from "../tools/visualizations/force-directed-graph/services/event-tracking/link.service";
import {MessageService} from "../tools/visualizations/force-directed-graph/services/message.service";
import {GraphDataService} from "../tools/visualizations/force-directed-graph/services/graph-data.service";
import {NodeMenuControllerService} from "../tools/visualizations/force-directed-graph/services/event-tracking/node-menu-controller.service";
import {SettingsService} from "../tools/visualizations/force-directed-graph/services/settings.service";
import {NodeExpandService} from "../tools/visualizations/force-directed-graph/services/event-tracking/node-expand.service";
import {TopicTableComponent} from "./data-list/topic-table/topic-table.component";
import {TopicDetailsComponent} from "./data-details/topic-details/topic-details.component";
import {TopicHeaderComponent} from "./data-details/topic-details/topic-header/topic-header.component";
import {TopicGraphPanelComponent} from "./data-details/topic-details/panels/topic-graph-panel/topic-graph-panel.component";
import {NodeDisplayComponent} from "./data-details/topic-details/panels/node-display/node-display.component";
import {GraphComponent} from "../tools/visualizations/force-directed-graph/components/graph/graph.component";
import {NodeVisualComponent} from "../tools/visualizations/force-directed-graph/components/shared/node-visual/node-visual.component";
import {LinkVisualComponent} from "../tools/visualizations/force-directed-graph/components/shared/link-visual/link-visual.component";
import {ZoomableDirective} from "../tools/visualizations/force-directed-graph/directives/zoomable.directive";
import {HoverableLinkDirective} from "../tools/visualizations/force-directed-graph/directives/hoverable-link.directive";
import {HoverableNodeDirective} from "../tools/visualizations/force-directed-graph/directives/hoverable-node.directive";
import {DraggableDirective} from "../tools/visualizations/force-directed-graph/directives/draggable.directive";
import {ClickableNodeDirective} from "../tools/visualizations/force-directed-graph/directives/clickable-node.directive";
import {ClickableLinkDirective} from "../tools/visualizations/force-directed-graph/directives/clickable-link.directive";
import {NodeMenuComponent} from "../tools/visualizations/force-directed-graph/components/shared/node-menu/node-menu.component";


const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    SharedListModule,
    SharedDetailsModule,
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    WebSocketService,
    DataConnectionService,
    D3Service,
    NodeService,
    LinkService,
    MessageService,
    GraphDataService,
    NodeMenuControllerService,
    LoadingService,
    SettingsService,
    NodeExpandService,
    // breadcrumb
    {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent },
    // topics
    {provide: TOKENS.TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
    {provide: TOKENS.TOPIC_HEADER_COMPONENT, useValue: TopicHeaderComponent },
    {provide: TOKENS.TOPIC_GRAPH_PANEL, useValue: TopicGraphPanelComponent },
    {provide: TOKENS.NODE_DISPLAY_PANEL, useValue: NodeDisplayComponent },
    // targets
    {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent },
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent },
    {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent },
    {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent },
    {provide: TOKENS.REFERENCES_PANEL, useValue: ReferencesPanelComponent },
    {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent },
    {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent },
    {provide: TOKENS.ORTHOLOG_PANEL, useValue: OrthologPanelComponent },
    {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent },
    {provide: TOKENS.GENE_RIF_PANEL, useValue: GeneRifPanelComponent },
    {provide: TOKENS.ASSAY_PANEL, useValue: AssayPanelComponent },
    {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent },
    {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent },
    // diseases
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent },
    {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent },
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent },
    {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent },
    // ligands
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent },
    {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent },
    {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent },
    {provide: TOKENS.SYNONYMS_PANEL, useValue: SynonymsPanelComponent },
    {provide: TOKENS.STRUCTURE_VIEW_PANEL, useValue: StructureViewPanelComponent },
    {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent },
    {provide: TOKENS.MOLECULAR_DEFINITION_PANEL, useValue: MolecularDefinitionPanelComponent },
  ],
  entryComponents: [
    BreadcrumbComponent,
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseSourceComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent,
    LigandTableComponent,
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    MolecularDefinitionPanelComponent,
    TargetRelevancePanelComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent,
    GraphComponent,
    NodeDisplayComponent,
    RadarChartComponent,
    GeneRifPanelComponent,
    AssayPanelComponent,
    AaSequencePanelComponent,
    LigandsPanelComponent
  ],
  declarations: [
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    DiseaseSourceComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    DiseaseHeaderComponent,
    TargetListPanelComponent,
    LigandTableComponent,
    LigandDetailsComponent,
    LigandHeaderComponent,
    SynonymsPanelComponent,
    StructureViewPanelComponent,
    MolecularDefinitionPanelComponent,
    TargetRelevancePanelComponent,
    TopicTableComponent,
    TopicDetailsComponent,
    TopicHeaderComponent,
    TopicGraphPanelComponent,
    NodeDisplayComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    DraggableDirective,
    ClickableNodeDirective,
    ClickableLinkDirective,
    NodeDisplayComponent,
    NodeMenuComponent,
    GraphComponent,
    RadarChartComponent,
    GeneRifPanelComponent,
    AssayPanelComponent,
    AaSequencePanelComponent,
    LigandsPanelComponent
  ]
})
export class PharosMainRoutingModule { }

