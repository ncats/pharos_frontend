import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationOptionsComponent } from './visualization-options.component';
import {NcatsFooterComponent} from '../../../tools/ncats-footer/ncats-footer.component';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';
import {BreadcrumbComponent} from '../../../tools/breadcrumb/breadcrumb.component';
import {FacetListComponent} from '../../facet-list/facet-list.component';
import {WordCloudChartComponent} from '../../visualizations/word-cloud-chart/word-cloud-chart.component';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SharedModule} from '../../../shared/shared.module';
import {PharosMainComponent} from '../../pharos-main.component';
import {FacetRetrieverService} from '../../services/facet-retriever.service';
import {DataListVisualizationsComponent} from '../data-list-visualizations.component';
import {SunburstChartComponent} from '../../visualizations/sunburst-chart/sunburst-chart.component';
import {NcatsHeaderComponent} from '../../../tools/ncats-header/ncats-header.component';
import {DataDetailsComponent} from '../../data-details/data-details.component';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {FilterPanelComponent} from '../../filter-panel/filter-panel.component';
import {PharosPaginatorComponent} from '../../../tools/pharos-paginator/pharos-paginator.component';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {DonutChartComponent} from '../../visualizations/donut-chart/donut-chart.component';
import {PharosMainRoutingModule} from '../../pharos-main-routing.module';
import {FacetTableComponent} from '../../filter-panel/facet-table/facet-table.component';
import {APP_BASE_HREF} from '@angular/common';
import {DataListComponent} from '../../data-list/data-list.component';

describe('VisualizationOptionsComponent', () => {
  let component: VisualizationOptionsComponent;
  let fixture: ComponentFixture<VisualizationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
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
        VisualizationOptionsComponent,
        DataDetailsComponent
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
    fixture = TestBed.createComponent(VisualizationOptionsComponent);
    component = fixture.componentInstance;
    component.facets = [
      {name: 'tim', label: 'tim'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
