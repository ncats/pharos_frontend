import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDetailsComponent } from './data-details.component';
import {FilterPanelComponent} from '../filter-panel/filter-panel.component';
import {BreadcrumbComponent} from '../../tools/breadcrumb/breadcrumb.component';
import {FacetTableComponent} from '../filter-panel/facet-table/facet-table.component';
import {NcatsHeaderComponent} from '../../tools/ncats-header/ncats-header.component';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosPaginatorComponent} from '../../tools/pharos-paginator/pharos-paginator.component';
import {VisualizationOptionsComponent} from '../data-list-visualizations/visualization-options/visualization-options.component';
import {NcatsFooterComponent} from '../../tools/ncats-footer/ncats-footer.component';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {DataListComponent} from '../data-list/data-list.component';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PharosMainRoutingModule} from '../pharos-main-routing.module';
import {FacetListComponent} from '../facet-list/facet-list.component';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {DonutChartComponent} from '../visualizations/donut-chart/donut-chart.component';
import {DataListVisualizationsComponent} from '../data-list-visualizations/data-list-visualizations.component';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {SharedModule} from '../../shared/shared.module';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedListModule} from '../../shared/shared-list.module';

describe('DataDetailsComponent', () => {
  let component: DataDetailsComponent;
  let fixture: ComponentFixture<DataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedListModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        PharosMainRoutingModule
      ],
      declarations: [
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
    fixture = TestBed.createComponent(DataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
