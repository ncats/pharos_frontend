import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TOKENS} from '../../config/component-tokens';
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
import {ExpressionPanelComponent} from './data-details/target-details/panels/expression-panel/expression-panel.component';
import {DiseaseSourceComponent} from './data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {OrthologPanelComponent} from './data-details/target-details/panels/ortholog-panel/ortholog-panel.component';
import {TargetFacetPanelComponent} from './data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {DiseaseDetailsComponent} from './data-details/disease-details/disease-details.component';
import {SharedListModule} from '../shared/shared-list.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {LoadingService} from '../pharos-services/loading.service';
import {RadarChartComponent} from '../tools/visualizations/radar-chart/radar-chart.component';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';
import {AaSequencePanelComponent} from './data-details/target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {AssayPanelComponent} from './data-details/target-details/panels/assay-panel/assay-panel.component';
import {LigandsPanelComponent} from './data-details/target-details/panels/ligands-panel/ligands-panel.component';
import {LigandTableComponent} from './data-list/ligand-table/ligand-table.component';
import {LigandDetailsComponent} from './data-details/ligand-details/ligand-details.component';
import {MolecularDefinitionPanelComponent} from './data-details/ligand-details/molecular-definition-panel/molecular-definition-panel.component';
import {TargetRelevancePanelComponent} from './data-details/ligand-details/target-relevance-panel/target-relevance-panel.component';
import {StructureViewPanelComponent} from './data-details/ligand-details/structure-view-panel/structure-view-panel.component';
import {SynonymsPanelComponent} from './data-details/ligand-details/synonyms-panel/synonyms-panel.component';
import {LigandHeaderComponent} from './data-details/ligand-details/ligand-header/ligand-header.component';
import {DiseaseHeaderComponent} from './data-details/disease-details/disease-header/disease-header.component';
import {TargetListPanelComponent} from './data-details/disease-details/target-list-panel/target-list-panel.component';
import {TopicDetailsComponent} from './data-details/topic-details/topic-details.component';
import {TopicHeaderComponent} from './data-details/topic-details/topic-header/topic-header.component';
import {TopicGraphPanelComponent} from './data-details/topic-details/panels/topic-graph-panel/topic-graph-panel.component';
import {NodeDisplayComponent} from './data-details/topic-details/panels/node-display/node-display.component';
import {TargetCardComponent} from './data-details/topic-details/panels/target-card/target-card.component';
import {LigandCardComponent} from './data-details/topic-details/panels/ligand-card/ligand-card.component';
import {DiseaseCardComponent} from './data-details/topic-details/panels/disease-card/disease-card.component';
import {ProteinProteinPanelComponent} from './data-details/target-details/panels/protein-protein-panel/protein-protein-panel.component';
import {BatchUploadModalComponent} from '../tools/batch-upload-modal/batch-upload-modal.component';
import {PdbPanelComponent} from './data-details/target-details/panels/pdb-panel/pdb-panel.component';
import {RadarChartViewerComponent} from '../tools/radar-chart-viewer/radar-chart-viewer.component';
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
import {PublicationInfoPanelComponent} from './data-details/target-details/panels/publication-info-panel/publication-info-panel.component';
import {LevelSummaryPanelComponent} from './data-details/target-details/panels/level-summary-panel/level-summary-panel.component';
import {TdarkSummaryComponent} from './data-details/target-details/panels/level-summary-panel/levels/tdark-summary/tdark-summary.component';
import {TbioSummaryComponent} from './data-details/target-details/panels/level-summary-panel/levels/tbio-summary/tbio-summary.component';
import {TchemSummaryComponent} from './data-details/target-details/panels/level-summary-panel/levels/tchem-summary/tchem-summary.component';
import {TclinSummaryComponent} from './data-details/target-details/panels/level-summary-panel/levels/tclin-summary/tclin-summary.component';
import {GeneSummaryComponent} from './data-details/target-details/target-header/gene-summary/gene-summary.component';
import {NodeMenuComponent} from '../tools/visualizations/force-directed-graph/components/shared/node-menu/node-menu.component';
import {GraphComponent} from '../tools/visualizations/force-directed-graph/components/graph/graph.component';
import {TopicTableComponent} from './data-list/topic-table/topic-table.component';
import {IdgResourcesPanelComponent} from './data-details/target-details/panels/idg-resources-panel/idg-resources-panel.component';


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
      target: DataDetailsResolver
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    SharedListModule,
    SharedDetailsModule,
    RouterModule.forChild(pharosMainRoutes)

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    // breadcrumb
    {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
    {provide: TOKENS.TARGET_GENE_SUMMARY_COMPONENT, useValue: GeneSummaryComponent},
    // topics
    {provide: TOKENS.TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent},
    {provide: TOKENS.TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent},
    {provide: TOKENS.TOPIC_HEADER_COMPONENT, useValue: TopicHeaderComponent},
    {provide: TOKENS.TOPIC_GRAPH_PANEL, useValue: TopicGraphPanelComponent},
    {provide: TOKENS.NODE_DISPLAY_PANEL, useValue: NodeDisplayComponent},
    // targets
    {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
    {provide: TOKENS.TARGET_TABLE_COMPONENT, useValue: TargetTableComponent},
    {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent},
    {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
    {provide: TOKENS.LEVEL_SUMMARY_PANEL, useValue: LevelSummaryPanelComponent},
    {provide: TOKENS.IDG_RESOURCES_PANEL, useValue: IdgResourcesPanelComponent},
    {provide: TOKENS.PUBLICATION_INFO_PANEL, useValue: PublicationInfoPanelComponent},
    {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent},
    {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent},
    {provide: TOKENS.PROTEIN_PROTEIN_PANEL, useValue: ProteinProteinPanelComponent},
    {provide: TOKENS.ORTHOLOG_PANEL, useValue: OrthologPanelComponent},
    {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
    {provide: TOKENS.ASSAY_PANEL, useValue: AssayPanelComponent},
    {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
    {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
    // diseases
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent},
    {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent},
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
    {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent},
    // ligands
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent},
    {provide: TOKENS.LIGAND_DETAILS_COMPONENT, useValue: LigandDetailsComponent},
    {provide: TOKENS.LIGAND_HEADER_COMPONENT, useValue: LigandHeaderComponent},
    {provide: TOKENS.SYNONYMS_PANEL, useValue: SynonymsPanelComponent},
    {provide: TOKENS.STRUCTURE_VIEW_PANEL, useValue: StructureViewPanelComponent},
    {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
    {provide: TOKENS.MOLECULAR_DEFINITION_PANEL, useValue: MolecularDefinitionPanelComponent},
    {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
  ],
  entryComponents: [
    BreadcrumbComponent,
    TargetTableComponent,
    TargetDetailsComponent,
    PublicationInfoPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseSourceComponent,
    ExpressionPanelComponent,
    ProteinProteinPanelComponent,
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
    TargetCardComponent,
    LigandCardComponent,
    DiseaseCardComponent,
    TopicGraphPanelComponent,
    NodeDisplayComponent,
    RadarChartComponent,
    RadarChartViewerComponent,
    AssayPanelComponent,
    AaSequencePanelComponent,
    LigandsPanelComponent,
    BatchUploadModalComponent,
    PdbPanelComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ForceDirectedGraphComponent,
    NodeDetailsBoxComponent,
    GraphMenuComponent,
    RangeSliderComponent,
    D3ColorLegendComponent,
    TopicGraphComponent,
    LevelSummaryPanelComponent,
    GeneSummaryComponent,
    IdgResourcesPanelComponent
  ],
  declarations: [
    TargetTableComponent,
    TargetDetailsComponent,
    PublicationInfoPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    ExpressionPanelComponent,
    ProteinProteinPanelComponent,
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
    TargetCardComponent,
    LigandCardComponent,
    DiseaseCardComponent,
    NodeDisplayComponent,
    RadarChartComponent,
    RadarChartViewerComponent,
    AssayPanelComponent,
    AaSequencePanelComponent,
    LigandsPanelComponent,
    BatchUploadModalComponent,
    PdbPanelComponent,
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
    GraphComponent,
    RadarChartComponent,
    RadarChartViewerComponent,
    AssayPanelComponent,
    AaSequencePanelComponent,
    LigandsPanelComponent,
    BatchUploadModalComponent,
    PdbPanelComponent,
    LevelSummaryPanelComponent,
    TclinSummaryComponent,
    TchemSummaryComponent,
    TbioSummaryComponent,
    TdarkSummaryComponent,
    GeneSummaryComponent,
    IdgResourcesPanelComponent
  ]
})
export class PharosMainRoutingModule {
}

