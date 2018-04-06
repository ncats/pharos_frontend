import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PharosMainRoutingModule} from './pharos-main-routing.module';
import {MaterialModule} from '../../assets/material/material.module';
import {DataListComponent} from './data-list/data-list.component';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';
import {DataListVisualizationsComponent} from './data-list-visualizations/data-list-visualizations.component';
import {FacetTableComponent} from './filter-panel/facet-table/facet-table.component';
import {WordCloudChartComponent} from './visualizations/word-cloud-chart/word-cloud-chart.component';
import {SunburstChartComponent} from './visualizations/sunburst-chart/sunburst-chart.component';
import {DonutChartComponent} from './visualizations/donut-chart/donut-chart.component';
import {VisualizationOptionsComponent} from './data-list-visualizations/visualization-options/visualization-options.component';
import {DataDetailsComponent} from './data-details/data-details.component';
import {PharosPaginatorComponent} from '../tools/pharos-paginator/pharos-paginator.component';
import {FilterPanelComponent} from './filter-panel/filter-panel.component';
import {PharosMainComponent} from './pharos-main.component';
import {NcatsFooterComponent} from '../tools/ncats-footer/ncats-footer.component';
import {NcatsHeaderComponent} from '../tools/ncats-header/ncats-header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FacetListComponent } from './facet-list/facet-list.component';
import {SharedModule} from '../shared/shared.module';
import { SummaryPanelComponent } from './data-details/target-details/summary-panel/summary-panel.component';
import { KnowledgePanelComponent } from './data-details/target-details/knowledge-panel/knowledge-panel.component';
import { ExpressionPanelComponent } from './data-details/target-details/expression-panel/expression-panel.component';
import { TargetFacetPanelComponent } from './data-details/target-details/target-facet-panel/target-facet-panel.component';
import { AaSequencePanelComponent } from './data-details/target-details/aa-sequence-panel/aa-sequence-panel.component';
import { ReferencesPanelComponent } from './data-details/target-details/references-panel/references-panel.component';
import { TargetHeaderComponent } from './data-details/target-details/target-header/target-header.component';
import { GeneRifPanelComponent } from './data-details/target-details/gene-rif-panel/gene-rif-panel.component';
import { DrugPanelComponent } from './data-details/target-details/drug-panel/drug-panel.component';
import { DiseaseSourcesPanelComponent } from './data-details/target-details/disease-sources-panel/disease-sources-panel.component';
import { TbioViewerComponent } from './data-details/target-details/tbio-viewer/tbio-viewer.component';
import { TclinViewerComponent } from './data-details/target-details/tclin-viewer/tclin-viewer.component';
import { TdarkViewerComponent } from './data-details/target-details/tdark-viewer/tdark-viewer.component';
import { TchemViewerComponent } from './data-details/target-details/tchem-viewer/tchem-viewer.component';
import { TinxPlotPanelComponent } from './data-details/target-details/tinx-plot-panel/tinx-plot-panel.component';
import { ClassificationExplanationComponent } from './data-details/target-details/classification-explanation/classification-explanation.component';
import { TargetTableComponent } from './data-list/target-table/target-table.component';
import { DiseaseTableComponent } from './data-list/disease-table/disease-table.component';
import { TargetDetailsComponent } from './data-details/target-details/target-details.component';
import {CustomContentDirective} from "../tools/custom-content.directive";
import {IdgLevelIndicatorComponent} from "../tools/idg-level-indicator/idg-level-indicator.component";

@NgModule({
  imports: [
    SharedModule,
    PharosMainRoutingModule
  ],
  declarations: [
    NcatsHeaderComponent,
    NcatsFooterComponent,
    PharosMainComponent,
    BreadcrumbComponent,
    DataListComponent,
    DataListVisualizationsComponent,
    PharosPaginatorComponent,
    FilterPanelComponent,
    FacetTableComponent,
    FacetListComponent,
    DonutChartComponent,
    WordCloudChartComponent,
    SunburstChartComponent,
    VisualizationOptionsComponent,
    DataDetailsComponent,
    KnowledgePanelComponent,
    ExpressionPanelComponent,
    TargetFacetPanelComponent,
    AaSequencePanelComponent,
    GeneRifPanelComponent,
    DrugPanelComponent,
    DiseaseSourcesPanelComponent,
    TbioViewerComponent,
    TclinViewerComponent,
    TchemViewerComponent,
    TinxPlotPanelComponent,
    ClassificationExplanationComponent,
    TargetTableComponent,
    DiseaseTableComponent
  ]
})
export class PharosMainModule { }
