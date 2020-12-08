import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TargetDetailsRoutingModule} from './target-details-routing.module';
import {TargetHeaderComponent} from '../../data-details/target-details/target-header/target-header.component';
import {SummaryPanelComponent} from '../../data-details/target-details/panels/summary-panel/summary-panel.component';
import {RadarChartViewerComponent} from '../../../tools/radar-chart-viewer/radar-chart-viewer.component';
import {DiseaseSourceComponent} from '../../data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {DiseaseCardComponent} from "../../data-details/target-details/panels/disease-source-panel/disease-card/disease-card.component";
import {DiseaseAssociationComponent} from "../../data-details/target-details/panels/disease-source-panel/disease-association/disease-association.component";
import {ExpressionPanelComponent} from '../../data-details/target-details/panels/expression-panel/expression-panel.component';
import {ExpressionTissueCardComponent} from "../../data-details/target-details/panels/expression-panel/expression-tissue-card/expression-tissue-card.component";
import {AaSequencePanelComponent} from '../../data-details/target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {ProteinProteinPanelComponent} from '../../data-details/target-details/panels/protein-protein-panel/protein-protein-panel.component';
import {ViralInteractionPanelComponent} from '../../data-details/target-details/panels/viral-interaction-panel/viral-interaction-panel.component'
import {VirusDetailsComponent} from '../../data-details/target-details/panels/viral-interaction-panel/virus-details/virus-details.component'
import {OrthologPanelComponent} from '../../data-details/target-details/panels/expression-panel/ortholog-panel/ortholog-panel.component';
import {GeneSummaryComponent} from '../../data-details/target-details/panels/gene-summary/gene-summary.component';
import {TargetFacetPanelComponent} from '../../data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {IdgResourcesPanelComponent} from '../../data-details/target-details/panels/idg-resources-panel/idg-resources-panel.component';
import {ReagentPanelComponent} from '../../data-details/target-details/panels/idg-resources-panel/reagent-panel/reagent-panel.component';
import {DataResourcePanelComponent} from '../../data-details/target-details/panels/idg-resources-panel/data-resource-panel/data-resource-panel.component';
import {MouseExpressionComponent} from "../../data-details/target-details/panels/idg-resources-panel/mouse-expression/mouse-expression.component";
import {LigandsPanelComponent} from '../../data-details/target-details/panels/drugs-ligands-panel/ligands-panel/ligands-panel.component';
import {DrugsPanelComponent} from '../../data-details/target-details/panels/drugs-ligands-panel/drugs-panel/drugs-panel.component';
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
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {SidenavPanelComponent} from '../../../tools/sidenav-panel/sidenav-panel.component';
import {PublicationStatisticsComponent} from '../../data-details/target-details/panels/publication-statistics/publication-statistics.component';
import {RelatedPublicationsComponent} from '../../data-details/target-details/panels/related-publications/related-publications.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {PdbDetailsComponent} from "../../data-details/target-details/panels/pdb-panel/pdb-details/pdb-details.component";
import {PdbPanelComponent} from "../../data-details/target-details/panels/pdb-panel/pdb-panel.component";
import {DrugsLigandsPanelComponent} from "../../data-details/target-details/panels/drugs-ligands-panel/drugs-ligands-panel.component";
import {PathwaysPanelComponent} from "../../data-details/target-details/panels/pathways-panel/pathways-panel.component";
import {ReactomePathwayBrowserComponent} from "../../data-details/target-details/panels/pathways-panel/reactome-pathway-browser/reactome-pathway-browser.component";
import {GoTermsComponent} from "../../data-details/target-details/panels/go-terms/go-terms.component";

@NgModule({
  declarations: [
    TargetHeaderComponent,
    BreadcrumbComponent,
    SummaryPanelComponent,
    RadarChartViewerComponent,
    DiseaseSourceComponent,
    DiseaseCardComponent,
    DiseaseAssociationComponent,
    PublicationStatisticsComponent,
    RelatedPublicationsComponent,
    ExpressionPanelComponent,
    ExpressionTissueCardComponent,
    AaSequencePanelComponent,
    ProteinProteinPanelComponent,
    PathwaysPanelComponent,
    ReactomePathwayBrowserComponent,
    ViralInteractionPanelComponent,
    VirusDetailsComponent,
    OrthologPanelComponent,
    PdbPanelComponent,
    PdbDetailsComponent,
    GeneSummaryComponent,
    GoTermsComponent,
    TargetFacetPanelComponent,
    IdgResourcesPanelComponent,
    ReagentPanelComponent,
    DataResourcePanelComponent,
    MouseExpressionComponent,
    LigandsPanelComponent,
    DrugsPanelComponent,
    DifferentialPanelComponent,
    DrugsLigandsPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TargetDetailsRoutingModule,
    CommonToolsModule,
    SharedDetailsModule,
    IdgLevelSummaryModule,
    TargetTableModule,
    LigandListModule,
    PharosLoadingSpinnerModule,
    MatButtonToggleModule
  ],
  exports: [
    DiseaseCardComponent,
    DiseaseAssociationComponent,
    ExpressionTissueCardComponent,
    VirusDetailsComponent
  ],
  providers: [
    // breadcrumb
    {provide: TOKENS.PHAROS_SUBNAV_COMPONENT, useValue: SidenavPanelComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
    {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
    // targets
    {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
    {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
    {provide: TOKENS.IDG_RESOURCES_PANEL, useValue: IdgResourcesPanelComponent},

    {provide: TOKENS.PUBLICATION_STATISTICS_PANEL, useValue: PublicationStatisticsComponent},
    {provide: TOKENS.RELATED_PUBLICATIONS_PANEL, useValue: RelatedPublicationsComponent},
    {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent},
    {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent},
    {provide: TOKENS.PROTEIN_PROTEIN_PANEL, useValue: ProteinProteinPanelComponent},
    {provide: TOKENS.VIRAL_INTERACTIONS_PANEL, useValue: ViralInteractionPanelComponent},
    {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
    {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
    {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
    {provide: TOKENS.DRUGS_PANEL, useValue: DrugsPanelComponent},
    {provide: TOKENS.PDB_PANEL, useValue: PdbPanelComponent},
    {provide: TOKENS.PATHWAYS_PANEL, useValue: PathwaysPanelComponent},
    {provide: TOKENS.GO_TERMS_PANEL, useValue: GoTermsComponent}
  ]
})
export class TargetDetailsModule { }
