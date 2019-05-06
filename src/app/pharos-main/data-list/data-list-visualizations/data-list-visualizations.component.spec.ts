import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataListVisualizationsComponent } from './data-list-visualizations.component';
import {SharedModule} from '../../shared/shared.module';
import {PharosMainRoutingModule} from '../pharos-main-routing.module';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {LoadingService} from '../../pharos-services/loading.service';
import {FacetRetrieverService} from '../filter-panel/facet-retriever.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

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

      ],
      providers: [
        PathResolverService,
        PharosApiService,
        PathResolverService,
        ResponseParserService,
        LoadingService,
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
