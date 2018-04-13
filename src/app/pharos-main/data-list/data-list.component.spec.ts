import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListComponent } from './data-list.component';
import {NcatsFooterComponent} from '../../tools/ncats-footer/ncats-footer.component';
import {NcatsHeaderComponent} from '../../tools/ncats-header/ncats-header.component';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {FilterPanelComponent} from '../filter-panel/filter-panel.component';
import {VisualizationOptionsComponent} from '../data-list-visualizations/visualization-options/visualization-options.component';
import {PharosPaginatorComponent} from '../../tools/pharos-paginator/pharos-paginator.component';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {BreadcrumbComponent} from '../../tools/breadcrumb/breadcrumb.component';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FacetListComponent} from '../facet-list/facet-list.component';
import {LoadingService} from '../../pharos-services/loading.service';
import {SharedModule} from '../../shared/shared.module';
import {DonutChartComponent} from '../visualizations/donut-chart/donut-chart.component';
import {PharosMainComponent} from '../pharos-main.component';
import {PharosMainRoutingModule} from '../pharos-main-routing.module';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {DataListVisualizationsComponent} from '../data-list-visualizations/data-list-visualizations.component';
import {FacetTableComponent} from '../filter-panel/facet-table/facet-table.component';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        PharosMainRoutingModule
      ],
      declarations: [
        PharosMainComponent,
        NcatsHeaderComponent,
        NcatsFooterComponent,
        FilterPanelComponent,
        BreadcrumbComponent,
        DataListVisualizationsComponent,
        FacetListComponent,
        DataListComponent,
        FacetTableComponent,
        DonutChartComponent,
        PharosPaginatorComponent,
        VisualizationOptionsComponent
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
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
