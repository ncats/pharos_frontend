import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListVisualizationsComponent } from './data-list-visualizations.component';
import {PharosMainModule} from "../pharos-main.module";
import {NcatsFooterComponent} from "../../tools/ncats-footer/ncats-footer.component";
import {SunburstChartComponent} from "../visualizations/sunburst-chart/sunburst-chart.component";
import {NcatsHeaderComponent} from "../../tools/ncats-header/ncats-header.component";
import {DataDetailsComponent} from "../data-details/data-details.component";
import {FilterPanelComponent} from "../filter-panel/filter-panel.component";
import {VisualizationOptionsComponent} from "./visualization-options/visualization-options.component";
import {PharosPaginatorComponent} from "../../tools/pharos-paginator/pharos-paginator.component";
import {BreadcrumbComponent} from "../../tools/breadcrumb/breadcrumb.component";
import {FacetListComponent} from "../facet-list/facet-list.component";
import {WordCloudChartComponent} from "../visualizations/word-cloud-chart/word-cloud-chart.component";
import {SharedModule} from "../../shared/shared.module";
import {DonutChartComponent} from "../visualizations/donut-chart/donut-chart.component";
import {PharosMainComponent} from "../pharos-main.component";
import {PharosMainRoutingModule} from "../pharos-main-routing.module";
import {FacetTableComponent} from "../filter-panel/facet-table/facet-table.component";
import {DataListComponent} from "../data-list/data-list.component";
import {PathResolverService} from "../../pharos-services/path-resolver.service";
import {LoadingService} from "../../pharos-services/loading.service";
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {FacetRetrieverService} from "../services/facet-retriever.service";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {SuggestApiService} from "../../tools/search-component/suggest-api.service";
import {APP_BASE_HREF} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('DataListVisualizationsComponent', () => {
  let component: DataListVisualizationsComponent;
  let fixture: ComponentFixture<DataListVisualizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        PharosMainRoutingModule
      ],
      declarations: [
        NcatsHeaderComponent,
        NcatsFooterComponent,
        DataListComponent,
        DataDetailsComponent,
        FilterPanelComponent,
        DataListVisualizationsComponent,
        BreadcrumbComponent,
        FacetTableComponent,
        PharosPaginatorComponent,
        DonutChartComponent,
        WordCloudChartComponent,
        SunburstChartComponent,
        VisualizationOptionsComponent,
        PharosMainComponent,
        FacetListComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        PathResolverService,
        ResponseParserService,
        LoadingService,
        EnvironmentVariablesService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListVisualizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
