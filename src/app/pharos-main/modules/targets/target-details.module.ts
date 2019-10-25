import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TargetDetailsRoutingModule} from './target-details-routing.module';
import {TargetDetailsComponent} from '../../data-details/target-details/target-details.component';
import {TargetHeaderComponent} from '../../data-details/target-details/target-header/target-header.component';
import {SummaryPanelComponent} from '../../data-details/target-details/panels/summary-panel/summary-panel.component';
import {RadarChartViewerComponent} from '../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {DiseaseSourceComponent} from '../../data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {PublicationInfoPanelComponent} from '../../data-details/target-details/panels/publication-info-panel/publication-info-panel.component';
import {ExpressionPanelComponent} from '../../data-details/target-details/panels/expression-panel/expression-panel.component';
import {AaSequencePanelComponent} from '../../data-details/target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {ProteinProteinPanelComponent} from '../../data-details/target-details/panels/protein-protein-panel/protein-protein-panel.component';
import {OrthologPanelComponent} from '../../data-details/target-details/panels/expression-panel/ortholog-panel/ortholog-panel.component';
import {AssayPanelComponent} from '../../data-details/target-details/panels/assay-panel/assay-panel.component';
import {
  PdbPanelComponent,
  STRUCTURE_VIEW_TOKEN
} from '../../data-details/target-details/panels/pdb-panel/pdb-panel.component';
import {GeneSummaryComponent} from '../../data-details/target-details/panels/gene-summary/gene-summary.component';
import {TargetFacetPanelComponent} from '../../data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {IdgResourcesPanelComponent} from '../../data-details/target-details/panels/idg-resources-panel/idg-resources-panel.component';
import {LigandsPanelComponent} from '../../data-details/target-details/panels/ligands-panel/ligands-panel.component';
import {DrugsPanelComponent} from '../../data-details/target-details/panels/drugs-panel/drugs-panel.component';
import {DifferentialPanelComponent} from '../../data-details/target-details/panels/expression-panel/differential-panel/differential-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {IdgLevelSummaryModule} from '../../data-details/target-details/panels/level-summary-panel/idg-level-summary.module';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';
import {TOKENS} from '../../../../config/component-tokens';
import {BreadcrumbComponent} from '../../data-details/target-details/panels/breadcrumb/breadcrumb.component';
import {TargetTableModule} from './target-list.module';
import {LigandListModule} from '../ligands/ligand-list.module';
import {PharosLoadingSpinnerModule} from '../../../tools/pharos-loading-spinner/pharos-loading-spinner.module';

@NgModule({
  declarations: [
    TargetDetailsComponent,
    TargetHeaderComponent,
    BreadcrumbComponent,
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
    LigandsPanelComponent,
    DrugsPanelComponent,
    DifferentialPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    TargetDetailsRoutingModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule,
    TargetTableModule,
    LigandListModule,
    PharosLoadingSpinnerModule
  ],
  exports: [
  ],
  entryComponents: [
    TargetHeaderComponent,
    TargetDetailsComponent,
    BreadcrumbComponent,
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
    StructureViewComponent,
    DrugsPanelComponent
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
    {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
    {provide: TOKENS.ASSAY_PANEL, useValue: AssayPanelComponent},
    {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
    {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
    {provide: TOKENS.DRUGS_PANEL, useValue: DrugsPanelComponent},
    {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
    {provide: STRUCTURE_VIEW_TOKEN, useValue: StructureViewComponent}
  ]
})
export class TargetDetailsModule { }
