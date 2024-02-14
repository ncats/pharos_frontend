import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyzeListRoutingModule} from './analyze-list-routing.module';
import {TOKENS} from '../../../../config/component-tokens';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {SharedListModule} from '../../../shared/shared-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {TargetLigandHeatmapComponent} from '../../analyze-list/target-ligand-heatmap/target-ligand-heatmap.component';
import {TargetDiseaseHeatmapComponent} from '../../analyze-list/target-disease-heatmap/target-disease-heatmap.component';
import {DiseaseTargetHeatmapComponent} from '../../analyze-list/disease-target-heatmap/disease-target-heatmap.component';
import {LigandTargetHeatmapComponent} from '../../analyze-list/ligand-target-heatmap/ligand-target-heatmap.component';
import {TargetTargetHeatmapComponent} from '../../analyze-list/target-target-heatmap/target-target-heatmap.component';
import {
  PropertyDisplayComponent
} from '../../../tools/generic-table/components/property-display/property-display.component';
import {
  DiseaseAssociationGridComponent
} from '../../data-details/target-details/panels/disease-source-panel/disease-association-grid/disease-association-grid.component';
import {
  TargetRelevanceTableComponent
} from '../../data-details/ligand-details/panels/target-relevance-panel/target-relevance-table/target-relevance-table.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyzeListRoutingModule,
    SharedListModule,
    CommonToolsModule,
    PropertyDisplayComponent,
    DiseaseAssociationGridComponent,
    TargetRelevanceTableComponent
  ],
  providers: [
    ComponentsResolver,
    {provide: TOKENS.PHAROS_TARGET_DISEASE_HEATMAP_COMPONENT, useValue: TargetDiseaseHeatmapComponent},
    {provide: TOKENS.PHAROS_TARGET_LIGAND_HEATMAP_COMPONENT, useValue: TargetLigandHeatmapComponent},
    {provide: TOKENS.PHAROS_DISEASE_TARGET_HEATMAP_COMPONENT, useValue: DiseaseTargetHeatmapComponent},
    {provide: TOKENS.PHAROS_LIGAND_TARGET_HEATMAP_COMPONENT, useValue: LigandTargetHeatmapComponent},
    {provide: TOKENS.PHAROS_TARGET_TARGET_HEATMAP_COMPONENT, useValue: TargetTargetHeatmapComponent}
  ]
})
export class AnalyzeListModule { }


