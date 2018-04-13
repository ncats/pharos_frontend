import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {PharosMainRoutingModule} from './pharos-main-routing.module';
import {DataListComponent} from './data-list/data-list.component';
import {BreadcrumbComponent} from '../tools/breadcrumb/breadcrumb.component';
import {DataListVisualizationsComponent} from './data-list-visualizations/data-list-visualizations.component';
import {FacetTableComponent} from './filter-panel/facet-table/facet-table.component';
import {WordCloudChartComponent} from './visualizations/word-cloud-chart/word-cloud-chart.component';
import {SunburstChartComponent} from './visualizations/sunburst-chart/sunburst-chart.component';
import {DonutChartComponent} from './visualizations/donut-chart/donut-chart.component';
import {DataDetailsComponent} from './data-details/data-details.component';
import {PharosPaginatorComponent} from '../tools/pharos-paginator/pharos-paginator.component';
import {FilterPanelComponent} from './filter-panel/filter-panel.component';
import {PharosMainComponent} from './pharos-main.component';
import {NcatsFooterComponent} from '../tools/ncats-footer/ncats-footer.component';
import {NcatsHeaderComponent} from '../tools/ncats-header/ncats-header.component';
import { FacetListComponent } from './facet-list/facet-list.component';
import {
  VisualizationOptionsComponent
} from './data-list-visualizations/visualization-options/visualization-options.component';

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
    DataDetailsComponent
  ]
})
export class PharosMainModule { }
