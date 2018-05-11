import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationOptionsComponent } from './visualization-options.component';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SharedModule} from '../../../shared/shared.module';
import {FacetRetrieverService} from '../../services/facet-retriever.service';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {PharosMainRoutingModule} from '../../pharos-main-routing.module';
import {APP_BASE_HREF} from '@angular/common';

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
