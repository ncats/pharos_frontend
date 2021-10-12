import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrossListHeatmapComponent} from '../../analyze-list/cross-list-heatmap/cross-list-heatmap.component';
import {AnalyzeListRoutingModule} from './analyze-list-routing.module';
import {TOKENS} from '../../../../config/component-tokens';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {SharedListModule} from '../../../shared/shared-list.module';
import {AnalyzeHeaderComponent} from '../../analyze-list/analyze-header/analyze-header.component';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {TargetLigandHeatmapComponent} from '../../analyze-list/target-ligand-heatmap/target-ligand-heatmap.component';
import {TargetDiseaseHeatmapComponent} from '../../analyze-list/target-disease-heatmap/target-disease-heatmap.component';
import {DiseaseTargetHeatmapComponent} from '../../analyze-list/disease-target-heatmap/disease-target-heatmap.component';
import {LigandTargetHeatmapComponent} from '../../analyze-list/ligand-target-heatmap/ligand-target-heatmap.component';

@NgModule({
  declarations: [
    CrossListHeatmapComponent,
    AnalyzeHeaderComponent,
    TargetDiseaseHeatmapComponent,
    TargetLigandHeatmapComponent,
    DiseaseTargetHeatmapComponent,
    LigandTargetHeatmapComponent
  ],
  imports: [
    CommonModule,
    AnalyzeListRoutingModule,
    SharedListModule,
    CommonToolsModule
  ],
  providers: [
    ComponentsResolver,
    {provide: TOKENS.PHAROS_TARGET_DISEASE_HEATMAP_COMPONENT, useValue: TargetDiseaseHeatmapComponent},
    {provide: TOKENS.PHAROS_TARGET_LIGAND_HEATMAP_COMPONENT, useValue: TargetLigandHeatmapComponent},
    {provide: TOKENS.PHAROS_DISEASE_TARGET_HEATMAP_COMPONENT, useValue: DiseaseTargetHeatmapComponent},
    {provide: TOKENS.PHAROS_LIGAND_TARGET_HEATMAP_COMPONENT, useValue: LigandTargetHeatmapComponent}
  ]
})
export class AnalyzeListModule { }


