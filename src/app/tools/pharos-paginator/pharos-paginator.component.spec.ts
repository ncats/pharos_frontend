import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosPaginatorComponent } from './pharos-paginator.component';
import {SharedModule} from "../../shared/shared.module";
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {AppRoutingModule} from "../../app-routing.module";
import {PharosDashboardComponent} from "../../pharos-dashboard/pharos-dashboard.component";
import {NcatsFooterComponent} from "../ncats-footer/ncats-footer.component";
import {NcatsHeaderComponent} from "../ncats-header/ncats-header.component";
import {PathResolverService} from "../../pharos-services/path-resolver.service";
import {FilterPanelComponent} from "../../pharos-main/filter-panel/filter-panel.component";
import {VisualizationOptionsComponent} from "../../pharos-main/data-list-visualizations/visualization-options/visualization-options.component";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";
import {SuggestApiService} from "../search-component/suggest-api.service";
import {FacetListComponent} from "../../pharos-main/facet-list/facet-list.component";
import {LoadingService} from "../../pharos-services/loading.service";
import {DonutChartComponent} from "../../pharos-main/visualizations/donut-chart/donut-chart.component";
import {PharosMainComponent} from "../../pharos-main/pharos-main.component";
import {FacetRetrieverService} from "../../pharos-main/services/facet-retriever.service";
import {DataListVisualizationsComponent} from "../../pharos-main/data-list-visualizations/data-list-visualizations.component";
import {FacetTableComponent} from "../../pharos-main/filter-panel/facet-table/facet-table.component";
import {APP_BASE_HREF} from "@angular/common";
import {DataListComponent} from "../../pharos-main/data-list/data-list.component";
import {ToiCardComponent} from "../../pharos-dashboard/toi-card/toi-card.component";
import {ToiDashboardComponent} from "../../pharos-dashboard/toi-dashboard/toi-dashboard.component";
import {SearchCardComponent} from "../../pharos-dashboard/search-card/search-card.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('PharosPaginatorComponent', () => {
  let component: PharosPaginatorComponent;
  let fixture: ComponentFixture<PharosPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        BrowserTestingModule,
        AppRoutingModule,
        SharedModule
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
      ],
      declarations: [
        PharosDashboardComponent,
        ToiDashboardComponent,
        ToiCardComponent,
        SearchCardComponent,
        PharosPaginatorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
