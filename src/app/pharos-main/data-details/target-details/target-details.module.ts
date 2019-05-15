import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiseaseSourceComponent} from './panels/disease-source-panel/disease-source-panel.component';
import {TOKENS} from '../../../../config/component-tokens';
import {TargetFacetPanelComponent} from './panels/target-facet-panel/target-facet-panel.component';
import {ProteinProteinPanelComponent} from './panels/protein-protein-panel/protein-protein-panel.component';
import {AssayPanelComponent} from './panels/assay-panel/assay-panel.component';
import {AaSequencePanelComponent} from './panels/aa-sequence-panel/aa-sequence-panel.component';
import {TargetDetailsComponent} from './target-details.component';
import {PublicationInfoPanelComponent} from './panels/publication-info-panel/publication-info-panel.component';
import {TargetHeaderComponent} from './target-header/target-header.component';
import {LigandsPanelComponent} from './panels/ligands-panel/ligands-panel.component';
import {IdgResourcesPanelComponent} from './panels/idg-resources-panel/idg-resources-panel.component';
import {ExpressionPanelComponent} from './panels/expression-panel/expression-panel.component';
import {SummaryPanelComponent} from './panels/summary-panel/summary-panel.component';
import {OrthologPanelComponent} from './panels/ortholog-panel/ortholog-panel.component';
import {IdgLevelSummaryModule} from './panels/level-summary-panel/idg-level-summary.module';
import {SharedModule} from '../../../shared/shared.module';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {RadarChartViewerComponent} from '../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {TargetTableModule} from '../../data-list/tables/target-table/target-table.module';
import {PdbPanelComponent, STRUCTURE_VIEW_TOKEN} from './panels/pdb-panel/pdb-panel.component';
import {GeneSummaryComponent} from './target-header/gene-summary/gene-summary.component';
import {BreadcrumbComponent} from '../../../tools/breadcrumb/breadcrumb.component';
import {DiseaseTableModule} from '../../data-list/tables/disease-table/disease-table.module';
import {LigandCardComponent} from '../../data-list/cards/ligand-card/ligand-card.component';
import {LigandTableModule} from '../../data-list/tables/ligand-table/ligand-table.module';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';

@NgModule({
  declarations: [
    TargetDetailsComponent,
    TargetHeaderComponent,
    SummaryPanelComponent,
    RadarChartViewerComponent,
    DiseaseSourceComponent,
    PublicationInfoPanelComponent,
    ExpressionPanelComponent,
    AaSequencePanelComponent,
    ProteinProteinPanelComponent,
    OrthologPanelComponent,
    AssayPanelComponent,
    PdbPanelComponent,
    GeneSummaryComponent,
    TargetFacetPanelComponent,
    IdgResourcesPanelComponent,
    LigandsPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule,
    TargetTableModule,
    DiseaseTableModule,
    LigandTableModule
  ],
  exports: [
  ],
  entryComponents: [
    TargetHeaderComponent,
    TargetDetailsComponent,
    SummaryPanelComponent,
    DiseaseSourceComponent,
    PublicationInfoPanelComponent,
    ExpressionPanelComponent,
    ProteinProteinPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    AaSequencePanelComponent,
    AssayPanelComponent,
    PdbPanelComponent,
    GeneSummaryComponent,
    RadarChartViewerComponent,
    IdgResourcesPanelComponent,
    LigandsPanelComponent,
    StructureViewComponent
  ],
  providers: [
    // breadcrumb
    {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
    {provide: TOKENS.TARGET_GENE_SUMMARY_COMPONENT, useValue: GeneSummaryComponent},
    // targets
    {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
    {provide: TOKENS.TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent},
    {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
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
    {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
    {provide: STRUCTURE_VIEW_TOKEN, useValue: StructureViewComponent}
  ]
})
export class TargetDetailsModule { }
